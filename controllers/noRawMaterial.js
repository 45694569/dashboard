// Load required packages
var NoRawMaterial = require('../models/noRawMaterial');
var Machine = require('../models/machine');

var Activities = require('../models/activities');
const date = require('date-and-time');
const now = new Date();
var eDate = date.format(now, 'YYYY/MM/DD HH:mm:ss');
// Create endpoint /api/client for POST
exports.postNoRawMaterials = function(req, res) {
  // Create a new instance of the Client model
  var noRawMaterial = new NoRawMaterial(req.body);

  // Set the client properties that came from the POST data
  
  Machine.findOne({machineId:req.body.machineId}, function(err, machine){
    if (err) {
      console.log(err);
    } else {
      console.log(machine);
      var noRawMaterial = new NoRawMaterial(req.body);
      noRawMaterial.clientId = machine.clientId;
      noRawMaterial.save(function(err) {
        if (err)
          res.send(err);
        res.json({ message: 'noRawMaterial added to the locker!', data: noRawMaterial });
      });
      var activities = new Activities(req.body);
      
      activities.clientId = machine.clientId;
      activities.type = 'No RawMaterial';
      
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
exports.getNoRawMaterials = function(req, res) {
  // Use the Client model to find all clients
  NoRawMaterial.find({ clientId: req.body.clientId }, function(err, noRawMaterials) {
    if (err)
      return res.send(err);

    res.json(noRawMaterials);
  });
};