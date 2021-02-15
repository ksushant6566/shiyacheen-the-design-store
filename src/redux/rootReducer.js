import { combineReducers } from 'redux';

import userReducer from './User/user.reducer';
import productReducer from './Products/products.reducer';
import cartReducer from './Cart/cart.reducer';

export default combineReducers({
    user: userReducer,
    products: productReducer,
    cart: cartReducer,
});