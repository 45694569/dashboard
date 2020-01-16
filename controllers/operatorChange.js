// Load required packages
var OperatorChange = require('../models/operatorChange');
var Machine = require('../models/machine');

var Activities = require('../models/activities');
const date = require('date-and-time');
const now = new Date();
var eDate = date.format(now, 'YYYY/MM/DD HH:mm:ss');
// Create endpoint /api/client for POST
exports.postOperatorChanges = function(req, res) {
  // Create a new instance of the Client model
  var operatorChange = new OperatorChange(req.body);

  // Set the client properties that came from the POST data
  
  Machine.findOne({machineId:req.body.machineId}, function(err, machine){
    if (err) {
      console.log(err);
    } else {
      console.log(machine);
      var operatorChange = new OperatorChange(req.body);
      operatorChange.clientId = machine.clientId;
      operatorChange.save(function(err) {
        if (err)
          res.send(err);
        res.json({ message: 'operatorChange added to the locker!', data: operatorChange });
      });
      var activities = new Activities(req.body);
      
      activities.clientId = machine.clientId;
      activities.type = 'operatorChange';
      
      activities.date = eDate;

      activities.save(function(err) {
        if (err)
          console.log(err);
        // res.json({ message: 'operatorChange added to the locker!', data: operatorChange });
      });
    }
  });
 };

// Create endpoint /api/clients for GET
exports.getOperatorChanges = function(req, res) {
  // Use the Client model to find all clients
  OperatorChange.find({ clientId: req.body.clientId }, function(err, operatorChanges) {
    if (err)
      return res.send(err);

    res.json(operatorChanges);
  });
};