// Load required packages
var mongoose = require('mongoose');

// Define our client schema
var OeeSchema = new mongoose.Schema({
  // name: { type: String, unique: true, required: true },
  
   clientId: { type: String, required: true },
   shiftA: { type: Number},
   shiftB: { type: Number },
   shiftC: { type: Number},
   machineId: { type: String, required: true },
   totalOee: { type: Number},
   eDate: { type: Date },
   




  
  



});

// Export the Mongoose model
module.exports = mongoose.model('Oee', OeeSchema);