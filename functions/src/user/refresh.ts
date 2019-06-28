import { Response, Request } from 'express';
import api from '../util/api';
import * as admin from 'firebase-admin';
const getUserWithReq = require('../util/lib/getUserWithRequest');
module.exports = (req: Request, res: Response) => {
    getUserWithReq(req)
        .then((user: admin.firestore.QueryDocumentSnapshot) => {
            return Promise.all([
                user,
                api.tokenRefresh(user.data().refresh_token)
            ])
        })
        .then(([user, userResponse]: [admin.firestore.QueryDocumentSnapshot, any]) => {
            user.ref.set(userResponse.data, { merge: true });
            return Promise.all([
                user,
                userResponse,
                user.ref.collection('accounts').get()
            ])
        })
        .then(([user, userResponse, dogsDocs]: [admin.firestore.QueryDocumentSnapshot, any,  admin.firestore.QuerySnapshot]) => {            
            const accountsData = dogsDocs.docs.map((dog:admin.firestore.QueryDocumentSnapshot) => dog.data())
            const filteredUserData = { data: user.data().data, access_token: user.data().access_token }
            res.send({ user: filteredUserData, userResponse: userResponse.data, accounts: accountsData });
            // res.send({ user: user.data(), userResponse: userResponse.data, accounts: accountsData });
        })
        .catch((e: Error) => {
            console.log(e, 'error refresh');

            res.status(500).send(e)
        })
}
