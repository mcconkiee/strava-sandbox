import * as admin from 'firebase-admin';
const getUserWithToken = require('../util/lib/getUserWithToken');
module.exports = (userAccessToken: string,db : FirebaseFirestore.Firestore) => {   
    return getUserWithToken(userAccessToken, db)
    .then((user:admin.firestore.QueryDocumentSnapshot) => {
        return user.ref.collection('accounts').get()
    })    
}
