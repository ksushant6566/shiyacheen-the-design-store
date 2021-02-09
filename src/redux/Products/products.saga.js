import { auth } from './../../firebase/utils';
import { takeLatest, put, all, call } from 'redux-saga/effects';
import productTypes from './products.types';
import { setProducts, fetchProductStart } from './products.actions'
import { handleAddproduct, handleFetchProducts, handleDeleteProducts } from './products.helper';



export function* addProduct({ payload : {
    productCategory,
    productName,
    productThumbnail,
    productPrice
}}) {
    try {
        const timestamp = new Date();

        yield handleAddproduct({
            productCategory,
            productName,
            productThumbnail,
            productPrice,
            productAdminUserUID: auth.currentUser.uid,
            createdDate: timestamp
        })

        yield put(
            fetchProductStart()
        )

    } catch (error) {
        console.log(error)
    }
}

export function* onAddProductStart() {
    yield takeLatest(productTypes.ADD_NEW_PRODUCT_START, addProduct)
}

export function* fetchProducts() {
    try {
        const products = yield handleFetchProducts();
        yield put(
            setProducts(products)
        );
    } catch (error) {
        console.log(error)
    }
}

export function* onFetchProductsStart() {
    yield takeLatest(productTypes.FETCH_PRODUCTS_START, fetchProducts)
}

export function* deleteProduct({ payload }) {
    try {
        yield handleDeleteProducts(payload);
        yield put(
            fetchProductStart()
        );
    } catch (error) {
        console.log(error);
    }
}

export function* onDeleteProductStart() {
    yield takeLatest(productTypes.DELETE_PRODUCT_START, deleteProduct)
}


export default function* productSagas() {
    yield all([
        call(onAddProductStart),
        call(onFetchProductsStart),
        call(onDeleteProductStart),
    ])
}