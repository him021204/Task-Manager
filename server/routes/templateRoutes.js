const express = require('express');
const router = express.Router();
const { getTemplates, createTemplate, deleteTemplate } = require('../controllers/templateController');
const authenticate = require('../middleware/auth');

router.get('/', authenticate, getTemplates);
router.post('/', authenticate, createTemplate);
router.delete('/:id', authenticate, deleteTemplate);

module.exports = router;
