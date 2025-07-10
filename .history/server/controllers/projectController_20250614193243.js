const Project = require('../models/Project');

exports.createProject = async (req, res) => {
  const project = await Project.create({ ...req.body, owner: req.userId });
  res.status(201).json(project);
};

exports.getProjects = async (req, res) => {
  const projects = await Project.find({ owner: req.userId });
  res.json(projects);
};

exports.inviteMember = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ error: 'User not found' });

  await Project.findByIdAndUpdate(req.params.id, {
    $addToSet: { members: user._id }
  });
  res.json({ message: 'Member invited' });
};
