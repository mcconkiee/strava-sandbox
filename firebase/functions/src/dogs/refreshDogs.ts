import { QueryDocumentSnapshot, QuerySnapshot } from '@google-cloud/firestore';
import api from '../util/api';

module.exports = (user:QueryDocumentSnapshot) => {   
    return user.ref.collection('accounts').get()
    .then((dogs:QuerySnapshot)=>{
        const promises = dogs.docs.map( dog =>{
            return api.tokenRefresh(dog.data().refresh_token)
        })        
        return Promise.all(promises);
    })
}
