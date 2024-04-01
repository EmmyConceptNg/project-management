import Milestone from "../models/Milestone.js";
import Tasks from "../models/Tasks.js";

export const index = async (req, res) => {
  try {
    const { projectId } = req.params;
    const milestones = await Milestone.find({ projectId: projectId }).populate(
      "owner"
    );

    const enrichedMilestones = [];

    for (const milestone of milestones) {
      const tasks = await Tasks.find({ milestoneId: milestone._id });

      const completedTasksCount = tasks.filter(
        (task) => task.status === "completed"
      ).length;
      const totalTasksCount = tasks.length;
      const completionPercentage =
        totalTasksCount > 0 ? (completedTasksCount / totalTasksCount) * 100 : 0;

      const currentDate = new Date();
      const isOnTrack = tasks.every(
        (task) =>
          task.status === "completed" || new Date(task.endDate) >= currentDate
      );
      const milestoneStatus = isOnTrack ? "on track" : "off track";

      const overdueTasksCount = tasks.filter(
        (task) =>
          task.status !== "completed" && new Date(task.endDate) < currentDate
      ).length;
      const scheduleStatus =
        totalTasksCount > 0 ? (overdueTasksCount / totalTasksCount) * 100 : 0;

      // Update milestone document
      milestone.complete = completionPercentage.toFixed(2); // Format to 2 decimal places if needed
      milestone.status = milestoneStatus;
      milestone.schedule = scheduleStatus.toFixed(2); // Format to 2 decimal places if needed
      milestone.taskCount = await Tasks.countDocuments({
        milestoneId: milestone._id,
      });
      milestone.tasks = await Tasks.find({
        milestoneId: milestone._id,
      });

      await milestone.save();

      enrichedMilestones.push(milestone);
    }

    res.status(200).json({ milestones: enrichedMilestones });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const getMilestone = (req, res) => {
  const { milestoneId } = req.params;

  Milestone.findOne({ _id: milestoneId })
    .populate("owner")
    .then((milestone) => {
      res.status(200).json({ milestone });
    })
    .catch((error) => res.status(500).json({ error }));
};

export const create = (req, res) => {
  const { name, startDate, endDate, owner, notes, projectId } = req.body;

  Milestone.create({
    name,
    startDate,
    endDate,
    owner,
    notes,
    projectId,
  })
    .then((task) => {
      res
        .status(200)
        .json({ task: task, message: "Milestone added successfully" });
    })
    .catch((error) => {
      res.status(500).json({ error: error });
    });
};

export const changeStatus = (req, res) => {
  const { taskId, status } = req.body;

  Milestone.findOneAndUpdate({ _id: taskId }, { status }, { new: true }).then(
    (task) => {
      res.status(200).json({ task });
    }
  );
};
