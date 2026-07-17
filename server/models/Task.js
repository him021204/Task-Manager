const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
  assignee: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  status: { type: String, default: 'To Do' }, // "To Do", "In Progress", "Done"
  priority: { type: String, enum: ['High', 'Medium', 'Low'], default: 'Medium' },
  dueDate: Date,
  tags: [String],
  recurrence: { type: String, enum: ['None', 'Daily', 'Weekly', 'Monthly'], default: 'None' },
  attachments: [String], // File paths
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
  position: Number,
  columnId: String,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

module.exports = mongoose.model('Task', taskSchema);
