import { QuerySnapshot } from "@google-cloud/firestore";
import { Request } from "express";

const tokenFromHeader = require('./tokenFromHeader')
const getUserWithRequest = (req:Request) => {
    const db =  req.app.get('db') as FirebaseFirestore.Firestore;
    const token = tokenFromHeader(req);
    return db.collection('users').where("access_token", '==', token).get()
        .then((users: QuerySnapshot) => {
            if (users.docs.length > 0) {                
                return users.docs[0];
            }
            return null;
        })
}
module.exports = getUserWithRequest;
