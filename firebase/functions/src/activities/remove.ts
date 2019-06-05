import { Response, Request } from 'express';
import * as admin from 'firebase-admin';
// import { DocumentSnapshot } from 'firebase-functions/lib/providers/firestore';




const getUserWithRequest = require('../user/getUserWithRequest')
module.exports = (req: Request, res: Response) => {
    const activityId = req.params.id;
    const dogId: string = req.body.d;
    getUserWithRequest(req)
    .then((user:admin.firestore.QueryDocumentSnapshot)=>{
        return user.ref.collection('accounts').doc(`${dogId}`).get()
    })
    .then((dog:admin.firestore.DocumentSnapshot)=>{
        return dog.ref.collection('matches').doc(`${activityId}`).get()
    })
    .then((match:admin.firestore.DocumentSnapshot)=>{
        match.ref.delete()
        return res.send({status:1,message:`${match.ref.path} removed`})          
    })
    .catch((error: Error) => {
        console.log('error on clone', error.message);
        console.log(error.stack);
        return res.status(500).send({ message: "There was an error processing the file.", error: error });
    });


}
