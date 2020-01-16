// Load required packages
var mongoose = require('mongoose');

// Define our client schema
var ComputedProductionSchema = new mongoose.Schema({
  // name: { type: String, unique: true, required: true },
  
   clientId: { type: String, required: true },
   shiftA: { type: Number, required: true },
   shiftB: { type: Number, required: true },
   shiftC: { type: Number},
   machineId: { type: String, required: true },
   totalProduction: { type: Number, required: true },
   eDate: { type: Date, required: true },

});

// Export the Mongoose model
module.exports = mongoose.model('ComputedProduction', ComputedProductionSchema);