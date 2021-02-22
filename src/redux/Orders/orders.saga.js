import ordersTypes from './orders.types';
import { takeLatest, put, all, call } from 'redux-saga/effects';
import { handleSaveOrder, handleGetUserOrderhistory, handleGetOrder } from "./orders.helpers";
import { auth } from '../../firebase/utils';

import { setUserOrderHistory, setOrderDetails } from './orders.actions';
import { clearCart } from '../Cart/cart.actions';

export function* saveOrder({ payload }) {
    try {
        const timestamp = new Date();
        yield handleSaveOrder({
            ...payload,
            orderUserID: auth.currentUser.uid,
            orderCreatedDate: timestamp
        });

        yield put(
            clearCart()
        )

    } catch (error) {
        console.log(error);
    }
};

export function* onSaveOrderHistoryStart() {
    yield takeLatest(ordersTypes.SAVE_ORDER_HISTORY_SATRT, saveOrder);
};


export function* getUserOrderHistory({ payload }) {
    try {
        const history = yield handleGetUserOrderhistory(payload);
        yield put(
            setUserOrderHistory(history)
        );
        
    } catch (error) {
        console.log(error);
    }
};

export function* onGetUserOrderHistoryStart() {
    yield takeLatest(ordersTypes.GET_USER_ORDER_HISTORY_START, getUserOrderHistory);
}

export function* getOrderDetails({ payload }) {
    try {
        const order = yield handleGetOrder(payload);
        yield put(
            setOrderDetails(order)
        )

    } catch (error) {
        console.log(error);
    }
};

export function* onGetOrderDetailsStart() {
    yield takeLatest(ordersTypes.GET_ORDER_DETAILS_START, getOrderDetails )
}

export default function* ordersSagas() {
    yield all ([
        call(onSaveOrderHistoryStart),
        call(onGetUserOrderHistoryStart),
        call(onGetOrderDetailsStart),
    ])
}