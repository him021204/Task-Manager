const Project = require('../models/Project');

exports.createProject = async (req, res) => {
  const project = await Project.create({ ...req.body, owner: req.userId });
  res.status(201).json(project);
};

exports.getProjects = async (req, res) => {
  const projects = await Project.find({ owner: req.userId });
  res.json(projects);
};
