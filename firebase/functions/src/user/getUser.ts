import { QuerySnapshot } from "@google-cloud/firestore";

const getUserWithToken = (token: String, db: FirebaseFirestore.Firestore) => {
    return db.collection('users').where("access_token", '==', token).get()
        .then((users: QuerySnapshot) => {
            if (users.docs.length > 0) {
                return users.docs[0];
            }
            return null;
        })
}
module.exports = getUserWithToken;
