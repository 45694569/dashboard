// Load required packages
var mongoose = require('mongoose');

// Define our client schema
var NoManPowerSchema = new mongoose.Schema({
  // name: { type: String, unique: true, required: true },
  
   clientId: { type: String, required: true },
   machineId: { type: String, required: true },
   dataId: { type: String },
   startDateTime: { type: String },
   endDateTime: { type: String },



  
  



});

// Export the Mongoose model
module.exports = mongoose.model('NoManPower', NoManPowerSchema);