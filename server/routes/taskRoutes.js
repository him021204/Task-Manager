const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const emailService = require('../utils/emailService');

const { addComment, getTaskDetail, updateTask, getAllTasks, markTaskCompleted } = require('../controllers/taskController');
const authenticate = require('../middleware/auth');

router.post('/comment', authenticate, addComment);
router.get('/detail/:id', authenticate, getTaskDetail);
router.put('/:id', authenticate, updateTask);
router.get('/', authenticate, getAllTasks);
router.put('/:id/complete', authenticate, markTaskCompleted);
router.put('/:id', authenticate, updateTask);
router.post('/', authenticate, async (req, res) => {
  try {
    const { title, dueDate, recurrence } = req.body;
    const task = await Task.create({
      title,
      dueDate,
      recurrence: recurrence || 'None',
      createdBy: req.user._id,
      // ...other fields as needed
    });

    // Send task notification email in the background
    emailService.sendTaskNotificationEmail(req.user.email, req.user.name || 'User', task.title, 'created')
      .catch(err => console.error('Error sending task notification email:', err));

    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});
module.exports = router;