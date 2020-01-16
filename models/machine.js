// Load required packages
var mongoose = require('mongoose');

// Define our client schema
var MachineSchema = new mongoose.Schema({
  // name: { type: String, unique: true, required: true },
  machineName: { type: String},
  machineType: { type: String, required: true },
   clientId: { type: String, required: true  },
  machineId: { type: String, required: true },
  
  
  lastHeartBeat: { type: Date },
  lastCycleTime: { type: Date  },
  hourlyTarget: { type: Number , required: true },

  
  operatorId: { type: String},


});

// Export the Mongoose model
module.exports = mongoose.model('Machine', MachineSchema);