const express = require('express');
const { createProject, getProjects } = require('../controllers/projectController');
const inviteMember = require('../controllers/inviteController'); // Add this if you have inviteMember
const auth = require('../middleware/auth'); // <-- Correct path

const router = express.Router();

router.post('/:id/invite', auth, inviteMember);
router.post('/', auth, createProject);
router.get('/', auth, getProjects);

module.exports = router;