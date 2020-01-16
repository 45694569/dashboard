// Load required packages
var NoManPower = require('../models/noManPower');
var Machine = require('../models/machine');

var Activities = require('../models/activities');
const date = require('date-and-time');
const now = new Date();
var eDate = date.format(now, 'YYYY/MM/DD HH:mm:ss');
// Create endpoint /api/client for POST
exports.postNoManPowers = function(req, res) {
  // Create a new instance of the Client model
  var noManPower = new NoManPower(req.body);

  // Set the client properties that came from the POST data
  
  Machine.findOne({machineId:req.body.machineId}, function(err, machine){
    if (err) {
      console.log(err);
    } else {
      console.log(machine);
      var noManPower = new NoManPower(req.body);
      noManPower.clientId = machine.clientId;
      noManPower.save(function(err) {
        if (err)
          res.send(err);
        res.json({ message: 'noManPower added to the locker!', data: noManPower });
      });
      var activities = new Activities(req.body);
      
      activities.clientId = machine.clientId;
      activities.type = 'noManPower';
      
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
exports.getNoManPowers = function(req, res) {
  // Use the Client model to find all clients
  NoManPower.find({ clientId: req.body.clientId }, function(err, noManPowers) {
    if (err)
      return res.send(err);

    res.json(noManPowers);
  });
};