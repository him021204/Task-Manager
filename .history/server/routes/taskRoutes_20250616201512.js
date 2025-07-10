const express = require('express');
const router = express.Router();

const { addComment, getTaskDetail, updateTask, getAllTasks } = require('../controllers/taskController');
const authenticate = require('../middleware/auth');

router.post('/comment', authenticate, addComment);
router.get('/detail/:id', authenticate, getTaskDetail);
router.put('/:id', authenticate, updateTask);
router.get('/', authenticate, getAllTasks);
router.post('/', authenticate, async (req, res) => {
  try {
    const { title, dueDate } = req.body;
    const task = await Task.create({
      title,
      dueDate,
      createdBy: req.user.id, // or whatever field you use for user
      // ...other fields as needed
    });
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});
module.exports = router;