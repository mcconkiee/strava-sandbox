import * as admin from 'firebase-admin';
import api from '../util/api';

module.exports = (user:admin.firestore.QueryDocumentSnapshot) => {   
    return user.ref.collection('accounts').get()
    .then((dogs:admin.firestore.QuerySnapshot)=>{
        const promises = dogs.docs.map( dog =>{
            return api.tokenRefresh(dog.data().refresh_token)
        })        
        return Promise.all(promises);
    })
}
