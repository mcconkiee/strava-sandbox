import { Response, Request } from 'express';
import * as admin from 'firebase-admin';
import constants from '../util/lib/constants';


const tokenFromHeader = require('../util/lib/tokenFromHeader');
module.exports = (req: Request, res: Response) => {
    const db =  req.app.get('db') as FirebaseFirestore.Firestore;
    const user = req.body.user;
    const uuid: string = tokenFromHeader(req)
    const refresh_token: string = req.body.refresh_token;
    const access_token: string = req.body.access_token;
    //create a user doc ref
    db
    .collection('users').doc(`${user.id}`)    
    // set the user data and tokens
    .set({data:user,access_token:access_token,refresh_token:refresh_token})    
    .then(data => {
        //get a fresh copy of user data from db
        return db.collection('users').doc(`${user.id}`).get()            
    })
    .then((userDoc: admin.firestore.DocumentSnapshot) => {
        //add the uuid to the look up index array
        const docData = userDoc.data();
        if(docData){
            const uuids = docData[constants.USER.UUIDS] || []
            uuids.push(uuid);
            const data : any = {}
            data[constants.USER.UUIDS] = uuids
            return Promise.all([userDoc,userDoc.ref.set(data,{merge:true})])
        }
        throw new Error('User not found');
    }) 
    .then(([userDoc,result]:[admin.firestore.DocumentSnapshot,admin.firestore.WriteResult])=>{
        return res.send({data:result,user:user});
    })
    .catch((err:Error)=>{
        res.status(500).send({error:err});
    })
}
