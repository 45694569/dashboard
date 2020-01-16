// Load required packages
var Activities = require('../models/activities');

// Create endpoint /api/client for POST
exports.postActivitiess = function(req, res) {
  // Create a new instance of the Client model
  var activities = new Activities(req.body);

  // Set the client properties that came from the POST data
  

  // Save the activities and check for errors
  activities.save(function(err) {
    if (err)
      return res.send(err);

    res.json({ message: 'Activities added to the locker!', data: activities });
  });
};

// Create endpoint /api/clients for GET
exports.getActivitiess = function(req, res) {
  // Use the Client model to find all clients
  console.log(req.body);
  Activities.find({  machineId:req.body.machineId,
    startDateTime: {
        $gte:req.body.startDateTime,
        $lt: req.body.endDateTime
  }}, function(err, activitiess) {
    if (err)
      return res.send(err);

    res.json(activitiess);
  }).sort({"startDateTime":1});

};