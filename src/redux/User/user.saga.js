import { takeLatest, call, all, put } from 'redux-saga/effects';
import userTypes from './user.types';
import { resetPasswordSuccess, signInSuccess, signOutUserSuccess, userError } from './user.actions';
import { auth, handleUserProfile, getCurrentUser, GoogleProvider } from './../../firebase/utils';
import { handleResetPasswordApi } from './user.helpers';


export function* getSnapshotFromUserAuth(user, additionalData={}) {
    try {
        const userRef = yield call(handleUserProfile, { userAuth: user , additionalData});
        const snapshot = yield userRef.get();

        yield put(
            signInSuccess({
                id: snapshot.id,
                ...snapshot.data(),
            })
        );
    }
    catch (error) {
        console.log(error);
    }
}

export function* emailSignIn({ payload: { email, password } }) {
    try {
        const { user } = yield auth.signInWithEmailAndPassword(email, password);
        yield getSnapshotFromUserAuth(user);
        
    } catch (err) {
        console.log(err);
    }
}

export function* onEmailSignInStart() {
    yield takeLatest(userTypes.EMAIL_SIGN_IN_START, emailSignIn);
}

export function* isUserAuthenticated() {
    try {
        const userAuth = yield getCurrentUser();
        if(!userAuth) return;
        yield getSnapshotFromUserAuth(userAuth);

    } catch (error) {
        
    }
}

export function* onCheckUserSession() {
    yield takeLatest(userTypes.CHECK_USER_SESSION, isUserAuthenticated)
}

export function* signOutUser() {
    try {
        yield auth.signOut();
        yield put(
            signOutUserSuccess()
        )
    } catch (error) {
        console.log(error)
    }
}

export function* onSignOutUserStart() {
    yield takeLatest(userTypes.SIGN_OUT_USER_START, signOutUser);
}

export function* signUpUser({ payload : { 
    displayName, 
    email, 
    password, 
    confirmPassword 
}}) {
    if (displayName.length < 3) {
        const err = ['name should be atleast 3 characters long!'];
        yield put( userError(err) )
        return;
    }
    if (password.length < 8) {
        const err = ['password must be atleast 8 characters long!'];
        yield put( userError(err) )
        return;
    }
    if (password !== confirmPassword) {
        const err = ['passwords don\'t match!'];
        yield put( userError(err) )
        return;
    }

    try {
        const { user } = yield auth.createUserWithEmailAndPassword(email, password);
        const additionalData = { displayName };
        yield getSnapshotFromUserAuth(user, additionalData);

    } catch (err) {
        console.log(err);
    }
}

export function* onSignUpUserStart() {
    yield takeLatest(userTypes.SIGN_UP_USER_START, signUpUser)
}

export function* resetPassword({ payload: { email }}) {
    try {
        yield call(handleResetPasswordApi, email)
        yield put(
            resetPasswordSuccess()
        )

    } catch (error) {
        yield put(
            userError(error)
        )
    }
}

export function* onResetPasswordStart() {
    yield takeLatest(userTypes.RESET_PASSWORD_START, resetPassword)
}

export function* googleSignIn() {
    try {
        const { user } = yield auth.signInWithPopup(GoogleProvider);
        yield getSnapshotFromUserAuth(user);

    } catch (error) {
        console.log(error)
    } 
}

export function* onGoolgeSignInStart() {
    yield takeLatest(userTypes.GOOGLE_SIGN_IN_START, googleSignIn)
}



export default function* userSagas() {
    yield all([
        call(onEmailSignInStart),
        call(onCheckUserSession),
        call(onSignOutUserStart),
        call(onSignUpUserStart),
        call(onResetPasswordStart),
        call(onGoolgeSignInStart),
    ])
}
