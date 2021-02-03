import {all, call} from 'redux-saga/effects';
import userSagas from './User/user.saga';

export default function* rootSaga() {
    yield all([
        call(userSagas)
    ])
}