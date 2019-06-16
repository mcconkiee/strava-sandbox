import { Response, Request } from 'express';
import * as admin from 'firebase-admin';

const getUserWithToken = require('../util/lib/getUserWithToken');
const tokenFromHeader = require('../util/lib/tokenFromHeader');

module.exports = (req: Request, res: Response) => {
    const db = req.app.get('db') as FirebaseFirestore.Firestore;
    const userAccessToken = tokenFromHeader(req)
    getUserWithToken(userAccessToken, db)        
        .then((user:admin.firestore.QueryDocumentSnapshot) => {            
            if (user) {
                return user.ref.collection('accounts').get()
            }
            return Promise.resolve(null);
        })
        .then((dogs:admin.firestore.QuerySnapshot) =>{
            
            if(dogs && dogs.docs.length > 0){
                return Promise.all([dogs,Promise.all(dogs.docs.map(d => d.ref.collection('matches').get()))]);
            }
            return Promise.all([dogs,[]]);
        })
        .then(([dogs,accounts]:[admin.firestore.QuerySnapshot,admin.firestore.QuerySnapshot[]]) =>{            
            if(dogs){  
                const response: any = []              
                const dogDatas = dogs.docs.map(doc=>{return doc.data().data});
                dogDatas.forEach( (data,i) =>{
                    const _matches = accounts[i].docs.map( matches => matches.ref.id);                    
                    data['matches'] = _matches;
                    response[i] = data
                })
                return res.send({accounts:response})                
            }
            return res.status(403).send({error:"No user found"})
        })
        .catch((err: Error) => {
            console.log(err);
            
            res.status(500).send({ error: err });
        })
}
