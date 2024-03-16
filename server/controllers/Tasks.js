import Tasks from "../models/Tasks.js";

export const index = (req, res) => {
  const { projectId } = req.params;

  // Tasks.find({projectId}).populate('projectId').then(task =>{
  //     res.status()

  // })
};

export const create = (req, res) => {
  const { name, startDate, endDate, team, description, projectId } = req.body;

  Tasks.create({
    name,
    startDate,
    endDate,
    team,
    description,
    projectId,
  })
    .then((task) => {
      res.status(200).json({ task: task, message: "Task added successfully" });
    })
    .catch((error) => {
      res.status(500).json({ error: error });
    });
};

export const changeStatus = (req, res) => {
  const { taskId, status } = req.body;

  Tasks.findOneAndUpdate({ _id: taskId }, { status }, { new: true }).then(
    (task) => {
      res.status(200).json({ task });
    }
  );
};
