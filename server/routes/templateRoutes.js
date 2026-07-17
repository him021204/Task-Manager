const express = require('express');
const router = express.Router();
const { getTemplates, createTemplate } = require('../controllers/templateController');
const authenticate = require('../middleware/auth');

router.get('/', authenticate, getTemplates);
router.post('/', authenticate, createTemplate);

module.exports = router;
