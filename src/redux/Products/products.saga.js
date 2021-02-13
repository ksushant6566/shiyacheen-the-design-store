import { auth } from './../../firebase/utils';
import { takeLatest, put, all, call } from 'redux-saga/effects';
import productTypes from './products.types';
import { setProducts, setProduct , fetchProductsStart, } from './products.actions'
import { handleAddproduct, handleFetchProducts, handleDeleteProducts, handleFetchProduct } from './products.helper';



export function* addProduct({ payload }) {
    try {
        const timestamp = new Date();

        yield handleAddproduct({
            ...payload,
            productAdminUserUID: auth.currentUser.uid,
            createdDate: timestamp
        })

        yield put(
            fetchProductsStart()
        )

    } catch (error) {
        console.log(error)
    }
}

export function* onAddProductStart() {
    yield takeLatest(productTypes.ADD_NEW_PRODUCT_START, addProduct)
}

export function* fetchProducts({ payload }) {
    try {
        const products = yield handleFetchProducts( payload );
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
            fetchProductsStart()
        );
    } catch (error) {
        console.log(error);
    }
}

export function* onDeleteProductStart() {
    yield takeLatest(productTypes.DELETE_PRODUCT_START, deleteProduct)
}

export function* fetchProduct({ payload }) {
    try {
        const product = yield handleFetchProduct(payload);
        yield put(
            setProduct(product)
        )

    } catch (error) {
        console.log(error)
    }
}

export function* onFetchProductStart() {
    yield takeLatest(productTypes.FETCH_PRODUCT_START, fetchProduct)
}

export default function* productSagas() {
    yield all([
        call(onAddProductStart),
        call(onFetchProductsStart),
        call(onDeleteProductStart),
        call(onFetchProductStart),
    ])
}