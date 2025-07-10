const express = require('express');
const { createProject, getProjects } = require('../controllers/projectController');
const { authenticate } = require('../middlewares/auth');
const router = express.Router();

router.post('/', authenticate, createProject);
router.get('/', authenticate, getProjects);

module.exports = router;
