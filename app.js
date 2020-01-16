var express = require('express');
var querystring = require('querystring');
var Request = require('request');
var CT='';

var downTimeLog = [];
// var DownTimeLog = require('../models/downTimeLog');
// exports.postDownTimeLogs = function(req, res) {
//var formData = querystring.stringify(data);
//console.log(formData);
// Machine.findOne({machineId:req.body.machineId}, function(err, machine){
//    if (err) {
//      console.log(err);
//    } else {
var data = {
machineId: 'a',
startDateTime: '2019-07-15 08:00:00',
endDateTime: '2019-08-20 15:00:00',
};

function callAPI(url,data,callback)
{
   var formData = querystring.stringify(data);
   Request.get({
   headers: { "Content-Type":'application/x-www-form-urlencoded',"Authorization":"BEARER 2HQ6xG29mp8kXslCDs8l1BhnSPxN2UdrftzFv8f9VrC1FrZ3RtHnHmDovMBZvPCDyXiEq910aH0VMIogWF61uWdTnZAIYf2ZXHXOiwoqZntbEUpxneq4Seu0BuLibNIwNrvsSt0PanuZphPWFdDyfNmTflUK3lZa8IOtvugkmWXOkb0wMwUgxzXzzbBKOZyqmthekO6e8R8yY6VSbe1csyqVSQCCXKcCfBmuFBHk7CWfkRyhqHvqaReD5rTelaE1" },
   url: url,
   body: formData
}, function(err, response) {
   callback(err, response);
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


callAPI("http://localhost:3000/api/cycleTimes",data,function(err,res){
  
   CT = res.body; 
   var jj=CT.length;
   console.log('cycleTime' + CT);
   console.log('cycleTimelennn' + jj);

   var arr = JSON.parse(CT);
   //console.log('1 ' + arr);
   //console.log('2 ' + arr.length);
    for (var i = 0; i < arr.length; i++) {

    if(i < (arr.length-1)){

      // console.log('patna-----' + arr[i]);
      console.log("startDateTime " + arr[i].startDateTime);
      console.log("endDateTime " + arr[i].endDateTime);
	  //  console.log('----------------');
	
	 var d1 = arr[i].startDateTime;
    var d2 = arr[i].endDateTime;
    var d3 = arr[i+1].startDateTime;
    var d4 = arr[i+1].endDateTime;
    var m  = arr[i].machineId;
    
	 var date1 = new Date(d1);
	 var date2 = new Date(d2);
	 var date3 = new Date(d3);
    var date4 = new Date(d4);
    
	 //  console.log('date1 ' + date1);
    //  console.log('date2 ' + date2);
    //  console.log('date3 ' + date3);
    //  console.log('date4 ' + date4);
     if((date3)-(date2)>120000){
      //  console.log('downTimeLog' + ((date3)-(date2)))
      var data1 =   {      'machineId' : arr[i].machineId,
      'startDateTime': arr[i].endDateTime,
       'endDateTime': arr[i+1].startDateTime,
        'downTimeReason' : 'idleTime',
       'totalMinutes' : (date3)-(date2)
       }
      callAPIdownTime("http://localhost:3000/api/downTimeLogs",data1,function(err,res){
         if (err) {
            console.log(err);
          } else {
            console.log(res);
          }
     });

      // downTimeLog.push({
      //    'machineId' : arr[i].machineId,
      //    'startDateTime': arr[i].endDateTime,
      //    'endDateTime': arr[i+1].startDateTime,
      //     'type' : 'idleTime',
         
      // //  })
      //  console.log('dgbjudgfb' + downTimeLog.length);
       
        
      //  };
      //   for (var j = 0; j < downTimeLog.length; j++){
      //    console.log(downTimeLog);
     
     };
     
   };
    
    

  

    };
   
  
  
  
});