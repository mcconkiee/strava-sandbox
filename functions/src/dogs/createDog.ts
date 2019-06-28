import { Request, Response } from 'express';
import * as admin from 'firebase-admin';

const getUserWithRequest = require('../util/lib/getUserWithRequest');


module.exports = (req: Request, res: Response) => { 
    // get current user
    getUserWithRequest(req)
        // get connected accounts (dogs)
        .then((user:admin.firestore.QueryDocumentSnapshot) => {            
            if (user) {
                // we have to wrap in `data` to backward support existing data before strava cracked down on pet accounts
                return user.ref.collection('accounts').add({data:{...req.body,firstname: req.body.name || 'Unnamed'}});
            }
            return Promise.resolve(null);
        })       
        .then((result:admin.firestore.WriteResult)=>{
            return res.status(200).send();
        }) 
        .catch((err: Error) => {
            console.log('ERROR',err);
            
            res.status(500).send({ error: err });
        })
}
