import { Response, Request } from 'express';
import api from '../util/api';
import * as admin from 'firebase-admin';
const getUserWithReq = require('../util/lib/getUserWithRequest');
const refreshAccount = require('../util/lib/refreshAccount')
module.exports = (req: Request, res: Response) => {    
    getUserWithReq(req)
        .then((user: admin.firestore.QueryDocumentSnapshot) => {
            return Promise.all([user,
                api.tokenRefresh(user.data().refresh_token),
                refreshAccount(user)])
        })
        .then(([user, userResponse, dogsResponse]: [admin.firestore.QueryDocumentSnapshot, any, any[]]) => {
            //update user tokens with response
            user.ref.set(userResponse.data, { merge: true });
            return Promise.all([user,userResponse,
                dogsResponse,
                user.ref.collection('accounts').get()])
        })
        .then(([user,userResponse, dogsResponse, dogsDocs]: [admin.firestore.QueryDocumentSnapshot,any, any[], admin.firestore.QuerySnapshot]) => {            
            const accountsData = dogsResponse.map(dog => dog.data)
            const filteredUserData = {data:user.data().data,access_token:user.data().access_token}
            res.send({ user: filteredUserData, userResponse: userResponse.data, accounts: accountsData });
            // res.send({ user: user.data(), userResponse: userResponse.data, accounts: accountsData });
        })
        .catch((e: Error) => {
            res.status(500).send(e)
        })
}
