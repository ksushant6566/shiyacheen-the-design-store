import { combineReducers } from 'redux';

import userReducer from './User/user.reducer';
import productReducer from './Products/products.reducer';

export default combineReducers({
    user: userReducer,
    products: productReducer,
});