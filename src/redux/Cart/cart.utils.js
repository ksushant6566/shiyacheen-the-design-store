export const existingCartItem = ({
    prevCartItems,
    nextCartItem
}) => {
    return prevCartItems.find(cartItem => cartItem.documentID === nextCartItem.documentID);
};

export const handleAddToCart = ({
    prevCartItems,
    nextCartItem
}) => {
    const quantityIncrement = 1;
    const cartItemExists = existingCartItem({ prevCartItems, nextCartItem });

    if (cartItemExists) {
        return prevCartItems.map(cartItem => 
            cartItem.documentID === nextCartItem.documentID ?
                {
                    ...cartItem,
                    quantity: cartItem.quantity + quantityIncrement
                }
                : cartItem
        )
    }

    return [
        ...prevCartItems,
        {
            ...nextCartItem,
            quantity: quantityIncrement
        }
    ]
};

export const handleRemoveCartItem = ({
    prevCartItems,
    cartItemToRemove
}) => {
    return prevCartItems.filter(item => item.documentID !== cartItemToRemove.documentID);
};

export const handleReduceCartItems = ({
    prevCartItems,
    cartItemToReduce
}) => {

    const cartItemExists = existingCartItem({prevCartItems, nextCartItem: cartItemToReduce});
    
    if(!cartItemExists) return prevCartItems;

    if(cartItemExists.quantity === 1) 
        return handleRemoveCartItem({ prevCartItems, cartItemToRemove: cartItemToReduce});
    else {
        return prevCartItems.map(item => 
            item.documentID === cartItemExists.documentID ? {
                ...item,
                quantity: item.quantity - 1
            } : item
        );
    };
};