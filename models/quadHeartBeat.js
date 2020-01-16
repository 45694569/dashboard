var mongoose = require('mongoose');
const QuadHeartBeatSchema = new mongoose.Schema({
   dataId: String,
   machineId: String,
   clientId: String,
   eTimeStamp: String,
   created: String,
   statement: String,
   eDate: String
}, {
   timestamps: true
});
module.exports = mongoose.model('QuadHeartBeat', QuadHeartBeatSchema);