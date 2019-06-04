import { Response, Request } from 'express';
import { QueryDocumentSnapshot, QuerySnapshot } from '@google-cloud/firestore';
import { DocumentSnapshot } from 'firebase-functions/lib/providers/firestore';




const getUserWithRequest = require('../user/getUserWithRequest')
module.exports = (req: Request, res: Response) => {
    const activityId = req.params.id;
    const dogId: string = req.body.d;
    
    
    getUserWithRequest(req)
    .then((user:QueryDocumentSnapshot)=>{
        return user.ref.collection('accounts').doc(`${dogId}`).get()
    })
    .then((dog:DocumentSnapshot)=>{
        return dog.ref.collection('matches').get()
    })
    .then((matches:QuerySnapshot)=>{
        return matches.docs.filter( match => match.data()=== activityId)
    })
    .then((filtered:QueryDocumentSnapshot[])=>{
        res.send(filtered.map(f=>f.data()))        
    })
    .catch((error: Error) => {
        console.log('error on clone', error.message);
        console.log(error.stack);
        return res.status(500).send({ message: "There was an error processing the file.", error: error });
    });


}
