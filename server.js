// Load required packages
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var session = require('express-session');
var passport = require('passport');
var beerController = require('./controllers/beer');
var userController = require('./controllers/user');
// var machineController = require('./controllers/machine');
var authController = require('./controllers/auth');
var oauth2Controller = require('./controllers/oauth2');
var clientController = require('./controllers/client');
var machineController = require('./controllers/machine');
var shiftTimingController = require('./controllers/shiftTiming');
var computedProductionController = require('./controllers/computedProduction');
var cycleTimeController = require('./controllers/cycleTime');
var downTimeLogController = require('./controllers/downTimeLog');
var toolChangeController = require('./controllers/toolChange');
var operatorChangeController = require('./controllers/operatorChange');
var maintenanceController = require('./controllers/maintenance');
var noManPowerController = require('./controllers/noManPower');
var qualityHoldController = require('./controllers/qualityHold');
var noRawMaterialController = require('./controllers/noRawMaterial');
var noPlanController = require('./controllers/noPlan');
var machineBreakDownController = require('./controllers/machineBreakDown');
var toolBreakDownController = require('./controllers/toolBreakDown');
var activitiesController = require('./controllers/activities');
var efficiencyController = require('./controllers/efficiency');
var quadErrorLogController = require('./controllers/quadErrorLog');
var quadHeartBeatController = require('./controllers/quadHeartBeat');
var oeeController = require('./controllers/oee');









// Connect to the beerlocker MongoDB
mongoose.connect('mongodb://localhost:27017/beerlocker');

// Create our Express application
var app = express();

// Set view engine to ejs
app.set('view engine', 'ejs');

// Use the body-parser package in our application
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// Use express session support since OAuth2orize requires it
app.use(session({
  secret: 'Super Secret Session Key',
  saveUninitialized: true,
  resave: true
}));

// Use the passport package in our application
app.use(passport.initialize());

// Create our Express router
var router = express.Router();

// Create endpoint handlers for /beers
router.route('/beers')
  .post(authController.isAuthenticated, beerController.postBeers)
  .get(authController.isAuthenticated, beerController.getBeers);

// Create endpoint handlers for /beers/:beer_id
router.route('/beers/:beer_id')
  .get(authController.isAuthenticated, beerController.getBeer)
  .put(authController.isAuthenticated, beerController.putBeer)
  .delete(authController.isAuthenticated, beerController.deleteBeer);


// // Create endpoint handlers for /machines
// router.route('/machines')
//   .post(authController.isAuthenticated, machineController.postMachines)
//   .get(authController.isAuthenticated, machineController.getMachines);

// // Create endpoint handlers for /machines/:machine_id
// router.route('/machines/:machine_id')
//   .get(authController.isAuthenticated, machineController.getMachine)
//   .put(authController.isAuthenticated, machineController.putMachine)
//   .delete(authController.isAuthenticated, machineController.deleteMachine);




// Create endpoint handlers for /users
router.route('/users')
  .post(userController.postUsers)
  .get(authController.isAuthenticated, userController.getUsers);

// Create endpoint handlers for /clients
router.route('/clients')
  .post(authController.isAuthenticated, clientController.postClients)
  .get(authController.isAuthenticated, clientController.getClients);



// Create endpoint handlers for /machines
router.route('/machines')
  .post(authController.isAuthenticated, machineController.postMachines)
  .get(authController.isAuthenticated, machineController.getMachines);

// Create endpoint handlers for /shiftTimings
// router.route('/shiftTimings')
//   .post(authController.isAuthenticated, shiftTimingController.postShiftTimings)
//   .get(authController.isAuthenticated, shiftTimingController.getShiftTimings);

// Create endpoint handlers for /computedProductions
router.route('/computedProductions')
  .post(authController.isAuthenticated, computedProductionController.postComputedProductions)
  .get(authController.isAuthenticated, computedProductionController.getComputedProductions);


// Create endpoint handlers for /cycleTimes
router.route('/cycleTimes')
  .post(authController.isAuthenticated, cycleTimeController.postCycleTimes)
  .get(authController.isAuthenticated, cycleTimeController.getCycleTimes);









// Create endpoint handlers for /shiftTimings
router.route('/shiftTimings')
  .post(authController.isAuthenticated, shiftTimingController.postShiftTimings)
  .get(authController.isAuthenticated, shiftTimingController.getShiftTimings);










// Create endpoint handlers for /efficiencies
router.route('/efficiencies')
  .post(authController.isAuthenticated, efficiencyController.postEfficiencies)
  .get(authController.isAuthenticated, efficiencyController.getEfficiencies);
  // .put(authController.isAuthenticated, efficiencyController.putEfficiencies);




   // Create endpoint handlers for /efficiencies/:efficiency_id
   router.route('/efficiencies/:efficiency_id')
   .put(authController.isAuthenticated, efficiencyController.putEfficiencies);
      
// Create endpoint handlers for /oees
router.route('/oees')
  .post(authController.isAuthenticated, oeeController.postOees)
  .get(authController.isAuthenticated, oeeController.getOees);
  // .put(authController.isAuthenticated, efficiencyController.putoees);

   // Create endpoint handlers for /oees/:oee_id
   router.route('/oees/:oee_id')
   .put(authController.isAuthenticated, oeeController.putOees);






//  // Create endpoint handlers for /activities
 router.route('/activitiess')
  .post(authController.isAuthenticated, activitiesController.postActivitiess)
  .get(authController.isAuthenticated, activitiesController.getActivitiess);







// // Create endpoint handlers for /downTimeLogs
// router.route('/downTimeLogs')
//   .post(authController.isAuthenticated, downTimeLogController.postDownTimeLogs)
//   .get(authController.isAuthenticated, downTimeLogController.getDownTimeLogs);



  // Create endpoint handlers for /toolChanges
router.route('/toolChanges')
.post(authController.isAuthenticated, toolChangeController.postToolChanges)
.get(authController.isAuthenticated, toolChangeController.getToolChanges);

  // Create endpoint handlers for /operatorChanges
  router.route('/operatorChanges')
  .post(authController.isAuthenticated, operatorChangeController.postOperatorChanges)
  .get(authController.isAuthenticated, operatorChangeController.getOperatorChanges);

    // Create endpoint handlers for /maintenances
    router.route('/maintenances')
    .post(authController.isAuthenticated, maintenanceController.postMaintenances)
    .get(authController.isAuthenticated, maintenanceController.getMaintenances);
 
                                                                       
    
   // Create endpoint handlers for /noManPowers
   router.route('/noManPowers')
   .post(authController.isAuthenticated, noManPowerController.postNoManPowers)
   .get(authController.isAuthenticated, noManPowerController.getNoManPowers);
 






 // Create endpoint handlers for /downTimeLogs
 router.route('/downTimeLogs')
 .post(authController.isAuthenticated, downTimeLogController.postDownTimeLogs)
 .get(authController.isAuthenticated, downTimeLogController.getDownTimeLogs);










   // Create endpoint handlers for /qualityHolds
   router.route('/qualityHolds')
   .post(authController.isAuthenticated, qualityHoldController.postQualityHolds)
   .get(authController.isAuthenticated, qualityHoldController.getQualityHolds);

 // Create endpoint handlers for /noRawMaterials
 router.route('/noRawMaterials')
 .post(authController.isAuthenticated, noRawMaterialController.postNoRawMaterials)
 .get(authController.isAuthenticated, noRawMaterialController.getNoRawMaterials);

 // Create endpoint handlers for /quadErrorLogs
 router.route('/quadErrorLogs')
 .post(authController.isAuthenticated, quadErrorLogController.postQuadErrorLogs)
 .get(authController.isAuthenticated, quadErrorLogController.getQuadErrorLogs);


// Create endpoint handlers for /quadHeartBeats
router.route('/quadHeartBeats')
.post(authController.isAuthenticated, quadHeartBeatController.postQuadHeartBeats)
.get(authController.isAuthenticated, quadHeartBeatController.getQuadHeartBeats);



// Create endpoint handlers for /noPlans
router.route('/noPlans')
.post(authController.isAuthenticated, noPlanController.postNoPlans)
.get(authController.isAuthenticated, noPlanController.getNoPlans);


// Create endpoint handlers for /machineBreakDowns
router.route('/machineBreakDowns')
  .post(authController.isAuthenticated, machineBreakDownController.postMachineBreakDowns)
  .get(authController.isAuthenticated, machineBreakDownController.getMachineBreakDowns);

// Create endpoint handlers for /toolBreakDowns
router.route('/toolBreakDowns')
  .post(authController.isAuthenticated, toolBreakDownController.postToolBreakDowns)
  .get(authController.isAuthenticated, toolBreakDownController.getToolBreakDowns);


// Create endpoint handlers for oauth2 authorize
router.route('/oauth2/authorize')
  .get(authController.isAuthenticated, oauth2Controller.authorization)
  .post(authController.isAuthenticated, oauth2Controller.decision);

// Create endpoint handlers for oauth2 token
router.route('/oauth2/token')
  .post(authController.isClientAuthenticated, oauth2Controller.token);




// Register all our routes with /api
app.use('/api', router);

// Start the server
app.listen(3000);