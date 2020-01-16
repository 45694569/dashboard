
var express = require('express');
// var DownTimeLog = require('../models/downTimeLog');

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


// var arry = ACTI.length;
// var merge = require('merge');

function callAPI(url,data,callback)
{
   var formData = JSON.stringify(data);
   Request.get({
   headers: { "Content-Type":'application/json',"Authorization":"BEARER 2HQ6xG29mp8kXslCDs8l1BhnSPxN2UdrftzFv8f9VrC1FrZ3RtHnHmDovMBZvPCDyXiEq910aH0VMIogWF61uWdTnZAIYf2ZXHXOiwoqZntbEUpxneq4Seu0BuLibNIwNrvsSt0PanuZphPWFdDyfNmTflUK3lZa8IOtvugkmWXOkb0wMwUgxzXzzbBKOZyqmthekO6e8R8yY6VSbe1csyqVSQCCXKcCfBmuFBHk7CWfkRyhqHvqaReD5rTelaE1" },
   url: url,
   body: formData
}, function(err, response) {
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

var data = {
  machineId: 'a',
  clientId: 'kaya_id',
  startDateTime: '2019-07-13 08:00:00',
  endDateTime: '2019-08-15 21:10:00',
  };
async.series([
   function (callback){
      // console.log('one');
      callAPI("http://localhost:3000/api/cycleTimes",data,function(err,res){
        CT = res; 
        console.log(CT.length);

         callback(null,res);
     });
  },
   function (callback){
    // console.log('one');
    callAPI("http://localhost:3000/api/activitiess",data,function(err,res){
      ACTI = res; 
     console.log(ACTI.length);
      // var jj=CT.length
       callback(null,res);
   });
},  

function (callback){

var n=0;
var i=0;
for (var i=0;i<CT.length;i++){

 if(n<ACTI.length){
if(CT[i].endDateTime<ACTI[n].startDateTime){

 arr.push({
               'machineId' : CT[i].machineId,
               'startDateTime': CT[i].startDateTime,
               'endDateTime': CT[i].endDateTime,
                'type' : 'cycleTime'
          
 })
  

 
}
else{
  if(ACTI[n].endDateTime<CT[i].startDateTime){
  console.log('aaaa', ACTI[n]);
    
    arr.push({
      'machineId' : ACTI[n].machineId,
    'startDateTime': ACTI[n].startDateTime,
    'endDateTime': ACTI[n].endDateTime,
     'type' : ACTI[n].type
     
  });
    
    arr.push({
      'machineId' : CT[i].machineId,
      'startDateTime': CT[i].startDateTime,
      'endDateTime': CT[i].endDateTime,
       'type' : 'cycleTime'

});

n++;

}
  
}
 }else{
  arr.push({
    'machineId' : CT[i].machineId,
    'startDateTime': CT[i].startDateTime,
    'endDateTime': CT[i].endDateTime,
     'type' : 'cycleTime'
   
})
 }

}
callback(null,'res');

},
function (callback) {
  for (var i=0;i<arr.length;i++){
    
    if(arr[i].type == 'cycleTime'){
      if(i < (arr.length-1)){
      var d1 = arr[i].startDateTime;
      var d2 = arr[i].endDateTime;
      var d3 = arr[i+1].startDateTime;
      var d4 = arr[i+1].endDateTime;
     
         
           var date1 = new Date(d1);
           var date2 = new Date(d2);
           var date3 = new Date(d3);
            var date4 = new Date(d4);
             d = (((date3)-(date2))/1000)/60;
            if(d>2){
              //  console.log('downTimeLog' + ((date3)-(date2)))
                       
               var data1 =   {      'machineId' : arr[i].machineId,
               'startDateTime': arr[i].endDateTime,
               'endDateTime': arr[i+1].startDateTime,
               'type' : 'idleTime',
               'totalMinutes' : d
               }
              };
             }
            }else{
              if(i < (arr.length-1)){
                var d1 = arr[i].startDateTime;
                var d2 = arr[i].endDateTime;
                var date1 = new Date(d1);
                var date2 = new Date(d2);
                d = (((date2)-(date1))/1000)/60;
               if(d>2) {
                  //  console.log('downTimeLog' + ((date3)-(date2)))
                           
                   var data1 =   {      'machineId' : arr[i].machineId,
                   'startDateTime': arr[i].startDateTime,
                   'endDateTime': arr[i].endDateTime,
                   'type' : arr[i].type,
                   'totalMinutes' : d
                   }
                  };
              }
            }            
            callAPIdownTime("http://localhost:3000/api/downTimeLogs",data1,function(err,res){
              if (err) {
                 console.log(err);
               } else {
                 console.log(res);
               }
          });
    }
    
callback(null,'res');

  }


],
   function(err, results) {
    if (err) {
      return console.error(err);
    }
    console.log('gcvgfjj', arr);

  });
