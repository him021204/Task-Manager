const Project = require('../models/Project');
const Task = require('../models/Task');

exports.createProject = async (req, res) => {
  try {
    const { title, tasks } = req.body;
    // Create tasks if provided
    let taskIds = [];
    if (Array.isArray(tasks) && tasks.length > 0) {
      const createdTasks = await Task.insertMany(
        tasks.map(t => ({
          title: t.title,
          dueDate: t.dueDate,
          createdBy: req.user._id
        }))
      );
      taskIds = createdTasks.map(t => t._id);
    }
    const project = await Project.create({
      title,
      owner: req.user._id,
      tasks: taskIds
    });
    res.status(201).json(project);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find({ owner: req.user._id })
      .populate('tasks')
      .exec();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.inviteMember = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ error: 'User not found' });

  await Project.findByIdAndUpdate(req.params.id, {
    $addToSet: { members: user._id }
  });
  res.json({ message: 'Member invited' });
};

// ...existing code...

// Delete a project
exports.deleteProject = async (req, res) => {
  try {
    const project = await Project.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id
    });
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.json({ message: 'Project deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Mark a project as completed
exports.markProjectCompleted = async (req, res) => {
  try {
    const project = await Project.findOneAndUpdate(
      { _id: req.params.id, owner: req.user._id },
      { status: 'Completed' },
      { new: true }
    );
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.json(project);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.addTaskToProject = async (req, res) => {
  try {
    const { title, dueDate } = req.body;
    if (!title || !title.trim()) {
      return res.status(400).json({ error: 'Task title is required' });
    }
    // Create the new task
    const task = await Task.create({
      title: title.trim(),
      dueDate,
      createdBy: req.user._id
    });
    // Add the task to the project
    const project = await Project.findOneAndUpdate(
      { _id: req.params.id, owner: req.user._id },
      { $push: { tasks: task._id } },
      { new: true }
    ).populate('tasks');
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.status(201).json({ task, project });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};