const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');

const app = express();

// Automatically allow cross-origin requests
app.use(cors({ origin: true }));

// Add middleware to authenticate requests
// app.use(myMiddleware);

// build multiple CRUD interfaces:
// curl -X POST -H "Content-Type:application/json" -H "X-MyHeader: 123" http://localhost:5000/stravafordogs/us-central1/api/activity/123/clone -d '{"id":"something","t":"xxx"}'
app.post('/activity/:id/clone', require('./clone'));


// Expose Express API as a single Cloud Function:
exports.api = functions.https.onRequest(app);
