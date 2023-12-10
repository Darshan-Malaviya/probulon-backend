const { CronJob } = require('cron');
const { preparePublisher } = require('../src/services/mqtt/publisher');


function createCronJob(schedule, timeZone) {
  return new CronJob(schedule, () => preparePublisher('test', { 
    "message": {
      "isLocked": false
    }
  }), null, true, timeZone);
}

module.exports = function (app) {
// Endpoint to schedule new scenarios
app.post('/schedule/scenarios', (req, res) => {
  const { schedule, timeZone } = req.body; // Assuming request body contains schedule, callback, and timeZone
  const newJob = createCronJob(schedule, timeZone);
  newJob.start();

  res.status(200).json({ message: 'New scenario scheduled.' });
});
}