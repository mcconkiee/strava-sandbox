import { Response, Request } from 'express';
import api from '../util/api';
import { QueryDocumentSnapshot } from '@google-cloud/firestore';
const getUserWithReq = require('./getUserWithRequest');
module.exports = (req: Request, res: Response) => {
    getUserWithReq(req)
    .then((user:QueryDocumentSnapshot)=>{
        return api.tokenRefresh(user.data().refresh_token)
    })
    .then((response:any)=>{
        res.send(response.data);
    })
    .catch((e:Error)=>{
        res.status(500).send(e)
    })
}
