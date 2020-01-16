var mongoose = require('mongoose');
const QuadErrorLogSchema =  new mongoose.Schema({
   dataId: String,
   machineId: String,
   clientId: String,
   eTimeStamp: String,
   created: String,
   eDate: String
}, {
   timestamps: true
});
module.exports = mongoose.model('QuadErrorLog', QuadErrorLogSchema);