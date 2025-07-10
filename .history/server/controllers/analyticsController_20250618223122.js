const Project = require('../models/Project');
const Task = require('../models/Task');

exports.taskStats = async (req, res) => {
  const userId = req.userId;
  const completed = await Task.countDocuments({ assignee: userId, status: 'Done' });
  const total = await Task.countDocuments({ assignee: userId });

  const byPriority = await Task.aggregate([
    { $match: { assignee: userId } },
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
