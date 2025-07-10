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
