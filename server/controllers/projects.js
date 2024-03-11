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
    .populate("team.roleId")
    .populate("owner", "fullName")
    .then((projects) => res.status(200).json({ projects }))
    .catch((error) => res.status(400).json({ error: error.message }));
};

export const create = (req, res) => {
  const { name, team, startDate, endDate, workspaceId, owner, description } =
    req.body;
  Project.create({
    name,
    startDate,
    endDate,
    workspaceId,
    owner,
    description,
    team: team.map((email) => ({ userEmail: email, role: null })),
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
