import { Response, Request } from 'express';
const tokenFromHeader = require('./tokenFromHeader');
module.exports = (req: Request, res: Response) => {
    const db =  req.app.get('db') as FirebaseFirestore.Firestore;
    const user = req.body.user;
    const access_token: string = tokenFromHeader(req)
    const refresh_token: string = req.body.refresh_token;
    const doc = db.collection('users').doc(`${user.id}`)
    doc.set({data:user,access_token:access_token,refresh_token:refresh_token})    
    .then(data => {
        res.send({ data: data, user: user });
    }).catch(err=>{
        res.status(500).send({error:err});
    })
}
