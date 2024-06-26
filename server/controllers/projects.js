import Milestone from "../models/Milestone.js";
import Tasks from "../models/Tasks.js";
import Project from "../models/project.js";
import mongoose from "mongoose";
const { ObjectId } = mongoose.Types;

// export const index = (req, res) => {
//   const { workspaceId, status } = req.params;

//   if (!mongoose.Types.ObjectId.isValid(workspaceId)) {
//     return res.status(400).json({ error: "Invalid workspaceId" });
//   }

//   Project.find({ workspaceId: workspaceId, status })
//     .populate("team.userId")
//     .populate("owner", "fullName")
//     .then((projects) => res.status(200).json({ projects }))
//     .catch((error) => res.status(400).json({ error: error.message }));
// };




export const index = async (req, res) => {
  const { workspaceId, status } = req.params;

  if (!mongoose.Types.ObjectId.isValid(workspaceId)) {
    return res.status(400).json({ error: "Invalid workspaceId" });
  }

  try {
    const projects = await Project.find({ workspaceId, status })
      .populate("team.userId")
      .populate("owner", "fullName");

    let totalCompletedTasks = 0;
    let totalPlannedTasks = 0;
    let totalActualTasks = 0;
    let workspaceOverdueMilestones = 0;
    let totalCompletedProjects = 0;


   const enrichedProjects = await Promise.all(
     projects.map(async (project) => {
       const milestones = await Milestone.find({ projectId: project._id });
       const totalMilestoneCount = milestones.length;

      let projectCompletedTasks = 0;
      let projectPlannedTasks = 0;
      let projectActualTasks = 0;
      let projectOverdueMilestones = 0;
      let currentDate = new Date();
      let projectIsCompleted = true;

       for (const milestone of milestones) {
         const tasks = await Tasks.find({ milestoneId: milestone._id });

         // Ensure that the tasks are properly retrieved and are an array
         if (Array.isArray(tasks)) {
            projectActualTasks += tasks.length;
            totalActualTasks += tasks.length;
            tasks.forEach((task) => {
              const taskDueDate = new Date(task.endDate);
              if (task.status === 'completed') {
                projectCompletedTasks++;
                totalCompletedTasks++;
              } else {
                projectIsCompleted = false; // If any task is not completed, the project is not completed.
              }
              if (currentDate > taskDueDate) {
                projectPlannedTasks++;
                totalPlannedTasks++;
                if (task.status !== 'completed') {
                  projectOverdueMilestones++;
                  workspaceOverdueMilestones++;
                }
              }
            });
          } else {
            projectIsCompleted = false; // Mark project as incomplete if there are no tasks.
          }
        
       }

        if (projectIsCompleted && projectActualTasks > 0) {
          totalCompletedProjects++;
        }

       // Calculate schedule variance and completion percentage for the project
       let projectScheduleVariance = projectPlannedTasks
         ? (projectCompletedTasks - projectPlannedTasks) / projectPlannedTasks
         : 0;
       
       let projectCompletionPercentage = projectActualTasks
         ? (projectCompletedTasks / projectActualTasks) * 100
         : 0;

       // Determine project status
       let isProjectAheadOfSchedule = projectScheduleVariance > 0;
       let projectStatus =
         projectOverdueMilestones > 0 ? "off track" : "on track";

       return {
         ...project.toObject(),
         completedTasks: projectCompletedTasks,
         status: projectStatus,
         overdueMilestones: projectOverdueMilestones,
         totalMilestones: totalMilestoneCount,
         completionPercentage: projectCompletionPercentage.toFixed(2),
         isAheadOfSchedule: isProjectAheadOfSchedule,
         scheduleVariance: (projectScheduleVariance * 100).toFixed(2),
       };
     })
   );

    // Calculate workspace-level aggregates
    let workspaceScheduleVariance = totalPlannedTasks
      ? (totalCompletedTasks - totalPlannedTasks) / totalPlannedTasks
      : 0;
    let workspaceCompletionPercentage = totalActualTasks
      ? (totalCompletedTasks / totalActualTasks) * 100
      : 0;

    let workspaceSummary = {
      totalScheduleVariance: (workspaceScheduleVariance * 100).toFixed(2),
      totalCompletionPercentage: workspaceCompletionPercentage.toFixed(2),
      totalOverdueMilestones: workspaceOverdueMilestones,
      totalCompletedProjects: totalCompletedProjects
      // Add other metrics as needed
    };

    res
      .status(200)
      .json({ projects: enrichedProjects, summary: workspaceSummary });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getProject = (req, res) => {
  const { status, userId, projectId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(projectId)) {
    return res.status(400).json({ error: "Invalid projectId" });
  }

  Project.findOne({
    _id: projectId,
    status,
    team: { $elemMatch: { userId: userId } },
  })
    .populate("team.userId")
    .populate("owner", "fullName")
    .then(async(project) => {
      const tasks = await Tasks.find({projectId });

      const projectObject = project.toObject();
      projectObject.tasks = tasks;

      res.status(200).json({ project: projectObject });})
    .catch((error) => res.status(400).json({ error: error.message }));
};

export const create = (req, res) => {
  const { name, team, startDate, endDate, workspaceId, owner, description } =
    req.body;

     const teamWithOwner = [...new Set([owner])].map(userId => ({
    userId,
    role: null // You can modify or assign roles as necessary
  }));

  Project.create({
    name,
    startDate,
    endDate,
    workspaceId,
    owner,  
    description,
    team: teamWithOwner,
  })
    .then((project) => res.status(201).json({ project }))
    .catch((error) => res.status(500).json({ error }));
};
export const update = (req, res) => {
  const { name,  startDate, endDate, workspaceId, owner, description, projectId } =
    req.body;

  Project.findOneAndUpdate({_id : projectId},{
    name,
    startDate,
    endDate,
    description,
  },{new:true})
    .then((project) => res.status(201).json({ project }))
    .catch((error) => res.status(500).json({ error }));
};

export const updateStatus = (req, res) => {
  const { projectId, status } = req.params;

  Project.findOneAndUpdate({ _id: projectId }, { status }, { new: true })
    .then((project) => {
      res.status(200).json({ project });
    })
    .catch((error) => res.status(500).json({ error }));
};

export const updateTeamRole = async (req, res) => {
  const { projectId, userId, role } = req.params;

  try {
    // Find the project document
    const project = await Project.findOne({ _id: projectId });

    // Check if the project was found
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    // Find the team member and update their role
    const teamMember = project.team.find(
      (member) => member.userId.toString() === userId
    );

    // If team member with userId is not found, send a 404 response
    if (!teamMember) {
      return res.status(404).json({ error: "Team member not found" });
    }

    teamMember.role = role; // Update the role

    // Save the updated project document back to the database
    await project.save();

    // Send back a success response
    res.status(200).json({project:project, message: "Team member role updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const updateproject = (req, res) => {
  const {projectId} = req.params; 
  const details = req.body

  Project.findOneAndUpdate({ _id: projectId }, { $set: details }, { new: true }).then(
    (project) => {
      res.status(200).json({project, message: 'project updated successfully'})
    }
  ).catch(err => res.status(500).json({error: err.message}));
}



export const invite = (req, res) => {
  const { projectId, team, role } = req.body;

  // Validation (should be more robust in production code)
  if (!projectId || !team) {
    return res
      .status(400)
      .json({ message: "Project ID and team are required." });
  }

  // Create the team member object based on the schema
  const teamMember = {
    userId : team,
    role: role || "team member", // Use provided role or default to 'team member'
  };

  // Add the team member to the Project's team array
  Project.findOneAndUpdate(
    { _id: projectId },
    { $push: { team: teamMember } },
    { new: true, runValidators: true } 
  )
    .then((updatedProject) => {
      if (!updatedProject) {
        return res.status(404).json({ message: "Project not found." });
      }
      res
        .status(200)
        .json({ message: "User invited successfully", updatedProject });
    })
    .catch((error) => {
      console.error("Error inviting user to the project:", error); // Log the error for debugging purposes
      res
        .status(500)
        .json({
          message: "Error inviting user to the project.",
          error: error.message || "Unknown error",
        });
    });
};