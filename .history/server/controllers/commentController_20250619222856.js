// server/controllers/commentController.js
const Comment = require('../models/Comment');
exports.addComment = async (req, res) => {
  try {
    const comment = await Comment.create({
      task: req.params.taskId,
      user: req.user._id,
      text: req.body.text
    });
    res.status(201).json(comment);
  } catch {
    res.status(500).json({ error: 'Failed to add comment.' });
  }
};
exports.getComments = async (req, res) => {
  try {
    const comments = await Comment.find({ task: req.params.taskId })
      .populate('user', 'name email')
      .sort({ createdAt: 1 });
    res.json(comments);
  } catch {
    res.status(500).json({ error: 'Failed to fetch comments.' });
  }
};