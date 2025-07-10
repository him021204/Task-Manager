const express = require('express');
const router = express.Router();

const { addComment } = require('../controllers/taskController');
const authenticate = require('../middleware/auth');


router.post('/comment', authenticate, addComment);
router.get('/detail/:id', authenticate, getTaskDetail);
router.put('/:id', authenticate, updateTask);

module.exports = router;