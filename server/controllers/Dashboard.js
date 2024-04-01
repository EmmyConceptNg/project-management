import Tasks from "../models/Tasks.js";
import Project from "../models/project.js";

export const Index = async (req, res) => {
  const { userId } = req.params;

  try {
    const ongoingProject = await Project.countDocuments({
      team: {
        $elemMatch: {
          userId: userId,
        },
      },
      status: "ongoing",
    });
    const ongoingTasks = await Tasks.countDocuments({
      team: userId,

      status: "ongoing",
    });
    const completedTasks = await Tasks.countDocuments({
      team: userId,
      status: "completed",
    });
    const pendingTasks = await Tasks.countDocuments({
      team: userId,
      status: "not started",
    });

    const today = new Date();
    const tasksForToday = await Tasks.find({
      team: userId,
      startDate: { $lte: today },
      status: { $in: ["not started", "overdue"] }, // Status is either "not started" or "overdue"
    }).populate('team');

    // Collect projectIds from tasks
    const projectIds = tasksForToday.map((task) => task.projectId);

    // Find projects corresponding to projectIds
    const projectsForToday = await Project.find({ _id: { $in: projectIds } });

    // Prepare the response with tasks and their corresponding projects
    const tasksWithProjects = tasksForToday.map((task) => {
      const milestone = projectsForToday.find((milestone) =>
        milestone._id.equals(task.milestoneId)
      );
      return {
        task,
        milestone,
      };
    });

    res.status(200).json({
      ongoingTasks,
      ongoingProject,
      completedTasks,
      pendingTasks,
      tasksForToday: tasksWithProjects,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
