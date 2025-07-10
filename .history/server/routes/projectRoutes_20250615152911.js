const express = require('express');
const { createProject, getProjects } = require('../controllers/projectController');
const router = express.Router();
const auth = require('../middleware/auth');

router.post('/', auth, createProject);
router.get('/', auth, getProjects);

module.exports = router;
