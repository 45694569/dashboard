// Load required packages
var Oee = require('../models/oee');

// Create endpoint /api/client for POST
exports.postOees = function(req, res) {
  // Create a new instance of the Client model
  var oee = new Oee(req.body);

  // Set the client properties that came from the POST data
  oee.save(function(err) {
    if (err)
      return res.send(err);

    res.json({ message: 'Oee added to the locker!', data: oee });
  });
};

exports.putOees = function(req, res) {
  // Use the Oee model to find a specific Oee
  Oee.findOneAndUpdate({_id: req.params.oee_id },req.body,function(err,oees) {
    if (err)
      return res.send(err);

    res.json(oees);
  });
};







// Create endpoint /api/clients for GET
exports.getOees = function(req, res) {
  // Use the Client model to find all clients
  Oee.findOne({ machineId: req.body.machineId,eDate:  req.body.eDate }, function(err, oees) {
    if (err)
      return res.send(err);

    res.json(oees);
  });
};