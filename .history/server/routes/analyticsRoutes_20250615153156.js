const express = require('express');
const router = express.Router();
const { taskStats } = require('../controllers/analyticsController');
const { authenticate } = require('../middleware/auth');

router.get('/tasks', authenticate, taskStats);

module.exports = router;
