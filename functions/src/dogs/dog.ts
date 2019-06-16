import { Response, Request } from 'express';
import * as admin from 'firebase-admin';
const tokenFromHeader = require('../util/lib/tokenFromHeader');
const getDog = require('./getDog')
module.exports = (req: Request, res: Response) => {
    const db =  req.app.get('db') as FirebaseFirestore.Firestore;
    const access_token: string = tokenFromHeader(req)
    getDog(access_token,req.params.token,db)    
    .then((dog:admin.firestore.QueryDocumentSnapshot) => {
        res.send({ data: dog.data()  });
    }).catch((err:Error)=>{
        res.status(500).send({error:err});
    })
}
