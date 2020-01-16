// Load required packages
var DownTimeLog = require('../models/downTimeLog');

// Create endpoint /api/client for POST
exports.postDownTimeLogs = function(req, res) {
  // Create a new instance of the Client model
  var downTimeLog = new DownTimeLog(req.body);

  // Set the client properties that came from the POST data
  

  // Save the DownTimeLog and check for errors

  downTimeLog.save(function(err) {
    if (err)
      return res.send(err);

    res.json({ message: 'DownTimeLog added to the locker!', data: downTimeLog });
  });
};

// Create endpoint /api/clients for GET
exports.getDownTimeLogs = function(req, res) {
  // Use the Client model to find all clients
  // DownTimeLog.find({ clientId: req.body.clientId }, function(err, downTimeLogs) {
  //   if (err)
  //     return res.send(err);

  //   res.json(downTimeLogs);
  // });
  console.log(req.body);


  DownTimeLog.find({
    clientId:req.body.clientId,
    startDateTime: {
        $gte:req.body.startDateTime,
        $lt: req.body.endDateTime,
       
    },
    
  }, function(err, downTimeLogs) {
    if (err)
      return res.send(err);

    res.json(downTimeLogs);
  }).sort({"startDateTime":1});



};