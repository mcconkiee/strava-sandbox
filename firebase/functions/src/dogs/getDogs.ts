import { QueryDocumentSnapshot } from '@google-cloud/firestore';
const getUserWithToken = require('../user/getUser');
module.exports = (userAccessToken: string,db : FirebaseFirestore.Firestore) => {   
    return getUserWithToken(userAccessToken, db)
    .then((user:QueryDocumentSnapshot) => {
        return user.ref.collection('accounts').get()
    })    
}
