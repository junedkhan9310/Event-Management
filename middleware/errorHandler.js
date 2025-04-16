module.exports = (err, req, res, next) => {
    console.error(`[ERROR] ${err.message}`);
  
    if (err.name === 'ValidationError') {
      return res.status(400).json({ error: 'Validation Error', details: err.message });
    }
  
    if (err.name === 'MongoNetworkError') {
      return res.status(503).json({ error: 'Database Unreachable' });
    }
  
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ error: 'File too large. Max 2MB allowed.' });
    }
  
    res.status(err.status || 500).json({
      error: err.message || 'Internal Server Error',
    });
  };
  