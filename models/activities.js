// Load required packages
var mongoose = require('mongoose');

// Define our client schema
var ActivitiesSchema = new mongoose.Schema({
  // name: { type: String, unique: true, required: true },
  
   clientId: { type: String },
   machineId: { type: String, required: true },
   dataId: { type: String },
   startDateTime: { type: Date, required: true },
   endDateTime: { type: Date, required: true },
   date: { type: Date },
   type: { type: String },
   
  

  

});

// Export the Mongoose model
module.exports = mongoose.model('Activities', ActivitiesSchema);