import { combineReducers } from 'redux';
import { persistReducer } from "redux-persist";
import storage from 'redux-persist/lib/storage';

import userReducer from './User/user.reducer';
import productReducer from './Products/products.reducer';
import cartReducer from './Cart/cart.reducer';

export const rootReducer = combineReducers({
    user: userReducer,
    products: productReducer,
    cart: cartReducer,
});

const configStorage = {
    key: 'root',
    storage,
    whitelist: ['cart']
};

export default persistReducer(configStorage, rootReducer);