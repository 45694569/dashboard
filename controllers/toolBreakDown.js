// Load required packages
var ToolBreakDown = require('../models/toolBreakDown');
var Machine = require('../models/machine');

var Activities = require('../models/activities');
const date = require('date-and-time');
const now = new Date();
var eDate = date.format(now, 'YYYY/MM/DD HH:mm:ss');
// Create endpoint /api/client for POST
exports.postToolBreakDowns = function(req, res) {
  // Create a new instance of the Client model
  var toolBreakDown = new ToolBreakDown(req.body);

  // Set the client properties that came from the POST data
  
  Machine.findOne({machineId:req.body.machineId}, function(err, machine){
    if (err) {
      console.log(err);
    } else {
      console.log(machine);
      var toolBreakDown = new ToolBreakDown(req.body);
      toolBreakDown.clientId = machine.clientId;
      toolBreakDown.save(function(err) {
        if (err)
          res.send(err);
        res.json({ message: 'toolBreakDown added to the locker!', data: toolBreakDown });
      });
      var activities = new Activities(req.body);
      
      activities.clientId = machine.clientId;
      activities.type = 'toolBreakDown';
      
      activities.date = eDate;

      activities.save(function(err) {
        if (err)
          console.log(err);
        // res.json({ message: 'toolBreakDown added to the locker!', data: toolBreakDown });
      });
    }
  });
 };

// Create endpoint /api/clients for GET
exports.getToolBreakDowns = function(req, res) {
  // Use the Client model to find all clients
  ToolBreakDown.find({ clientId: req.body.clientId }, function(err, toolBreakDowns) {
    if (err)
      return res.send(err);

    res.json(toolBreakDowns);
  });
};