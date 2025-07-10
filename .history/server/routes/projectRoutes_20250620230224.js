const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { createProject, getProjects, deleteProject, markProjectCompleted, addTaskToProject } = require('../controllers/projectController');

router.post('/', auth, createProject);
router.get('/', auth, getProjects);
router.delete('/:id', auth, deleteProject);
router.put('/:id/complete', auth, markProjectCompleted);
router.post('/:id/tasks', auth, addTaskToProject);
router.put('/:id/active', auth, projectController.markActive);
module.exports = router;