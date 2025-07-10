// server/models/Organization.js
const mongoose = require('mongoose');
const organizationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  teams: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Team' }]
});
module.exports = mongoose.model('Organization', organizationSchema);