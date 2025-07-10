// server/controllers/teamController.js
const Team = require('../models/Team');
const Organization = require('../models/Organization');

exports.createTeam = async (req, res) => {
  try {
    const { name, organizationId } = req.body;
    const team = await Team.create({
      name,
      organization: organizationId,
      members: [{ user: req.user._id, role: 'admin' }]
    });
    await Organization.findByIdAndUpdate(organizationId, { $push: { teams: team._id } });
    res.status(201).json(team);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create team.' });
  }
};
exports.getUserTeams = async (req, res) => {
  const teams = await Team.find({ 'members.user': req.user._id }).populate('organization');
  res.json(teams);
};