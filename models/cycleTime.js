// Load required packages
var mongoose = require('mongoose');

// Define our client schema
var CycleTimeSchema = new mongoose.Schema({
  // name: { type: String, unique: true, required: true },
  
   clientId: { type: String, required: true },
   machineId: { type: String, required: true },
   dataId: { type: String },
   startDateTime: { type: Date, required: true  },
   endDateTime: { type: Date, required: true },

});

// Export the Mongoose model
module.exports = mongoose.model('CycleTime', CycleTimeSchema);