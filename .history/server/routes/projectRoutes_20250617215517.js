const express = require('express');
const { createProject, getProjects, deleteProject, markProjectCompleted } = require('../controllers/projectController');
const router = express.Router();
const auth = require('../middleware/auth');

router.post('/', auth, createProject);
router.get('/', auth, getProjects);
router.delete('/:id', auth, deleteProject);
router.put('/:id/complete', auth, markProjectCompleted);

module.exports = router;
