// Load required packages
var mongoose = require('mongoose');

// Define our client schema
var DownTimeLogSchema = new mongoose.Schema({
  // name: { type: String, unique: true, required: true },
  
   clientId: { type: String, required: true},
   machineId: { type: String, required: true },
   type: { type: String },
   startDateTime: { type: Date },
   endDateTime: { type: Date },
   totalMinutes: { type: Number },


});

// Export the Mongoose model
module.exports = mongoose.model('DownTimeLog', DownTimeLogSchema);
