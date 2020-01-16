// Load required packages
var ShiftTiming = require('../models/shiftTiming');

// Create endpoint /api/client for POST
exports.postShiftTimings = function(req, res) {
  // Create a new instance of the Client model
  var shiftTiming = new ShiftTiming(req.body);

  // Set the client properties that came from the POST data
  

  // Save the ShiftTiming and check for errors
  shiftTiming.save(function(err) {
    if (err)
      return res.send(err);

    res.json({ message: 'ShiftTiming added to the locker!', data: shiftTiming });
  });
};

// Create endpoint /api/clients for GET
exports.getShiftTimings = function(req, res) {
  // Use the Client model to find all clients
  ShiftTiming.findOne({ clientId: req.body.clientId }, function(err, shiftTimings) {
    if (err)
      return res.send(err);

    res.json(shiftTimings);
  });
};