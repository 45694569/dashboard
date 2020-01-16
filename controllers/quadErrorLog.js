var QuadErrorLog = require('../models/quadErrorLog');
var Machine = require('../models/machine');
// var Activities = require('../models/activities');
const date = require('date-and-time');
const now = new Date();
var eDate = date.format(now, 'YYYY/MM/DD HH:mm:ss');
exports.postQuadErrorLogs = function(req, res) {
   var quadErrorLog = new QuadErrorLog();
   quadErrorLog.dataId= req.body.dataId,
   quadErrorLog.machineId= req.body.machineId,
   quadErrorLog.clientId=req.body.clientId,
   quadErrorLog.eTimeStamp= req.body.eTimeStamp,
   quadErrorLog.eDate= req.body.eDate
       Machine.findOne({machineId:req.body.machineId}, function(err, machine){
           if (err) {
             console.log(err);
           } else {
             console.log(machine);
             var quadErrorLog = new QuadErrorLog(req.body);
             quadErrorLog.clientId = machine.clientId;
             quadErrorLog.eDate = eDate;
             quadErrorLog.save(function(err) {
               if (err)
                 res.send(err);
               res.json({ message: 'quadErrorLog added to the locker!', data: quadErrorLog });
             });
            //  var activities = new Activities(req.body);
            //  activities.clientId = machine.clientId;
            //  activities.type = 'quadErrorLog';
            //  activities.date = eDate;
            //  activities.save(function(err) {
            //    if (err)
            //      console.log(err);
            //    // res.json({ message: 'quadErrorLog added to the locker!', data: quadErrorLog });
            //  });
           }
         });
       };
       // Create endpoint /api/noPlans for GET
       exports.getQuadErrorLogs = function(req, res) {
       QuadErrorLog.find(function(err, quadErrorLog) {
         if (err)
           res.send(err);
         res.json(quadErrorLog);
       });
       };