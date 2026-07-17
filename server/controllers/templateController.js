const ProjectTemplate = require('../models/ProjectTemplate');

// Helper to seed default templates if database is empty
const seedDefaultTemplates = async () => {
  try {
    const count = await ProjectTemplate.countDocuments({ isDefault: true });
    if (count === 0) {
      const defaults = [
        {
          title: 'Software Development Sprint',
          description: 'Standard checklist for software engineering sprints, including design, code review, testing, and release.',
          isDefault: true,
          tasks: [
            { title: 'Sprint Planning & Backlog Refinement', priority: 'High' },
            { title: 'Feature Development & Implementation', priority: 'High' },
            { title: 'Pull Request Creation & Code Review', priority: 'Medium' },
            { title: 'QA Verification & Regression Testing', priority: 'High' },
            { title: 'Deploy to Production Environment', priority: 'High' },
            { title: 'Post-Release Smoke Testing', priority: 'Medium' },
            { title: 'Sprint Retrospective Meeting', priority: 'Low' }
          ]
        },
        {
          title: 'Marketing Campaign Launch',
          description: 'Standard timeline tasks for preparing and running a marketing campaign.',
          isDefault: true,
          tasks: [
            { title: 'Define Target Audience & KPI Metrics', priority: 'Medium' },
            { title: 'Draft Marketing Copy & Campaign Assets', priority: 'Medium' },
            { title: 'Design Ads & Landing Page Elements', priority: 'Medium' },
            { title: 'Configure Social Media Posting Schedule', priority: 'High' },
            { title: 'Launch Paid Ads Campaign', priority: 'High' },
            { title: 'Compile Weekly Performance Reports', priority: 'Low' }
          ]
        },
        {
          title: 'New Hire Onboarding Check',
          description: 'Standard onboarding checklist to welcome and set up new team members.',
          isDefault: true,
          tasks: [
            { title: 'Configure Laptop Hardware & Credentials', priority: 'High' },
            { title: 'Review Product Architecture & Documentation', priority: 'Medium' },
            { title: 'Setup Development Environment Locally', priority: 'High' },
            { title: 'Team Introductions & Welcome Coffee', priority: 'Low' },
            { title: 'Assign First Onboarding Starter Task', priority: 'Medium' }
          ]
        }
      ];
      await ProjectTemplate.insertMany(defaults);
      console.log('Project Templates: Default templates seeded successfully.');
    }
  } catch (err) {
    console.error('Project Templates: Seeding default templates failed:', err);
  }
};

exports.getTemplates = async (req, res) => {
  try {
    await seedDefaultTemplates();
    const userId = req.user._id || req.user.id;
    const templates = await ProjectTemplate.find({
      $or: [
        { isDefault: true },
        { createdBy: userId }
      ]
    }).sort({ isDefault: -1, createdAt: -1 });
    res.json(templates);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.createTemplate = async (req, res) => {
  try {
    const { title, description, tasks } = req.body;
    if (!title || !title.trim()) {
      return res.status(400).json({ error: 'Template title is required' });
    }
    const template = await ProjectTemplate.create({
      title: title.trim(),
      description,
      tasks: tasks || [],
      createdBy: req.user._id || req.user.id
    });
    res.status(201).json(template);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.deleteTemplate = async (req, res) => {
  try {
    const userId = req.user._id || req.user.id;
    const template = await ProjectTemplate.findOneAndDelete({
      _id: req.params.id,
      createdBy: userId,
      isDefault: false
    });
    if (!template) {
      return res.status(404).json({ error: 'Custom template not found or unauthorized' });
    }
    res.json({ message: 'Template deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};
