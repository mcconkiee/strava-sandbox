import * as admin from 'firebase-admin';
import { Request } from "express";
import CONSTANTS from './constants';
const tokenFromHeader = require('./tokenFromHeader')
const getUserWithRequest = (req: Request) => {
    const db = req.app.get('db') as FirebaseFirestore.Firestore;
    const token = tokenFromHeader(req);
    return db.collection('users')
        .where(CONSTANTS.USER.UUIDS, 'array-contains', token)
        .get()
        .then((users: admin.firestore.QuerySnapshot) => {            
            if (users.docs.length > 0) {
                return users.docs[0];
            }
            return null;
        })
}
module.exports = getUserWithRequest;
