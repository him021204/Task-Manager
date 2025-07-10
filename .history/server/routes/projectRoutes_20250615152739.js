const express = require('express');
const { createProject, getProjects } = require('../controllers/projectController');
const router = express.Router();
const auth = require('../middleware/auth');

router.post('/', auth.authenticate, createProject);
router.get('/', auth.authenticate, getProjects);

module.exports = router;
