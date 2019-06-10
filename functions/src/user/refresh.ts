import { Response, Request } from 'express';
import api from '../util/api';
import * as admin from 'firebase-admin';
const getUserWithReq = require('./getUserWithRequest');
const refreshDogs = require('../dogs/refreshDogs')
module.exports = (req: Request, res: Response) => {
    
    
    getUserWithReq(req)
        .then((user: admin.firestore.QueryDocumentSnapshot) => {
            return Promise.all([user,
                api.tokenRefresh(user.data().refresh_token),
                refreshDogs(user)])
        })
        .then(([user, userResponse, dogsResponse]: [admin.firestore.QueryDocumentSnapshot, any, any[]]) => {
            //update user
            user.ref.set(userResponse.data, { merge: true });
            return Promise.all([user,userResponse,
                dogsResponse,
                user.ref.collection('accounts').get()])
        })
        .then(([user,userResponse, dogsResponse, dogsDocs]: [admin.firestore.QueryDocumentSnapshot,any, any[], admin.firestore.QuerySnapshot]) => {
            //update each dog
            let index = 0;            
            dogsDocs.forEach((d: admin.firestore.QueryDocumentSnapshot) => {
                d.ref.set(dogsResponse[index].data, { merge: true })
                index++;
            })
            const accountsData = dogsResponse.map(dog => dog.data)
            res.send({ user: user.data(), userResponse: userResponse.data, accounts: accountsData });
        })
        .catch((e: Error) => {
            res.status(500).send(e)
        })
}
