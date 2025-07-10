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
exports.deleteComment = async (req, res) => {
  try {
    // Only allow the comment's author or an admin to delete
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) return res.status(404).json({ error: 'Comment not found' });
    if (comment.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Not authorized' });
    }
    await comment.deleteOne();
    res.json({ success: true });
  } catch {
    res.status(500).json({ error: 'Failed to delete comment.' });
  }
};