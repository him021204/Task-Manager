const jwt = require('jsonwebtoken');
const User = require('../models/User');

const generateToken = (user, secret, expiresIn) =>
  jwt.sign({ id: user._id }, secret, { expiresIn });

exports.register = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({ message: 'User registered' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await user.comparePassword(password)))
    return res.status(401).json({ error: 'Invalid credentials' });

  const token = generateToken(user, process.env.JWT_SECRET, '7d');
  const refreshToken = generateToken(user, process.env.JWT_REFRESH_SECRET, '7d');

  res.cookie('refreshToken', refreshToken, { httpOnly: true });
  res.json({ token, user });
};

exports.refresh = (req, res) => {
  const token = req.cookies.refreshToken;
  if (!token) return res.status(401).json({ error: 'No token' });

  jwt.verify(token, process.env.JWT_REFRESH_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ error: 'Invalid token' });
    const accessToken = generateToken({ id: decoded.id }, process.env.JWT_SECRET, '15m');
    res.json({ token: accessToken });
  });
};

exports.logout = (req, res) => {
  res.clearCookie('refreshToken');
  res.json({ message: 'Logged out' });
};
