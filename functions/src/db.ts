import * as admin from 'firebase-admin';
const serviceAccount = require('./serviceAccount')
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: `https://${serviceAccount.project_id}.firebaseio.com`
  });
const db = admin.firestore();

module.exports = db;
