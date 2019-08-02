const concatDistanceForDog = (dog: FirebaseFirestore.DocumentSnapshot) => {
    return dog.ref.collection('matches').get()
        .then((matches: FirebaseFirestore.QuerySnapshot) => {
            if (matches.docs.length === 0) {
                return 0;
            }
            const totalDistance = matches.docs.map(match => match.data().distance).reduce((prev, cur) => prev + cur, 0) || 0
            console.log(totalDistance, 'total disatance');
            dog.ref.set({ totalDistance: totalDistance }, { merge: true })
            return totalDistance;
        })
}
module.exports = concatDistanceForDog;