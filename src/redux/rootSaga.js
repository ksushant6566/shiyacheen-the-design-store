import {all, call} from 'redux-saga/effects';
import userSagas from './User/user.saga';
import productSagas from './Products/products.saga';
import ordersSagas from './Orders/orders.saga';

export default function* rootSaga() {
    yield all([
        call(userSagas),
        call(productSagas),
        call(ordersSagas),
    ])
}