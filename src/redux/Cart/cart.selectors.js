import { createSelector } from "reselect";

export const selectCart = state => state.cart;

export const selectCartItems = createSelector(
    [selectCart],
    cart => cart.cartItems
);

export const selectcartItemsCount = createSelector(
    [selectCartItems],
    cartItems => 
        cartItems.reduce(
            (quantity, cartItem) => quantity + cartItem.quantity
            , 0)
);

