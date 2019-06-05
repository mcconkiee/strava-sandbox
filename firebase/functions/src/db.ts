import * as admin from 'firebase-admin';

const functions = require('firebase-functions');
admin.initializeApp(functions.config().firebase);
const db = admin.firestore();

module.exports = db;
