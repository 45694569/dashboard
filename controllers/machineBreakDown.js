// Load required packages
var MachineBreakDown = require('../models/machineBreakDown');
var Machine = require('../models/machine');

var Activities = require('../models/activities');
const date = require('date-and-time');
const now = new Date();
var eDate = date.format(now, 'YYYY/MM/DD HH:mm:ss');
// Create endpoint /api/client for POST
exports.postMachineBreakDowns = function(req, res) {
  // Create a new instance of the Client model
  var machineBreakDown = new MachineBreakDown(req.body);

  // Set the client properties that came from the POST data
  
  Machine.findOne({machineId:req.body.machineId}, function(err, machine){
    if (err) {
      console.log(err);
    } else {
      console.log(machine);
      var machineBreakDown = new MachineBreakDown(req.body);
      machineBreakDown.clientId = machine.clientId;
      machineBreakDown.save(function(err) {
        if (err)
          res.send(err);
        res.json({ message: 'machineBreakDown added to the locker!', data: machineBreakDown });
      });
      var activities = new Activities(req.body);
      
      activities.clientId = machine.clientId;
      activities.type = 'machineBreakDown';
      
      activities.date = eDate;

      activities.save(function(err) {
        if (err)
          console.log(err);
        // res.json({ message: 'machineBreakDown added to the locker!', data: machineBreakDown });
      });
    }
  });
 };

// Create endpoint /api/clients for GET
exports.getMachineBreakDowns = function(req, res) {
  // Use the Client model to find all clients
  MachineBreakDown.find({ clientId: req.body.clientId }, function(err, machineBreakDowns) {
    if (err)
      return res.send(err);

    res.json(machineBreakDowns);
  });
};