import * as admin from 'firebase-admin';
const getUserWithToken = require('../user/getUser');
module.exports = (userAccessToken: string,db : FirebaseFirestore.Firestore) => {   
    return getUserWithToken(userAccessToken, db)
    .then((user:admin.firestore.QueryDocumentSnapshot) => {
        return user.ref.collection('accounts').get()
    })    
}
