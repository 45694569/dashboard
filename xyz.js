
var express = require('express');
// var DownTimeLog = require('../models/downTimeLog');
var cron = require('node-cron');
var querystring = require('querystring');
var Request = require('request');
var async = require('async');
var CT;
var ACTI;
var arry = [];
var arr = [];
var arr1 = [];
var d;
var shiftTiming;
var downTimeLog = [];
var currentShift;
var differ;
var startDateTime;
var endDateTime;
var currentTime;
var currentDate;
var efficiency;
var totalMinutesl;
var down;
var plannedProductionTime;

// var totalEfficiency;
// var arry = ACTI.length;
// var merge = require('merge');
var current = new Date();
var currMonth = ('0' + (current.getMonth() + 1)).slice(-2);
var currYear = current.getFullYear();
var currDate = ('0' + current.getDate()).slice(-2);
currentDate = currYear + "-" + currMonth + "-" + currDate;
function callAPI(url,data,callback)
{
   var formData = JSON.stringify(data);
   Request.get({
   headers: { "Content-Type":'application/json',"Authorization":"BEARER 2HQ6xG29mp8kXslCDs8l1BhnSPxN2UdrftzFv8f9VrC1FrZ3RtHnHmDovMBZvPCDyXiEq910aH0VMIogWF61uWdTnZAIYf2ZXHXOiwoqZntbEUpxneq4Seu0BuLibNIwNrvsSt0PanuZphPWFdDyfNmTflUK3lZa8IOtvugkmWXOkb0wMwUgxzXzzbBKOZyqmthekO6e8R8yY6VSbe1csyqVSQCCXKcCfBmuFBHk7CWfkRyhqHvqaReD5rTelaE1" },
   url: url,
   body: formData
}, function(err, response) {
  //  console.log('aaaa',response);
  var body = JSON.parse(response.body);
   callback(err, body);
});
}
function callAPIdownTime(url,data,callback)
{
   var downData = querystring.stringify(data);
   Request.post({
   headers: { "Content-Type":'application/x-www-form-urlencoded',"Authorization":"BEARER 2HQ6xG29mp8kXslCDs8l1BhnSPxN2UdrftzFv8f9VrC1FrZ3RtHnHmDovMBZvPCDyXiEq910aH0VMIogWF61uWdTnZAIYf2ZXHXOiwoqZntbEUpxneq4Seu0BuLibNIwNrvsSt0PanuZphPWFdDyfNmTflUK3lZa8IOtvugkmWXOkb0wMwUgxzXzzbBKOZyqmthekO6e8R8yY6VSbe1csyqVSQCCXKcCfBmuFBHk7CWfkRyhqHvqaReD5rTelaE1" },
   url: url,
   body: downData
}, function(err, response) {
   callback(err, response);
});
}


function callAPIput(url,data,callback)
{
   var putData = querystring.stringify(data);
   Request.put({
   headers: { "Content-Type":'application/x-www-form-urlencoded',"Authorization":"BEARER 2HQ6xG29mp8kXslCDs8l1BhnSPxN2UdrftzFv8f9VrC1FrZ3RtHnHmDovMBZvPCDyXiEq910aH0VMIogWF61uWdTnZAIYf2ZXHXOiwoqZntbEUpxneq4Seu0BuLibNIwNrvsSt0PanuZphPWFdDyfNmTflUK3lZa8IOtvugkmWXOkb0wMwUgxzXzzbBKOZyqmthekO6e8R8yY6VSbe1csyqVSQCCXKcCfBmuFBHk7CWfkRyhqHvqaReD5rTelaE1" },
   url: url,
   body: putData
}, function(err, response) {
   callback(err, response);
});
}




var data = {
  machineId: 'a',
  clientId: 'kaya_id',
  // startDateTime: '2019-07-13 08:00:00',
  // endDateTime: '2019-08-15 21:10:00',
  // startDateTime: startDateTime,
  // endDateTime:  currentTime,
  eDate : currentDate,
  };
  async.series([


    function (callback) {
    
        callAPI("http://localhost:3000/api/shiftTimings",data,function(err,res){
          shiftTiming = res;
         
          var breaks;
           breaks=45;
              
          var current = new Date();
          var currentDate;
          var h = current.getHours() < 10 ? "0" + current.getHours() : current.getHours();
          var m = current.getMinutes() < 10 ? "0" + current.getMinutes() : current.getMinutes();
          var s = current.getSeconds() < 10 ? "0" + current.getSeconds() : current.getSeconds();
          var currentTime = h + ":" + m + ":" + s;
          var currentDateTime = new Date(currentDate + ' ' + currentTime);
    
          if (currentTime >= "00:00:00" && currentTime < shiftTiming.shiftA){
            // console.log("after midnight");
            current.setDate(current.getDate()-1);
            var currMonth = ('0' + (current.getMonth() + 1)).slice(-2);
            var currYear = current.getFullYear();
            var currDate = ('0' + current.getDate()).slice(-2);
            currentDate = currYear + "-" + currMonth + "-" + currDate;
            // console.log(currentDate);
          } else {
            // console.log("before midnight");
            var currMonth = ('0' + (current.getMonth() + 1)).slice(-2);
            var currYear = current.getFullYear();
            var currDate = ('0' + current.getDate()).slice(-2);
            currentDate = currYear + "-" + currMonth + "-" + currDate;
            // console.log(currentDate);
          }
          // console.log(currentDate);
          // var shiftA=0;
          // var shiftB=0;
          // var shiftC=0;
          // var totalEfficiency=0;
    
          if (shiftTiming.shiftC == ""){
            if (currentTime >= shiftTiming.shiftA && currentTime < shiftTiming.shiftB) {
             currentShift = "A";
             shiftDate = new Date(currentDate + ' ' + shiftTiming.shiftA);
              startDateTime = new Date(currentDate + ' ' + shiftTiming.shiftA);
              startDateTime.setTime(startDateTime.getTime() + (330*60*1000));
              endDateTime = new Date(currentDate + ' ' + shiftTiming.shiftB);
              endDateTime.setTime(endDateTime.getTime() + (330*60*1000));
              var currentDateTime = new Date(currentDate + ' ' + currentTime);
              // console.log('shift date' + startDateTimeA + 'my' + currentDateTime );
                differ =( ((currentDateTime )- (shiftDate))/60000);
              // console.log('diff' + differ);
            }else
            {
            currentShift = "B";
            shiftDate = new Date(currentDate + ' ' + shiftTiming.shiftB);
             startDateTime = new Date(currentDate + ' ' + shiftTiming.shiftB);
             startDateTime.setTime(startDateTime.getTime() + (330*60*1000));
             endDateTime = new Date(currentDate + ' ' + shiftTiming.shiftA);
             endDateTime.setTime(endDateTime.getTime() + (330*60*1000));
              var currentDateTime = new Date(currentDate + ' ' + currentTime);
              // console.log('shift date' + startDateTimeB + 'my' + currentDateTime );
                differ =( ((currentDateTime ) - (shiftDate))/60000);
              // console.log('diff' + differ);
          }
          
           } 
           
           else{
            if (currentTime >= shiftTiming.shiftA && currentTime < shiftTiming.shiftB) {
             currentShift = "A";
             shiftDate = new Date(currentDate + ' ' + shiftTiming.shiftA);
              startDateTime = new Date(currentDate + ' ' + shiftTiming.shiftA);
              endDateTime = new Date(currentDate + ' ' + shiftTiming.shiftB);
             var currentDateTime = new Date(currentDate + ' ' + currentTime);
            //  console.log('shift date' + startDateTimeA + 'my' + currentDateTime );
              //  var startDateTime = startDateTimeA;
              //  var endDateTime = currentTime;
               differ =( ((currentDateTime )- (shiftDate))/60000);
            //  console.log('diff' + differ);
            }
            
            else if(currentTime >= shiftTiming.shiftB && currentTime < shiftTiming.shiftC){
    
             currentShift = "B";
             shiftDate = new Date(currentDate + ' ' + shiftTiming.shiftB);
              startDateTime = new Date(currentDate + ' ' + shiftTiming.shiftB);
              endDateTime = new Date(currentDate + ' ' + shiftTiming.shiftC);
             currentDateTime = new Date(currentDate + ' ' + currentTime);
            //  console.log('shift date' + startDateTimeB + 'my' + currentDateTime );
               differ =( ((currentDateTime )- (shiftDate))/60000);
            //  console.log('diff' + differ);
            }
            
            else{
             currentShift = "C";
             shiftDate = new Date(currentDate + ' ' + shiftTiming.shiftC);
              startDateTime = new Date(currentDate + ' ' + shiftTiming.shiftC);
              endDateTime = new Date(currentDate + ' ' + shiftTiming.shiftA);
             var currentDateTime = new Date(currentDate + ' ' + currentTime);
            //  console.log('shift date' + startDateTimeC + 'my' + currentDateTime );
               differ =( ((currentDateTime )- (shiftDate))/60000);
            //  console.log('diff' + differ);
            }
          }
          breaks = 45;
    // var startDateTime = new Date(currentDate + ' ' + shiftTiming.shiftA);
    // var currentDateTime = new Date(currentDate + ' ' + currentTime);
    // console.log('shift date' + startDateTime + 'my' + currentDateTime );
    // var differ =( ((currentDateTime )- (shiftTiming.shift))/360000);
    //  console.log('diff' + differ);
             plannedProductionTime = differ-breaks;
        //  console.log('cccccc' + plannedProductionTime);
           callback(null,res);
    
      });
    
    },
   
    function (callback){
      callAPI("http://localhost:3000/api/machines",data,function(err,res){
            machines = res;
      //  console.log(machines);
    
       async.forEachSeries(machines, function(m , machinesCallback){
        // console.log(m);
         target = (m.hourlyTarget)*differ;
         machineId = m.machineId;





        //  console.log('target' + target)
        // machinesCallback()
        var data4={
          clientId: 'kaya_id',
          machineId: m.machineId,
          eDate : currentDate,
          startDateTime : startDateTime,
          endDateTime: endDateTime,
          
        }
         console.log('data4',data4);
    
    
        
        async.series([
          
         



        function (mCallback){
     
          callAPI("http://localhost:3000/api/computedProductions",data4,function(err,res){
                 computedProductions = res;
              
                 
               
              //  console.log('computedProductions',computedProductions);
               if (currentShift== "A"){
                 var actual = computedProductions.shiftA;
                  efficiency = (actual/target)*100;
                //  console.log(efficiency);
               }else if (currentShift== "B") {
                var actual = computedProductions.shiftB;
                 efficiency = (actual/target)*100;
                // console.log(efficiency);
               } else {
                var actual = computedProductions.shiftC;
                 efficiency = (actual/target)*100;
                // console.log(efficiency);
               };
                
                 
    
               
              mCallback(null,res);
           
        });
        
        },
        
      function (mCallback)
      {
        callAPI("http://localhost:3000/api/efficiencies",data4,function(err,res){
                        EFF = res;
                       
                        console.log('ffffff',EFF);
                       var effA;
                       var effB;
                       var effC;
                       
                      
                        var totalEfficiency=0;
           
                 
             if (EFF != null) {
               
                    // console.log(EFF);
                     
                      if (currentShift == "A") {
                     
                           effA = efficiency;
                          effB = EFF.shiftB;
                          effC = EFF.shiftC;
    
                         totalEfficiency = effA 
                          //  console.log(effA);
                      } else if(currentShift == "B")
                      {
    
                         effA = EFF.shiftA;
                         effB = efficiency;
                         effC = EFF.shiftC;
    
                         totalEfficiency = (effA + effB)/2
                          //  console.log(effB);
                        
                      
                    }else{
                       effA = EFF.shiftA;
                       effB = EFF.shiftB;
                       effC = efficiency;
                       
                       totalEfficiency = (effA + effB + effC)/3
                        //  console.log(effC);
                    }
                       
                    var data5 = {
                      'clientId': 'kaya_id',
                      'machineId': m.machineId,
                      'eDate' : currentDate,
                      'shiftA':effA,
                      'shiftB':effB,
                      'shiftC':effC,
                      'totalEfficiency':totalEfficiency
                     }
                    //  data5.shiftA= "efficiency";
                    //  data5.shiftB= "efficiency";
                    //  data5.shiftC= "efficiency";
                    // var abc;
                        // console.log('qwerty',ccc);
                        // var a = "http://localhost:3000/api/efficiency";
                        // var b =abc._id;
                        // var c = a+b;
    
                       
                        
                            
    
                        var a = "http://localhost:3000/api/efficiencies/";
                        var b = EFF._id;
                        var c = a.concat(b);
                        // console.log('uuuuuuuu',c);
                        callAPIput(c,data5,function(err,res){
                              //  abc = res;
                               
                                      
                          if (err) {
                            //  console.log(err);
                           } else {
                            //  console.log(res);
                           }
                      });
    
    
                    }
                  
                    else{
                      
                        if (currentShift== "A") {
                     
                          effA=efficiency;
                          effB=0;
                          effC=0;
                          totalEfficiency = effA ;
                        }else if(currentShift== "B")
                        {
      
                          effA=0;
                          effB=efficiency;
                          effC=0;
    
                          totalEfficiency = (effA + effB)/2;
                     
                      }else{
                        effA=0;
                        effB=0;
                        effC=efficiency;
                        totalEfficiency = (effA + effB + effC)/3;
    
                      }
                      
                      var data6 = {
                        'clientId': 'kaya_id',
                        'machineId': m.machineId,
                        'eDate' : currentDate,
                        'shiftA':effA,
                        'shiftB':effB,
                        'shiftC':effC,
                        'totalEfficiency':totalEfficiency
                       };
                       
                      callAPIdownTime("http://localhost:3000/api/efficiencies",data6,function(err,res){
                        if (err) {
                          //  console.log(err);
                         } else {
                           var anu = JSON.parse(res.body);
                           console.log('qqqqqqqqqqq',anu);
                         }
                    });
                     
                    
                     
                   
                      }
                      
                     
                  
      mCallback(null,res);
                     
      });
    
      },
      function (mCallback){
        // var data6={};
        callAPI("http://localhost:3000/api/downTimeLogs",data4,function(err,res){
                down=res;
                 console.log(down);
                 var sumofdown=0;
                 for(i=0; i<down.length; i++){
                  sumofdown= sumofdown + down[i].totalMinutes;
                 console.log('total downTime',sumofdown);

                 }
        
         var runTime = plannedProductionTime - sumofdown;
         console.log('runtime',runTime);
         availability = runTime/plannedProductionTime;
         console.log('availability',availability);
         
              quality=1;


              oee = quality* efficiency * availability * 100;
              console.log("oee " + oee);


                 mCallback(null,res);

      });
      },
      function (mCallback)
      {
        callAPI("http://localhost:3000/api/oees",data,function(err,res){
                        OE = res;
                       
                        console.log('eeeee',OE);
                       var effA;
                       var effB;
                       var effC;
                       
                      
                        var totalOee=0;
           
                 
             if (OE != null) {
               
                    // console.log(EFF);
                     
                      if (currentShift == "A") {
                     
                           effA = oee;
                          effB = OE.shiftB;
                          effC = OE.shiftC;
    
                         totalOee = effA 
                          //  console.log(effA);
                      } else if(currentShift == "B")
                      {
    
                         effA = OE.shiftA;
                         effB = efficiency;
                         effC = OE.shiftC;
    
                         totalOee = (effA + effB)/2
                          //  console.log(effB);
                        
                      
                    }else{
                       effA = OE.shiftA;
                       effB = OE.shiftB;
                       effC = efficiency;
                       
                       totalOee = (effA + effB + effC)/3
                        //  console.log(effC);
                    }
                       
                    var data5 = {
                      'clientId': 'kaya_id',
                      'machineId': m.machineId,
                      'eDate' : currentDate,
                      'shiftA':effA,
                      'shiftB':effB,
                      'shiftC':effC,
                      'totalOee':totalOee
                     }
                    //  data5.shiftA= "efficiency";
                    //  data5.shiftB= "efficiency";
                    //  data5.shiftC= "efficiency";
                    // var abc;
                        // console.log('qwerty',ccc);
                        // var a = "http://localhost:3000/api/efficiency";
                        // var b =abc._id;
                        // var c = a+b;
    
                       
                        
                            
    
                        var a = "http://localhost:3000/api/oees/";
                        var b = OE._id;
                        var c = a.concat(b);
                        // console.log('uuuuuuuu',c);
                        callAPIput(c,data7,function(err,res){
                              //  abc = res;
                               
                                      
                          if (err) {
                            //  console.log(err);
                           } else {
                            //  console.log(res);
                           }
                      });
    
    
                    }
                  
                    else{
                      
                        if (currentShift== "A") {
                     
                          effA=oee;
                          effB=0;
                          effC=0;
                          totalOee = effA ;
                        }else if(currentShift== "B")
                        {
      
                          effA=0;
                          effB=oee;
                          effC=0;
    
                          totalOee = (effA + effB)/2;
                     
                      }else{
                        effA=0;
                        effB=0;
                        effC=oee;
                        totalOee = (effA + effB + effC)/3;
    
                      }
                      
                      var data7 = {
                        'clientId': 'kaya_id',
                        'machineId': m.machineId,
                        'eDate' : currentDate,
                        'shiftA':effA,
                        'shiftB':effB,
                        'shiftC':effC,
                        'totalOee':totalOee
                       };
                       
                      callAPIdownTime("http://localhost:3000/api/oees",data7,function(err,res){
                        if (err) {
                          //  console.log(err);
                         } else {
                          
                         }
                    });
                     
                    
                     
                   
                      }
                      
                     
                  
    
                     
      });
      
      mCallback(null,res);
    }, 
    ],
    function(err, results) {
     if (err) {
      //  return console.error(err);
     }else{
         machinesCallback()
        // console.log( machinesCallback);
     }
    
     
     // console.log('gcvgfjj', arr);
    
     // console.log(results);
     // res.end(JSON.stringify(results));
     // var test = merge(results[0], results[1]);
    });
       });
         
      });
      // callback(null,'res');
    
    }
    
    ],
       function(err, results) {
        if (err) {
          // return console.error(err);
        }
        // console.log('gcvgfjj', arr);
    
        // console.log(results);
        // res.end(JSON.stringify(results));
        // var test = merge(results[0], results[1]);
      });
    