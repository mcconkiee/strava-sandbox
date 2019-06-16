import * as admin from 'firebase-admin';
import CONSTANTS from './constants'
const getUserWithToken = (token: String, db: FirebaseFirestore.Firestore) => {
    return db.collection('users').where(CONSTANTS.USER.UUIDS, 'array-contains', token).get()
        .then((users: admin.firestore.QuerySnapshot) => {
            if (users.docs.length > 0) {
                return users.docs[0];
            }
            return null;
        })
}
module.exports = getUserWithToken;
