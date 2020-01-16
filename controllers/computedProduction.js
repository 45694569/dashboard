// Load required packages
var ComputedProduction = require('../models/computedProduction');

// Create endpoint /api/client for POST
exports.postComputedProductions = function(req, res) {
  // Create a new instance of the Client model
  var computedProduction = new ComputedProduction(req.body);

  // Set the client properties that came from the POST data
  computedProduction.save(function(err) {
    if (err)
      return res.send(err);

    res.json({ message: 'ComputedProduction added to the locker!', data: computedProduction });
  });
};

// Create endpoint /api/clients for GET
exports.getComputedProductions = function(req, res) {
  // Use the Client model to find all clients
  ComputedProduction.findOne({ clientId: req.body.clientId , eDate:req.body.eDate}, function(err, computedProductions) {
    if (err)
      return res.send(err);

    res.json(computedProductions);
  });
};