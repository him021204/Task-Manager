const { addComment, getTaskDetail, updateTask } = require('../controllers/taskController');

router.post('/comment', authenticate, addComment);
router.get('/detail/:id', authenticate, getTaskDetail);
router.put('/:id', authenticate, updateTask);
