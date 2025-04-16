const express = require('express');
const app = express();
const authRoutes = require('./routes/auth');
const eventRoutes = require('./routes/events');
const loggerMiddleware = require('./middleware/logger');

app.use(express.json());
app.use(loggerMiddleware);
app.use('/uploads', express.static('uploads'));

app.use('/auth', authRoutes);
app.use('/events', eventRoutes);
app.use(require('./middleware/errorHandler'));

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ error: err.message || 'Server error' });
});

module.exports = app;
