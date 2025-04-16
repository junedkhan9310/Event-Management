const cron = require('node-cron');
const Event = require('../models/Event');

// 🕐 Cron Job 1: Event Reminder (Every 1 Minute)
cron.schedule('* * * * *', async () => {
  const now = new Date();
  const fiveMinLater = new Date(now.getTime() + 5 * 60 * 1000);
  try {
    const events = await Event.find({
      startTime: { $gte: now, $lte: fiveMinLater },
      status: 'upcoming',
    });

    events.forEach(event => {
      console.log(`[REMINDER] Event "${event.title}" is starting at ${event.startTime}`);
    });
  } catch (err) {
    console.error('Reminder Cron Error:', err.message);
  }
});

// 🔁 Cron Job 2: Status Updater (Every 10 Minutes)
cron.schedule('*/10 * * * *', async () => {
  const now = new Date();
  try {
    // upcoming ➝ ongoing
    await Event.updateMany(
      { startTime: { $lte: now }, endTime: { $gt: now }, status: 'upcoming' },
      { $set: { status: 'ongoing' } }
    );

    // ongoing ➝ completed
    await Event.updateMany(
      { endTime: { $lte: now }, status: 'ongoing' },
      { $set: { status: 'completed' } }
    );

    console.log('[STATUS] Event statuses updated based on time');
  } catch (err) {
    console.error('Status Updater Cron Error:', err.message);
  }
});
