import * as admin from 'firebase-admin';
import api from '../api';
const refresh = (account:admin.firestore.DocumentSnapshot) =>{
    //get the account
    const data = account.data();
    if(account.exists && data){
        // refresh the token
        return api.tokenRefresh(data.refresh_token)
        .then(results =>{
            //save the new data            
            return account.ref.set(results.data,{merge:true})
        })
    }
    throw new Error(`Account ${account.ref.path} does not exist`);
}
module.exports = (user:admin.firestore.QueryDocumentSnapshot) => {   
    return user.ref.collection('accounts').get()
    .then((accounts:admin.firestore.QuerySnapshot)=>{
        const promises = accounts.docs.map( dog =>{            
            return refresh(dog)
        })        
        return Promise.all(promises);
    })
}
