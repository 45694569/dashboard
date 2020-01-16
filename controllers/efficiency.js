// Load required packages
var Efficiency = require('../models/efficiency');

// Create endpoint /api/client for POST
exports.postEfficiencies = function(req, res) {
  // Create a new instance of the Client model
  var efficiency = new Efficiency(req.body);

  // Set the client properties that came from the POST data
  efficiency.save(function(err) {
    if (err)
      return res.send(err);

    res.json({ message: 'Efficiency added to the locker!', data: efficiency });
  });
};

exports.putEfficiencies = function(req, res) {
  // Use the efficiency model to find a specific efficiency
  Efficiency.findOneAndUpdate({_id: req.params.efficiency_id },req.body,function(err,efficiencies) {
    if (err)
      return res.send(err);

    res.json(efficiencies);
  });
};







// Create endpoint /api/clients for GET
exports.getEfficiencies = function(req, res) {
  // Use the Client model to find all clients
  Efficiency.findOne({ machineId: req.body.machineId,eDate:  req.body.eDate }, function(err, efficiencies) {
    if (err)
      return res.send(err);

    res.json(efficiencies);
  });
};