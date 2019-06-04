import { QuerySnapshot, QueryDocumentSnapshot } from "@google-cloud/firestore";

const getDogs = require('./getDogs');

const getDogWithToken = (userToken: string, dogToken: String, db: FirebaseFirestore.Firestore) => {
    getDogs(userToken, db)
        .then((dogs: QuerySnapshot) => {
            return dogs.docs.filter(q => {
                return q.ref.id === dogToken
            })
        })
        .then((found: QueryDocumentSnapshot[]) => {
            if (found.length > 0) {
                return found[0]
            }
            return null
        })
        .then((dog: QueryDocumentSnapshot) => {
            if (dog) {
                return Promise.all([dog, dog.ref.collection('matches').get()])
            }
            return [null, null];
        })
        .then(([dog, matches]: [QueryDocumentSnapshot, QuerySnapshot]) => {
            if (matches.docs.length > 0) {
                const docs = matches.docs.map(d => ({ data: d.data() }));
                return { dog: dog.data(), matches: docs }
            }
            return null
        })
}
module.exports = getDogWithToken;
