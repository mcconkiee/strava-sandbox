import { Request, Response } from 'express';

import api from '../util/api';


// TODO - handle error later...

const getActivity = (activity: any, token: string) => {
    return api.get(`/activities/${activity.id}/streams/latlng,altitude,time`, { access_token: token })
}
const getUserWithRequest = require('../util/lib/getUserWithRequest')
const concatDistanceForDog = (dog: FirebaseFirestore.DocumentSnapshot) => {
    return dog.ref.collection('matches').get()
        .then((matches: FirebaseFirestore.QuerySnapshot) => {
            if (matches.docs.length === 0) {
                return 0;
            }
            const totalDistance = matches.docs.map(match => match.data().distance).reduce((prev, cur) => prev + cur, 0) || 0
            console.log(totalDistance, 'total disatance');
            dog.ref.set({ totalDistance: totalDistance }, { merge: true })
            return totalDistance;
        })
}
module.exports = (req: Request, res: Response) => {
    const activity = req.body.activity;
    const accessToken: string = req.body.t;
    const dogObject: string = req.body.d;
    getUserWithRequest(req)
        .then((user: FirebaseFirestore.DocumentSnapshot) => {

            return Promise.all([
                user,
                getActivity(activity, accessToken),
                user.ref.collection('accounts').doc(`${dogObject}`).get()
            ])
        })
        .then(([user, activityData, dog]: [FirebaseFirestore.DocumentSnapshot, any, FirebaseFirestore.DocumentSnapshot]) => {
            return Promise.all([dog,dog.ref.collection('matches').doc(`${activity.id}`).set(activity)])
        })
        .then(([dog,writeResult]:[FirebaseFirestore.DocumentSnapshot,FirebaseFirestore.WriteResult])=>{
            return concatDistanceForDog(dog)
        })
        .then((distance:number)=>{
            return res.send({ distance: distance })
        })
        .catch((error: Error) => {
            console.log('error on clone', error.message);
            console.log(error.stack);
            return res.status(500).send({ message: "There was an error processing the file.", error: error });
        });


}
