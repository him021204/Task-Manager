const express = require('express');
const router = express.Router();
const { taskStats, dashboardStats, projectTaskSummary } = require('../controllers/analyticsController');
const authenticate = require('../middleware/auth'); // <-- FIXED

router.get('/tasks', authenticate, taskStats);
router.get('/dashboard', authenticate, dashboardStats);
router.get('/project-task-summary', authenticate, projectTaskSummary);
module.exports = router;