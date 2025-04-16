const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// POST /auth/register
router.post('/register', async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password)
      return res.status(400).json({ message: 'Username and password are required' });

    const existingUser = await User.findOne({ username });
    if (existingUser)
      return res.status(400).json({ message: 'Username already exists' });

    const user = await User.create({ username, password });
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    next(err);
  }
});

// POST /auth/login
router.post('/login', async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password)
      return res.status(400).json({ message: 'Username and password are required' });

    const user = await User.findOne({ username });
    if (!user || !(await user.comparePassword(password)))
      return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '2h'
    });

    res.json({ token });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
