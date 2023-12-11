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
app.post('/schedule/scenarios', (req, res) => {
  const { schedule, timeZone } = req.body;
  const newJob = createCronJob(schedule, timeZone);
  newJob.start();

  res.status(200).json({ message: 'New scenario scheduled.' });
});
}