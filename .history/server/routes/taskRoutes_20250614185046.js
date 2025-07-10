const express = require('express');
const { createTask, getTasksByProject } = require('../controllers/taskController');
const { authenticate } = require('../middlewares/auth');
const router = express.Router();

router.post('/', authenticate, createTask);
router.get('/:projectId', authenticate, getTasksByProject);

module.exports = router;
