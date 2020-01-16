// Load required packages
var mongoose = require('mongoose');

// Define our client schema
var ShiftTimingSchema = new mongoose.Schema({
  // name: { type: String, unique: true, required: true },
   clientId: { type: String, required: true },
  //  date: { type: Date },

   shiftA: { type: String},
   shiftB: { type: String},
   shiftC: { type: String },

});

// Export the Mongoose model
module.exports = mongoose.model('ShiftTiming', ShiftTimingSchema);