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
    // Find the project and ensure it belongs to the user
    const project = await Project.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id
    });

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    // Delete all tasks associated with this project
    if (project.tasks && project.tasks.length > 0) {
      await Task.deleteMany({ _id: { $in: project.tasks } });
    }

    res.json({ message: 'Project and its tasks deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Mark a project as completed
exports.markProjectCompleted = async (req, res) => {
  try {
    // Mark the project as completed
    const project = await Project.findOneAndUpdate(
      { _id: req.params.id, owner: req.user._id },
      { status: 'Completed' },
      { new: true }
    );
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    // Mark all tasks in this project as completed
    if (project.tasks && project.tasks.length > 0) {
      await Task.updateMany(
        { _id: { $in: project.tasks } },
        { $set: { status: 'Completed' } }
      );
    }

    // Optionally, re-populate tasks to reflect updated status
    const updatedProject = await Project.findById(project._id).populate('tasks');

    res.json(updatedProject);
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

exports.createProject = async (req, res) => {
  try {
    const { title, tasks, dueDate } = req.body; // <-- Accept dueDate
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
      tasks: taskIds,
      dueDate: dueDate ? new Date(dueDate) : undefined // <-- Save dueDate
    });
    res.status(201).json(project);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};