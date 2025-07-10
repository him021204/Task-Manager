// server/routes/commentRoutes.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { addComment, getComments, deleteComment } = require('../controllers/commentController');
router.post('/:taskId', auth, addComment);
router.get('/:taskId', auth, getComments);
router.delete('/:commentId', auth, deleteComment);
module.exports = router;