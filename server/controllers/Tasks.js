import Milestone from "../models/Milestone.js";
import Tasks from "../models/Tasks.js";
import UserModel from "../models/user.js";
import { TaskMail } from "../pages/TaskMail.js";
import { sendMail } from "./Mail.js";

export const index = (req, res) => {
  const { milestoneId } = req.params;

  Tasks.find({ milestoneId: milestoneId })
    .populate("team")
    .then((tasks) => {
      const updatedTasksPromises = tasks.map((task) => {
        // Determine the completion percentage based on the status
        let completePercentage;
        switch (task.status) {
          case "not started":
            completePercentage = 0;
            break;
          case "ongoing":
            completePercentage = 50; // You can adjust the logic here to be more dynamic if needed
            break;
          case "completed":
            completePercentage = 100;
            break;
          case "overdue":
            completePercentage = task.complete || 0; // Assuming overdue tasks maintain their last known completion percentage
            break;
          default:
            completePercentage = task.complete || 0; // Default case
        }

        // Assign the completion percentage to the task
        task.complete = completePercentage;

        // Save the task back to the database
        return task.save(); // This returns a promise
      });

      // Wait for all tasks to save
      return Promise.all(updatedTasksPromises);
    })
    .then((updatedTasks) => {
      // Send back the updated tasks
      res.status(200).json({ tasks: updatedTasks });
    })
    .catch((error) => {
      console.error("Error updating tasks:", error);
      res.status(500).json({ error });
    });
};

export const create = (req, res) => {
  const { name, startDate, endDate, team, description, milestoneId } = req.body;

  Tasks.create({
    name,
    startDate,
    endDate,
    team,
    description,
    milestoneId,
  })
    .then(async (task) => {
      const user = await UserModel.findOne({ _id: team });
      const milestone = await Milestone.findOne({ _id: milestoneId });
      const link = `${FRONTEND_URL}/`;
      sendMail("reciever", "subject", TaskMail(user, milestone, link));
      res.status(200).json({ task: task, message: "Task added successfully" });
    })
    .catch((error) => {
      res.status(500).json({ error: error });
    });
};

export const changeStatus = (req, res) => {
  const { taskId, status } = req.body;

  let completePercentage;
  switch (status) {
    case "not started":
      completePercentage = 0;
      break;
    case "ongoing":
      completePercentage = 50; // You can adjust the logic here to be more dynamic if needed
      break;
    case "completed":
      completePercentage = 100;
      break;
    case "overdue":
      completePercentage = complete || 0; // Assuming overdue tasks maintain their last known completion percentage
      break;
    default:
      completePercentage = complete || 0; // Default case
  }

  Tasks.findOneAndUpdate(
    { _id: taskId },
    { status, complete: completePercentage },
    { new: true }
  ).then((task) => {
    res.status(200).json({ task });
  });
};
