// Load required packages
var Machine = require('../models/machine');

// Create endpoint /api/client for POST
exports.postMachines = function(req, res) {
  // Create a new instance of the Client model
  var machine = new Machine(req.body);

  // Set the client properties that came from the POST data
  // machine.name = req.body.name;
  // machine.machineName = req.body.machineName;
  // machine.machineId = req.body.machineId;
  // machine.operatorId = req.body.operatorId;
  // machine.clientId = req.body.clientId;
  // machine.machineType = req.body.machineType;
  // machine.totalProduction = req.body.totalProduction;
  // machine.machineNo = req.body.machineNo;
  // machine.lastHeartBeat = req.body.lastHeartBeat;
  // machine.lastCycleTime = req.body.lastCycleTime;

  // Save the machine and check for errors
  machine.save(function(err) {
    if (err)
      return res.send(err);

    res.json({ message: 'Machine added to the locker!', data: machine });
  });
};

// Create endpoint /api/clients for GET
exports.getMachines = function(req, res) {
  // Use the Client model to find all clients
  Machine.find({ clientId: req.body.clientId }, function(err, machines) {
    if (err)
      return res.send(err);

    res.json(machines);
  });
};