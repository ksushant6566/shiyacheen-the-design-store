import userTypes from './user.types';

export const setCurrentUser = user => ({
    type: userTypes.SET_CURENT_USER,
    payload: user
})