import { Response, Request } from 'express';
import { QueryDocumentSnapshot, WriteResult } from '@google-cloud/firestore';

const getUserWithToken = require('./getUser');
const tokenFromHeader = require('./tokenFromHeader');

module.exports = (req: Request, res: Response) => {
    const db = req.app.get('db') as FirebaseFirestore.Firestore;        
    const userAccessToken = tokenFromHeader(req)
    
    const dog = req.body.user;
    console.log(req.body);
    
    const dogAccessToken = req.body.access_token;
    const dogRefreshToken = req.body.refresh_token;
    getUserWithToken(userAccessToken, db)
        .then((user:QueryDocumentSnapshot) => {
            console.log(dogAccessToken,dogRefreshToken,dog);
            
            if (user) {
                
                return user.ref.collection('accounts').doc(`${dog.id}`).set({ data: dog, access_token: dogAccessToken, refresh_token: dogRefreshToken })
            }
            return Promise.resolve(null);
        })
        .then((dog:WriteResult) =>{
            console.log(dog,'gog');
            
            if(dog){
                return res.send({dog:dog})
            }
            return res.status(403).send({error:"No user found"})
        })
        .catch((err: Error) => {
            console.log(err.message);
            
            res.status(500).send({ error: err });
        })
}
