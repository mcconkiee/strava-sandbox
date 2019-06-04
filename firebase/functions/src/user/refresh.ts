import { Response, Request } from 'express';
import api from '../util/api';
import { QueryDocumentSnapshot, QuerySnapshot } from '@google-cloud/firestore';
const getUserWithReq = require('./getUserWithRequest');
const refreshDogs = require('../dogs/refreshDogs')
module.exports = (req: Request, res: Response) => {
    getUserWithReq(req)
        .then((user: QueryDocumentSnapshot) => {
            return Promise.all([user,
                api.tokenRefresh(user.data().refresh_token),
                refreshDogs(user)])
        })
        .then(([user, userResponse, dogsResponse]: [QueryDocumentSnapshot, any, any[]]) => {
            //update user
            user.ref.set(userResponse.data, { merge: true });
            return Promise.all([userResponse,
                dogsResponse,
                user.ref.collection('accounts').get()])
        })
        .then(([userResponse, dogsResponse, dogsDocs]: [any, any[], QuerySnapshot]) => {
            //update each dog
            let index = 0;
            dogsDocs.forEach((d: QueryDocumentSnapshot) => {
                d.ref.set(dogsResponse[index], { merge: true })
                index++;
            })
            res.send({ user: userResponse.data, accounts: dogsResponse.map(dog => dog.data) });
        })
        .catch((e: Error) => {
            res.status(500).send(e)
        })
}
