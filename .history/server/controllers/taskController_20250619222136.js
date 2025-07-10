const Task = require('../models/Task');
const Comment = require('../models/Comment');

// Add a comment
exports.addComment = async (req, res) => {
  const comment = await Comment.create({
    task: req.body.taskId,
    user: req.userId,
    content: req.body.content
  });
  await Task.findByIdAndUpdate(req.body.taskId, {
    $push: { comments: comment._id }
  });
  res.status(201).json(comment);
};

// Get task details
exports.getTaskDetail = async (req, res) => {
  const task = await Task.findById(req.params.id)
    .populate('assignee', 'name')
    .populate('comments')
    .exec();
  res.json(task);
};

// Update task (inline edit)
exports.updateTask = async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(task);
};

exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ createdBy: req.user.id });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.markTaskCompleted = async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, createdBy: req.user.id },
      { status: 'Completed' },
      { new: true }
    );
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, createdBy: req.user._id },
      { title: req.body.title },
      { new: true }
    );
    if (!task) return res.status(404).json({ error: 'Task not found' });
    res.json(task);
  } catch {
    res.status(500).json({ error: 'Server error' });
  }
};