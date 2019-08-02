import { Request, Response } from 'express';
import api from '../util/api';
import Cloner from './clonerForStravaAccount';
import { AxiosResponse } from 'axios';

const getUserWithRequest = require('../util/lib/getUserWithRequest')
const concatDistanceForDog = require('../util/lib/concatDistanceForDog')


export const getActivity = (activity: any, token: string) => {
    return api.get(`/activities/${activity.id}/streams/latlng,altitude,time`, { access_token: token })
}


module.exports = (req: Request, res: Response) => {
    const activityData = req.body.activity;
    const accessToken: string = req.body.t;
    const dogObject: string = req.body.d;
    return getUserWithRequest(req)
        .then((user: FirebaseFirestore.DocumentSnapshot) => {
            return Promise.all([
                user,
                user.ref.collection('accounts').doc(`${dogObject}`).get()
            ])
        })
        .then(([user, dog]: [FirebaseFirestore.DocumentSnapshot, FirebaseFirestore.DocumentSnapshot]) => {
            return Promise.all([
                user,
                dog,
                getActivity(activityData, accessToken)
            ])
        })
        .then(([user, dog, activityDataFromStrava]: [FirebaseFirestore.DocumentSnapshot, FirebaseFirestore.DocumentSnapshot, AxiosResponse]) => {
            if (dog.exists) {
                const dogData = dog.data();
                if (dogData && dogData.access_token) {
                    //clone for strava                    
                    return Promise.all([
                        dog,
                        Cloner.clone(activityDataFromStrava.data,req)
                    ])
                } 
                //clone for made up dog on our system
                console.log(dogData, 'clone for system');
                return Promise.all([
                    dog,
                    dog.ref.collection('matches').doc(`${activityData.id}`).set(activityData)
                ])
            }
            throw new Error('Dog account does not exist')
        })
        .then(([dog, writeResult]: [FirebaseFirestore.DocumentSnapshot, FirebaseFirestore.WriteResult]) => {
            return concatDistanceForDog(dog)
        })      
        .then(() => {
            return res.send({})
        })
        .catch((error: Error) => {
            console.log('error on clone', error.message);
            console.log(error.stack);
            return res.status(500).send({ message: "There was an error processing the file.", error: error });
        });


}
