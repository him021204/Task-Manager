const express = require('express');
const router = express.Router();
const { taskStats, dashboardStats } = require('../controllers/analyticsController');
const authenticate = require('../middleware/auth'); // <-- FIXED

router.get('/tasks', authenticate, taskStats);
router.get('/dashboard', authenticate, dashboardStats);
module.exports = router;