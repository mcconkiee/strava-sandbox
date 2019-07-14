import { Request, Response } from 'express';
import * as admin from 'firebase-admin';

const getUserWithToken = require('../util/lib/getUserWithToken');
const tokenFromHeader = require('../util/lib/tokenFromHeader');

module.exports = (req: Request, res: Response) => {
    const db = req.app.get('db') as FirebaseFirestore.Firestore;
    const userAccessToken = tokenFromHeader(req)
    const dogAccessToken = req.body.access_token;
    const dogRefreshToken = req.body.refresh_token;
    const dog = req.body;
    getUserWithToken(userAccessToken, db)
        .then((user: admin.firestore.QueryDocumentSnapshot) => {
            if (user) {
                // if strava ever allows pets , here's how we could attach a new account.
                // return user.ref.collection('accounts').doc(`${dog.id}`).set({ data: dog, access_token: dogAccessToken, refresh_token: dogRefreshToken })
                if (dogAccessToken) {
                    return user.ref.collection('accounts').doc(`${dog.user.id}`).set({ data: dog.user, access_token: dogAccessToken, refresh_token: dogRefreshToken }, { merge: true })
                } else
                    return user.ref.collection('accounts').doc().set({ data: dog })
            }
            return Promise.resolve(null);
        })
        .then((_dog: admin.firestore.WriteResult) => {            
            if (_dog) {
                return res.send({ dog: _dog })
            }
            return res.status(403).send({ error: "No user found" })
        })
        .catch((err: Error) => {
            console.log(err.message);

            res.status(500).send({ error: err });
        })
}
