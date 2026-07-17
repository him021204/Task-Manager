const Task = require('../models/Task');
const Comment = require('../models/Comment');
const Project = require('../models/Project');

// Add a comment
exports.addComment = async (req, res) => {
  const comment = await Comment.create({
    task: req.body.taskId,
    user: req.userId,
    content: req.body.content
  });
  await Task.findByIdAndUpdate(req.body.taskId, {
    $push: { comments: comment._id }
  });
  res.status(201).json(comment);
};

// Get task details
exports.getTaskDetail = async (req, res) => {
  const task = await Task.findById(req.params.id)
    .populate('assignee', 'name')
    .populate('comments')
    .exec();
  res.json(task);
};

// Update task (inline edit)
exports.updateTask = async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(task);
};

exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ createdBy: req.user.id });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.markTaskCompleted = async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, createdBy: req.user._id || req.user.id },
      { status: 'Completed' },
      { new: true }
    );
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    // Handle task recurrence
    if (task.recurrence && task.recurrence !== 'None') {
      let nextDueDate = task.dueDate ? new Date(task.dueDate) : new Date();
      if (task.recurrence === 'Daily') {
        nextDueDate.setDate(nextDueDate.getDate() + 1);
      } else if (task.recurrence === 'Weekly') {
        nextDueDate.setDate(nextDueDate.getDate() + 7);
      } else if (task.recurrence === 'Monthly') {
        nextDueDate.setMonth(nextDueDate.getMonth() + 1);
      }

      const newTask = await Task.create({
        title: task.title,
        description: task.description,
        project: task.project,
        assignee: task.assignee,
        status: 'To Do',
        columnId: 'To Do',
        priority: task.priority,
        dueDate: nextDueDate,
        recurrence: task.recurrence,
        position: task.position,
        createdBy: task.createdBy
      });

      if (task.project) {
        await Project.findByIdAndUpdate(task.project, {
          $push: { tasks: newTask._id }
        });
      }
    }

    res.json(task);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// In controllers/taskController.js
exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, createdBy: req.user._id },
      req.body,
      { new: true }
    );
    if (!task) return res.status(404).json({ error: 'Task not found' });
    res.json(task);
  } catch {
    res.status(500).json({ error: 'Server error' });
  }
};