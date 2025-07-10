const express = require('express');
const router = express.Router();

const { addComment, getTaskDetail, updateTask } = require('../controllers/taskController');
const authenticate = require('../middleware/auth');

router.post('/comment', authenticate, addComment);
router.get('/detail/:id', authenticate, getTaskDetail);
router.put('/:id', authenticate, updateTask);
router.get('/', authenticate, getAllTasks);
module.exports = router;