// Load required packages
var CycleTime = require('../models/cycleTime');
var Machine = require('../models/machine');
var ComputedProduction = require('../models/computedProduction');
// var anubhav = ['shiftA', 'shiftB', 'shiftc', ' totalProduction'] ;


var ShiftTiming = require('../models/shiftTiming');
const date = require('date-and-time');
const now = new Date();
var eDate = date.format(now, 'YYYY-MM-DD HH:mm:ss');
// Create endpoint /api/client for POST
exports.postCycleTimes = function(req, res) {
  // Create a new instance of the Client model
  // var cycleTime = new CycleTime(req.body);

  // Set the client properties that came from the POST data
  

  // Save the CycleTime and check for errors
  Machine.findOne({machineId:req.body.machineId}, function(err, machine){
    if (err) {
      console.log(err);
    } else {
      console.log(machine);
      var cycleTime = new CycleTime(req.body);
      cycleTime.clientId = machine.clientId;
      cycleTime.save(function(err) {
        if (err)
          res.send(err);

        res.json({ message: 'cycleTime added to the locker!', data: cycleTime });
      });
      ShiftTiming.findOne({clientId:machine.clientId}, function(err,shiftTiming){
        if (err) {
          console.log(err);
        } else {
          console.log(shiftTiming);

          var current = new Date(req.body.startDateTime);
          var currentDate;
          var h = current.getHours() < 10 ? "0" + current.getHours() : current.getHours();
          var m = current.getMinutes() < 10 ? "0" + current.getMinutes() : current.getMinutes();
          var s = current.getSeconds() < 10 ? "0" + current.getSeconds() : current.getSeconds();
          var currentTime = h + ":" + m + ":" + s;

          if (currentTime >= "00:00:00" && currentTime < shiftTiming.shiftA){
            console.log("after midnight");
            current.setDate(current.getDate()-1);
            var currMonth = ('0' + (current.getMonth() + 1)).slice(-2);
            var currYear = current.getFullYear();
            var currDate = ('0' + current.getDate()).slice(-2);
            currentDate = currYear + "-" + currMonth + "-" + currDate;
            // console.log(currentDate);
          } else {
            console.log("before midnight");
            var currMonth = ('0' + (current.getMonth() + 1)).slice(-2);
            var currYear = current.getFullYear();
            var currDate = ('0' + current.getDate()).slice(-2);
            currentDate = currYear + "-" + currMonth + "-" + currDate;
            // console.log(currentDate);
          }
          console.log(currentDate);
          var shiftA=0;
          var shiftB=0;
          var shiftC=0;
          var totalProduction=0;

          ComputedProduction.findOne({clientId:machine.clientId,machineId:req.body.machineId,eDate:currentDate }, function(err,computedProduction){
            
          
            if (err) {
              console.log(err);
            } else {
              console.log(computedProduction);
              if (computedProduction != null) {
                console.log(computedProduction);
                 if (shiftTiming.shiftC == ""){
                  if (currentTime >= shiftTiming.shiftA && currentTime < shiftTiming.shiftB) {
                 
                    shiftA=computedProduction.shiftA+1;
                    shiftB= computedProduction.shiftB;  
                    totalProduction = shiftA + shiftB;
                  }else
                  {

                    shiftA=computedProduction.shiftA;
                    shiftB=computedProduction.shiftB+1;
                    totalProduction = shiftA + shiftB;
                    
                  
                }
                

                 } else{
                  if (currentTime >= shiftTiming.shiftA && currentTime < shiftTiming.shiftB) {
                    shiftA=computedProduction.shiftA+1;
                    shiftB= computedProduction.shiftB;
                    shiftC= computedProduction.shiftC;  

                    totalProduction = shiftA + shiftB +  shiftC;
                  }else if(currentTime >= shiftTiming.shiftB && currentTime < shiftTiming.shiftC){

                    shiftA=computedProduction.shiftA;
                    shiftB= computedProduction.shiftB+1;  
                    shiftC= computedProduction.shiftC;  

                    totalProduction = shiftA + shiftB +  shiftC;
                  } else{
                    shiftA=computedProduction.shiftA;
                    shiftB= computedProduction.shiftB;
                    shiftC= computedProduction.shiftC+1;  

                    totalProduction = shiftA + shiftB +  shiftC;
                  }
                }
                var computedProduction = {
                  clientId:machine.clientId,
                  machineId:req.body.machineId,
                  eDate:currentDate,
                  shiftA:shiftA,
                  shiftB:shiftB,
                  shiftC:shiftC,
                  totalProduction:totalProduction,
                };
                    ComputedProduction.updateOne({clientId:machine.clientId,machineId:req.body.machineId,eDate:currentDate },computedProduction, function(err, computedProduction){
                      if(err)
                       next(err);
                      else {
                        console.log(computedProduction);
                      }
                     });


                }else{
                  if (shiftTiming.shiftC == "") {
                    if (currentTime >= shiftTiming.shiftA && currentTime < shiftTiming.shiftB) {
                 
                      shiftA=1;
                      shiftB=0;  
                      totalProduction = shiftA + shiftB;
                    }else
                    {
  
                      shiftA=0;
                      shiftB=1;  
                      totalProduction = shiftA + shiftB;
                      
                    
                  }
                  
  
                   } else{
                    if (currentTime >= shiftTiming.shiftA && currentTime < shiftTiming.shiftB) {
                      shiftA=1;
                      shiftB=0;
                      shiftC=0;
                      totalProduction =  shiftA +  shiftB + shiftC;
  
                      // computedProduction.totalProduction = computedProduction.shiftA + computedProduction.shiftB +  computedProduction.shiftC;
                    }else if(currentTime >= shiftTiming.shiftB && currentTime < shiftTiming.shiftC){
                      shiftA=0;
                      shiftB=1;
                      shiftC=0;
                      totalProduction =  shiftA +  shiftB + shiftC;
                    } else{
                      shiftA=0;
                      shiftB=0;
                      shiftC=1;
                      totalProduction =  shiftA +  shiftB + shiftC;
                    }
                
                   }
                   var computedProduction = new ComputedProduction();
                   computedProduction.clientId = machine.clientId;
                   computedProduction.machineId = req.body.machineId;
                   computedProduction.eDate = currentDate;
                   computedProduction.shiftA = shiftA;
                   computedProduction.shiftB = shiftB;
                   computedProduction.shiftC = shiftC;
                   computedProduction.totalProduction = totalProduction;
                   computedProduction.save(function(err) {
                     if (err){
                  
                     }
                       
             
                    
                   });
                }
            }
          });
             
        }
      });
    }
  });
};


// Create endpoint /api/clients for GET
exports.getCycleTimes = function(req, res) {
  // Use the Client model to find all clients
  // CycleTime.find({ clientId: req.body.clientId }, function(err, cycleTime) {
  //   if (err)
  //     return res.send(err);

  //   res.json(cycleTime);
  // });
  console.log(req.body);
  CycleTime.find({
    machineId:req.body.machineId,
    startDateTime: {
        $gte:req.body.startDateTime,
        $lt: req.body.endDateTime
    }
  }, function(err, cycleTime) {
    if (err)
      return res.send(err);

    res.json(cycleTime);
  }).sort({"startDateTime":1});
};



