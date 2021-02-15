import { createSelector } from "reselect";

export const selectCart = state => state.cart;

export const selectCartItems = createSelector(
    [selectCart],
    cart => cart.cartItems
);

export const selectCartItemsCount = createSelector(
    [selectCartItems],
    cartItems => 
        cartItems.reduce(
            (quantity, cartItem) => quantity + cartItem.quantity
            , 0)
);

export const selectCartTotal = createSelector(
    [selectCartItems],
    cartItems => 
        cartItems.reduce(
            (price, cartItem) => price + cartItem.quantity * cartItem.productPrice
    , 0)
);

