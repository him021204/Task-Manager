const Project = require('../models/Project');

exports.createProject = async (req, res) => {
  const project = await Project.create({ ...req.body, owner: req.user._id });
  res.status(201).json(project);
};

exports.getProjects = async (req, res) => {
  const projects = await Project.find({ owner: req.user._id });
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

// ...existing code...

// Delete a project
exports.deleteProject = async (req, res) => {
  try {
    const project = await Project.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id
    });
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.json({ message: 'Project deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Mark a project as completed
exports.markProjectCompleted = async (req, res) => {
  try {
    const project = await Project.findOneAndUpdate(
      { _id: req.params.id, owner: req.user._id },
      { status: 'Completed' },
      { new: true }
    );
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.json(project);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};