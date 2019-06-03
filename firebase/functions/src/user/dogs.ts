import { Response, Request } from 'express';
import { QuerySnapshot, QueryDocumentSnapshot } from '@google-cloud/firestore';

const getUserWithToken = require('./getUser');
const tokenFromHeader = require('./tokenFromHeader');

module.exports = (req: Request, res: Response) => {
    const db = req.app.get('db') as FirebaseFirestore.Firestore;
    const userAccessToken = tokenFromHeader(req)
    getUserWithToken(userAccessToken, db)        
        .then((user:QueryDocumentSnapshot) => {            
            if (user) {
                return user.ref.collection('accounts').get()
            }
            return Promise.resolve(null);
        })
        .then((dogs:QuerySnapshot) =>{
            if(dogs){
                const accounts = dogs.docs.map(doc=>{return doc.data().data});
                return res.send({accounts:accounts})
            }
            return res.status(403).send({error:"No user found"})
        })
        .catch((err: Error) => {
            console.log(err.message);
            
            res.status(500).send({ error: err });
        })
}
