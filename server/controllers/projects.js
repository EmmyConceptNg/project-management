import Tasks from "../models/Tasks.js";
import Project from "../models/project.js";
import mongoose from "mongoose";
const { ObjectId } = mongoose.Types;

export const index = (req, res) => {
  const { workspaceId, status } = req.params;

  if (!mongoose.Types.ObjectId.isValid(workspaceId)) {
    return res.status(400).json({ error: "Invalid workspaceId" });
  }

  Project.find({ workspaceId: workspaceId, status })
    .populate("team.userId")
    .populate("owner", "fullName")
    .then((projects) => res.status(200).json({ projects }))
    .catch((error) => res.status(400).json({ error: error.message }));
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

     const teamWithOwner = [...new Set([...team, owner])].map(userId => ({
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

export const updateStatus = (req, res) => {
  const { projectId, status } = req.params;

  Project.findOneAndUpdate({ _id: projectId }, { status }, { new: true })
    .then((project) => {
      res.status(200).json({ project });
    })
    .catch((error) => res.status(500).json({ error }));
};
