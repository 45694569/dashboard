// Load required packages
var NoPlan = require('../models/noPlan');
var Machine = require('../models/machine');
// var CycleTime = require('../models/cycleTime');


var Activities = require('../models/activities');
const date = require('date-and-time');
const now = new Date();
var eDate = date.format(now, 'YYYY/MM/DD HH:mm:ss');

// Create endpoint /api/client for POST
exports.postNoPlans = function(req, res) {
  // Create a new instance of the Client model
  var noPlan = new NoPlan(req.body);

  // Set the client properties that came from the POST data
  Machine.findOne({machineId:req.body.machineId}, function(err, machine){
    if (err) {
      console.log(err);
    } else {
      console.log(machine);
      var noPlan = new NoPlan(req.body);
      noPlan.clientId = machine.clientId;
      noPlan.save(function(err) {
        if (err)
          res.send(err);
        res.json({ message: 'noPlan added to the locker!', data: noPlan });
      });
      var activities = new Activities(req.body);
      
      activities.clientId = machine.clientId;
      activities.type = 'no Plan';
      
      activities.date = eDate;

      activities.save(function(err) {
        if (err)
          console.log(err);
        // res.json({ message: 'noPlan added to the locker!', data: noPlan });
      });
    }
  });
 };
 // Create endpoint /api/noPlans for GET
 exports.getNoPlans = function(req, res) {
 // Use the noPlan model to find all noPlan
 NoPlan.find({ userId: req.user._id }, function(err, noPlans) {
  if (err)
    res.send(err);
  res.json(noPlans);
 });
 };
 