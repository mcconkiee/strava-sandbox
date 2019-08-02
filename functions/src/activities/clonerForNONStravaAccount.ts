import { Request } from 'express';
const concatDistanceForDog = require('functions/lib/util/lib/concatDistanceForDog')
const getUserWithRequest = require('../util/lib/getUserWithRequest')
export const clone = (activity: any,req:Request)=>{    
    const dogObject: string = req.body.d;
    
    return getUserWithRequest(req)
    .then((user: FirebaseFirestore.DocumentSnapshot) => {

        return Promise.all([
            user,
            user.ref.collection('accounts').doc(`${dogObject}`).get()
        ])
    })
    .then(([user, activityData, dog]: [FirebaseFirestore.DocumentSnapshot, any, FirebaseFirestore.DocumentSnapshot]) => {
        return Promise.all([dog,dog.ref.collection('matches').doc(`${activity.id}`).set(activity)])
    })
    .then(([dog,writeResult]:[FirebaseFirestore.DocumentSnapshot,FirebaseFirestore.WriteResult])=>{
        return concatDistanceForDog(dog)
    })
}