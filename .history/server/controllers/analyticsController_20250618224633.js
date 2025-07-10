const Project = require('../models/Project');
const Task = require('../models/Task');

exports.taskStats = async (req, res) => {
  const userId = req.user._id; // Use req.user._id for consistency

  // Use createdBy and status: 'Completed'
  const completed = await Task.countDocuments({ createdBy: userId, status: 'Completed' });
  const total = await Task.countDocuments({ createdBy: userId });

  const byPriority = await Task.aggregate([
    { $match: { createdBy: userId } },
    { $group: { _id: '$priority', count: { $sum: 1 } } }
  ]);

  res.json({ completed, total, byPriority });
};

exports.dashboardStats = async (req, res) => {
  try {
    const totalProjects = await Project.countDocuments({ owner: req.user._id });
    const totalTasks = await Task.countDocuments({ createdBy: req.user._id });
    res.json({ totalProjects, totalTasks });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};
