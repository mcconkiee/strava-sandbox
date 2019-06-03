import { Response, Request } from 'express';
import { QueryDocumentSnapshot, QuerySnapshot } from '@google-cloud/firestore';
const getUserWithToken = require('../user/getUser');
const tokenFromHeader = require('../user/tokenFromHeader');
module.exports = (req: Request, res: Response) => {   
    const activity = req.body.activity;    
    const db = req.app.get('db') as FirebaseFirestore.Firestore;
    const userAccessToken = tokenFromHeader(req)
    const dogAccessToken = req.params.token;
    getUserWithToken(userAccessToken, db)
    .then((user:QueryDocumentSnapshot) => {
        return user.ref.collection('accounts').where('access_token','==',dogAccessToken).get()
    })
    .then((dogsQ:QuerySnapshot) => {
        if(dogsQ.docs.length >0){
            dogsQ.docs[0].ref.collection('matches').doc(`${activity.id}`).set(activity)
        }
        res.send({status:'ok'})
    })
    .catch((err:Error)=>{
        res.status(500).send({error:err});
    })
}
