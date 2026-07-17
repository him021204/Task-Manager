const mongoose = require('mongoose');

const projectTemplateSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Template title is required'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  description: {
    type: String,
    trim: true,
    maxlength: [500, 'Description cannot be more than 500 characters']
  },
  tasks: [{
    title: { type: String, required: true, trim: true },
    priority: { type: String, enum: ['High', 'Medium', 'Low'], default: 'Medium' }
  }],
  isDefault: {
    type: Boolean,
    default: false
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, { timestamps: true });

module.exports = mongoose.model('ProjectTemplate', projectTemplateSchema);
