// Load required packages
var QuadHeartBeat = require('../models/quadHeartBeat');
var Machine = require('../models/machine');
// var Activities = require('../models/activities');
const date = require('date-and-time');
const now = new Date();
var eDate = date.format(now, 'YYYY/MM/DD HH:mm:ss');
// Create endpoint /api/quadHeartBeats for POSTS
exports.postQuadHeartBeats = function(req, res) {
   // Create a new instance of the quadHeartBeat model
   var quadHeartBeat = new QuadHeartBeat();
   // Set the quadHeartBeat properties that came from the POST data
   quadHeartBeat.dataId= req.body.dataId,
   quadHeartBeat.machineId= req.body.machineId,
   quadHeartBeat.clientId= req.body.clientId,
   quadHeartBeat.startDateTime= req.body.startDateTime,
   quadHeartBeat.endDateTime= req.body.endDateTime
 Machine.findOne({machineId:req.body.machineId}, function(err, machine){
   if (err) {
     console.log(err);
   } else {
     console.log(machine);
     var quadHeartBeat = new QuadHeartBeat(req.body);
     quadHeartBeat.clientId = machine.clientId;
     quadHeartBeat.save(function(err) {
       if (err)
         res.send(err);
       res.json({ message: 'quadHeartBeat added to the locker!', data: quadHeartBeat });
     });
    //  var activities = new Activities(req.body);
    //  activities.clientId = machine.clientId;
    //  activities.type = 'No Plan';
    //  activities.date = eDate;
    //  activities.save(function(err) {
    //    if (err)
    //      console.log(err);
    //    // res.json({ message: 'quadHeartBeat added to the locker!', data: quadHeartBeat });
    //  });
   }
 });
};
// Create endpoint /api/quadHeartBeats for GET
exports.getQuadHeartBeats = function(req, res) {
  // Use the quadHeartBeat model to find all quadHeartBeat
  QuadHeartBeat.find({ userId: req.user._id }, function(err, quadHeartBeats) {
   if (err)
     res.send(err);
   res.json(quadHeartBeats);
  });
  };