import { Request, Response } from 'express';

module.exports = (req: Request, res: Response) => {
    const db = req.app.get('db') as FirebaseFirestore.Firestore;
    return db.doc(req.path)
        .get()
        .then((dog: FirebaseFirestore.DocumentSnapshot) => {
            // get the first N matches
            return Promise.all([dog, dog.ref.collection('matches').limit(5).get()])
        })
        .then(([dog, matches]: [FirebaseFirestore.DocumentSnapshot, FirebaseFirestore.QuerySnapshot]) => {
            const dogData: any = dog.data();
            // dogData.matches = matches.docs.map(m => m.data());
            return res.send({ data: dogData, activities: matches.docs.map(m => m.data()) });
        })
        .catch((err: Error) => {
            res.status(500).send({ error: err });
        })
}
