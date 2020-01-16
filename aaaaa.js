
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


        callAPI("http://localhost:3000/api/downTimeLogs",data,function(err,res){
            downTime = res; 
            console.log('OOOOO',downTime);
            totalMinutes = downTime.totalMinutes;
            console.log('111111111111',totalMinutes);

            // var val = downTime.reduce(function(previousValue, currentValue) {
            //     return {
            //       totalMinutes: previousValue.totalMinutes + currentValue.totalMinutes,
                  
            //     }
            //   });
            //   console.log(val);
         });



    }


],
function(err, results) {
 if (err) {
   return console.error(err);
 }
//  console.log('gcvgfjj', arr);

});