// Load required packages
var QualityHold = require('../models/qualityHold');
var Machine = require('../models/machine');

var Activities = require('../models/activities');
const date = require('date-and-time');
const now = new Date();
var eDate = date.format(now, 'YYYY/MM/DD HH:mm:ss');
// Create endpoint /api/client for POST
exports.postQualityHolds = function(req, res) {
  // Create a new instance of the Client model
  var qualityHold = new QualityHold(req.body);

  // Set the client properties that came from the POST data
  
  Machine.findOne({machineId:req.body.machineId}, function(err, machine){
    if (err) {
      console.log(err);
    } else {
      console.log(machine);
      var qualityHold = new QualityHold(req.body);
      qualityHold.clientId = machine.clientId;
      qualityHold.save(function(err) {
        if (err)
          res.send(err);
        res.json({ message: 'qualityHold added to the locker!', data: qualityHold });
      });
      var activities = new Activities(req.body);
      
      activities.clientId = machine.clientId;
      activities.type = 'qualityHold';
      
      activities.date = eDate;

      activities.save(function(err) {
        if (err)
          console.log(err);
        // res.json({ message: 'qualityHold added to the locker!', data: qualityHold });
      });
    }
  });
 };

// Create endpoint /api/clients for GET
exports.getQualityHolds = function(req, res) {
  // Use the Client model to find all clients
  QualityHold.find({ clientId: req.body.clientId }, function(err, qualityHolds) {
    if (err)
      return res.send(err);

    res.json(qualityHolds);
  });
};