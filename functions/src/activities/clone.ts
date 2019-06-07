import { Response, Request } from 'express';
import  { AxiosResponse } from 'axios';
import * as admin from 'firebase-admin';
import { DocumentSnapshot } from 'firebase-functions/lib/providers/firestore';
import Cloner, {FileMade} from './serialize-strava-activity';
import api from '../util/api'


// TODO - handle error later...

const getActivity = (activity: any, token: string) => {
    return api.get(`/activities/${activity.id}/streams/latlng,altitude,time`,{access_token:token})
}
const getUserWithRequest = require('../user/getUserWithRequest')
module.exports = (req: Request, res: Response) => {
    const activity = req.body.activity;
    const accessToken: string = req.body.t;
    const dogObject: string = req.body.d;
    
    getActivity(activity, accessToken).then((data: AxiosResponse) => {
        return Cloner.serialize(data.data, activity);
    })
    .then((points: object[]) => {
        return Cloner.build(points, activity);
    })
    .then((fileMade: FileMade) => {
        return Promise.all([fileMade,getUserWithRequest(req)]);
    })
    .then(([fileMade,user]: [FileMade,admin.firestore.QueryDocumentSnapshot]) => {
        return Promise.all([fileMade,user.ref.collection('accounts').doc(`${dogObject}`).get()]);
    })
    .then(([fileMade,dog]: [FileMade,DocumentSnapshot]) => {
        const dogData = dog.data();
        if(dogData){
            return Promise.all([fileMade,dog,Cloner.upload(fileMade,activity,dogData.access_token)]);
        }
        return Promise.all([fileMade,dog,{}]);
    })
    .then(([fileMade,dog,fromStravaResponse]:[FileMade,DocumentSnapshot,any]) => {
        
        //attach our cloned activity response to our matching activity
        activity.clone = fromStravaResponse.data;
        dog.ref.collection('matches').doc(`${activity.id}`).set(activity)
        return Promise.all([Cloner.clean(fileMade), fromStravaResponse]);
    })
    .then(([clean, fromStravaResponse]:[boolean,any]) => {                
        return res.send(fromStravaResponse.data);
    })
    .catch((error: Error) => {
        console.log('error on clone', error.message);
        console.log(error.stack);
        return res.status(500).send({ message: "There was an error processing the file.", error: error });
    });


}
