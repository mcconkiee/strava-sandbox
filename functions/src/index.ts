import * as express from 'express';
const functions = require('firebase-functions');
const cors = require('cors');
const app = express();
const db = require('./db')
const config = require('./config').default;
app.set('dev',config.dev || false);

// Automatically allow cross-origin requests
app.use(cors({ origin: true }));
app.set('db', db);

// app.use(function(req, res, next) {
//    res.header("Access-Control-Allow-Origin", "*"); // keep this if your api accepts cross-origin requests
//    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, X-Access-Token");
//    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
//    if ('OPTIONS' === req.method) {
//         //respond with 200
//         console.log("options!!");
//         res.send(200);
//     } else
//         next();
//    next();
// });

app.use(function(req, res, next) {
   console.log('API incomping request:', req.url);   
   next();
});


// build multiple CRUD interfaces:
// curl -X POST -H "Content-Type:application/json" -H "X-MyHeader: 123" http://localhost:5000/stravafordogs/us-central1/api/activity/123/clone -d '{"id":"something","t":"xxx"}'
app.post('/activity/:id/clone', require('./activities/clone'));
app.post('/activity/:id/remove', require('./activities/remove'));
app.post('/user', require('./user/create'));
app.post('/user/connectAccount', require('./user/connectAccount'));
app.get('/user/dogs', require('./user/dogs'));
app.post('/user/dogs', require('./dogs/createDog'));
app.post('/user/dogs/:token/activities/match', require('./activities/match'));
app.get('/user/refresh', require('./user/refresh'));
app.get('/users/:userId/accounts/:dogId',require('./dogs/getDog'))
// Expose Express API as a single Cloud Function:
exports.api = functions.https.onRequest(app);
