import { firestore} from './../../firebase/utils';

export const handleAddproduct = product => {
    return new Promise((resolve, reject) => {
        firestore
            .collection('products')
            .doc()
            .set(product)
            .then(() => {
                console.log("ho gaya")
                resolve();
            })
            .catch(err => {
                reject(err);
            })
    });
}

export const handleFetchProducts = () => {
    return new Promise((resolve, reject) => {
        firestore
            .collection('products')
            .get()
            .then(snapshot => {
                const productsArray = snapshot.docs.map(doc => {
                    return {
                        ...doc.data(),
                        documentID: doc.id
                    }
                })
                resolve(productsArray);
            })
            .catch(err => {
                reject(err);
            })
    })
}

export const handleDeleteProducts = (documentID) => {
    return new Promise((resolve, reject) => {
        firestore
            .collection('products')
            .doc(documentID)
            .delete()
            .then(() => {
                resolve();
            })
            .catch(err => {
                reject(err);
            })
    })
        
}