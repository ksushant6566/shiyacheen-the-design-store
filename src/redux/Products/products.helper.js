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

export const handleFetchProducts =  ({ filterType, startAfterDoc, persistProducts=[] }) => {
    return new Promise((resolve, reject) => {
        const pageSize = 9;

        let ref = firestore.collection('products').orderBy('createdDate').limit(pageSize);

        if (filterType) ref = ref.where('productCategory', '==', filterType);
        if((startAfterDoc)) ref = ref.startAfter(startAfterDoc);

        ref
            .get()
            .then(snapshot => {
                const totalCount = snapshot.size;

                const data = [
                    ...persistProducts,
                    ...snapshot.docs.map(doc => {
                        return {
                            ...doc.data(),
                            documentID: doc.id
                        }
                    })
                ];

                resolve({
                    data,
                    queryDoc: snapshot.docs[totalCount-1],
                    isLastPage: totalCount < pageSize,
                });
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