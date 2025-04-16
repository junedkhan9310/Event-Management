require('dotenv').config();
const app = require('./app');
const connectDB = require('./config/db');
const initCronJobs = require('./cron/job'); // ✅ Import cron init

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
