// Load required packages
var Maintenance = require('../models/maintenance');
var Machine = require('../models/machine');

var Activities = require('../models/activities');
const date = require('date-and-time');
const now = new Date();
var eDate = date.format(now, 'YYYY/MM/DD HH:mm:ss');
// Create endpoint /api/client for POST
exports.postMaintenances = function(req, res) {
  // Create a new instance of the Client model
  var maintenance = new Maintenance(req.body);

  // Set the client properties that came from the POST data
  

  // Save the Maintenance and check for errors
  Machine.findOne({machineId:req.body.machineId}, function(err, machine){
    if (err) {
      console.log(err);
    } else {
      console.log(machine);
      var maintenance = new Maintenance(req.body);
      maintenance.clientId = machine.clientId;
      maintenance.save(function(err) {
        if (err)
          res.send(err);
        res.json({ message: 'maintenance added to the locker!', data: maintenance });
      });
      var activities = new Activities(req.body);
      
      activities.clientId = machine.clientId;
      activities.type = 'maintenance';
      
      activities.date = eDate;

      activities.save(function(err) {
        if (err)
          console.log(err);
        // res.json({ message: 'noRawMaterial added to the locker!', data: noRawMaterial });
      });
    }
  });
 };


// Create endpoint /api/clients for GET
exports.getMaintenances = function(req, res) {
  // Use the Client model to find all clients
  Maintenance.find({ clientId: req.body.clientId }, function(err, maintenance) {
    if (err)
      return res.send(err);

    res.json(maintenance);
  });
};