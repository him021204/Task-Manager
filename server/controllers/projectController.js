const Project = require('../models/Project');
const Task = require('../models/Task');
const ProjectTemplate = require('../models/ProjectTemplate');
const emailService = require('../utils/emailService');

exports.createProject = async (req, res) => {
  try {
    const { title, description, tasks, dueDate, templateId } = req.body;
    let taskIds = [];
    let finalTasks = [];

    if (templateId) {
      const template = await ProjectTemplate.findById(templateId);
      if (template) {
        finalTasks = template.tasks.map(t => ({
          title: t.title,
          priority: t.priority || 'Medium',
          status: 'To Do',
          columnId: 'To Do',
          createdBy: req.user._id
        }));
      }
    } else if (Array.isArray(tasks) && tasks.length > 0) {
      finalTasks = tasks.map(t => ({
        title: t.title,
        dueDate: t.dueDate,
        createdBy: req.user._id
      }));
    }

    if (finalTasks.length > 0) {
      const createdTasks = await Task.insertMany(finalTasks);
      taskIds = createdTasks.map(t => t._id);
    }

    const project = await Project.create({
      title,
      description,
      owner: req.user._id,
      tasks: taskIds,
      dueDate: dueDate || undefined
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
    const { title, dueDate, recurrence } = req.body;
    if (!title || !title.trim()) {
      return res.status(400).json({ error: 'Task title is required' });
    }
    // Create the new task
    const task = await Task.create({
      title: title.trim(),
      dueDate,
      recurrence: recurrence || 'None',
      createdBy: req.user._id
    });
    
    // Send task notification email in the background
    emailService.sendTaskNotificationEmail(req.user.email, req.user.name || 'User', task.title, 'created')
      .catch(err => console.error('Error sending task notification email:', err));

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
exports.markActive = async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      { status: 'Active' },
      { new: true }
    );
    if (!project) return res.status(404).json({ error: 'Project not found' });
    res.json(project);
  } catch {
    res.status(500).json({ error: 'Failed to mark as active.' });
  }
};