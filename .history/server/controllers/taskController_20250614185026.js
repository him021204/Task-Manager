const Task = require('../models/Task');

exports.createTask = async (req, res) => {
  const task = await Task.create({ ...req.body, createdBy: req.userId });
  res.status(201).json(task);
};

exports.getTasksByProject = async (req, res) => {
  const { projectId } = req.params;
  const tasks = await Task.find({ project: projectId });
  res.json(tasks);
};
