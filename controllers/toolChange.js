// Load required packages
var ToolChange = require('../models/toolChange');
var Machine = require('../models/machine');
// var CycleTime = require('../models/cycleTime');


var Activities = require('../models/activities');
const date = require('date-and-time');
const now = new Date();
var eDate = date.format(now, 'YYYY/MM/DD HH:mm:ss');

// Create endpoint /api/client for POST
exports.postToolChanges = function(req, res) {
  // Create a new instance of the Client model
  var toolChange = new ToolChange(req.body);

  // Set the client properties that came from the POST data
  
  Machine.findOne({machineId:req.body.machineId}, function(err, machine){
    if (err) {
      console.log(err);
    } else {
      console.log(machine);
      var toolChange = new ToolChange(req.body);
      toolChange.clientId = machine.clientId;
      toolChange.save(function(err) {
        if (err)
          res.send(err);
        res.json({ message: 'toolChange added to the locker!', data: toolChange });
      });
      var activities = new Activities(req.body);
      
      activities.clientId = machine.clientId;
      activities.type = 'Tool Change';
      
      activities.date = eDate;

      activities.save(function(err) {
        if (err)
          console.log(err);
        // res.json({ message: 'noPlan added to the locker!', data: noPlan });
      });
    }
  });
 };
// Create endpoint /api/clients for GET
exports.getToolChanges = function(req, res) {
  // Use the Client model to find all clients
  ToolChange.find({ clientId: req.body.clientId }, function(err, toolChanges) {
    if (err)
      return res.send(err);

    res.json(toolChanges);
  });
};