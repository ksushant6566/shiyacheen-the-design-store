import userTypes from './user.types';
import { auth, handleUserProfile, GoogleProvider } from './../../firebase/utils';


export const setCurrentUser = user => ({
    type: userTypes.SET_CURENT_USER,
    payload: user
})

export const resetAllAuthForms = () => ({
    type: userTypes.RESET_AUTH_FORMS
})

export const signInUser = ({ email, password }) => async dispatch => {
    try {
        await auth.signInWithEmailAndPassword(email, password);
        dispatch({
            type: userTypes.SIGN_IN_SUCCESS,
            payload: true,
        })
    } catch (err) {
        console.log(err);
    }
}

export const signUpUser = ({ displayName, email, password, confirmPassword }) => async dispatch => {

    if (displayName.length < 3) {
        const errs = ['name should be atleast 3 characters long!'];
        dispatch({
            type: userTypes.SIGN_UP_ERROR,
            payload: errs
        })
        return;
    }
    if (password.length < 8) {
        const errs = ['password must be atleast 8 characters long!'];
        dispatch({
            type: userTypes.SIGN_UP_ERROR,
            payload: errs
        })
        return;
    }
    if (password !== confirmPassword) {
        const errs = ['passwords don\'t match!'];
        dispatch({
            type: userTypes.SIGN_UP_ERROR,
            payload: errs
        })
        return;
    }


    try {
        const { user } = await auth.createUserWithEmailAndPassword(email, password);

        await handleUserProfile(user, { displayName });
        dispatch({
            type: userTypes.SIGN_UP_SUCCESS,
            payload: true
        })

    } catch (err) {
        console.log(err);
    }
}

export const resetPassword = ({ email }) => async dispatch => {
    const config = {
        url: 'http://localhost:3000/login',
    }

    try {
        await auth.sendPasswordResetEmail(email, config)
            .then(() => {
                dispatch({
                    type: userTypes.RESET_PASSWORD_SUCCESS,
                    payload: true
                })
            })
            .catch(() => {
                dispatch({
                    type: userTypes.RESET_PASSWORD_ERROR,
                    payload: ['Email not found!']
                })
            })

    } catch (error) {
        console.log(error);
    }
}

export const signInWithGoogle = () => async dispatch => {
    try {
        await auth.signInWithPopup(GoogleProvider)
        .then(() => {
            dispatch({
                type: userTypes.SIGN_IN_SUCCESS,
                payload: true,
            })
        })
    } catch (error) {
        console.log(error)
    } 
}