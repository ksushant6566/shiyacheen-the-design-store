import productTypes  from "./products.types";

export const addProductStart = productData => ({
    type: productTypes.ADD_NEW_PRODUCT_START,
    payload: productData
});

export const fetchProductStart = (filters={}) => ({
    type: productTypes.FETCH_PRODUCTS_START,
    payload: filters
})

export const setProducts = products => ({
    type: productTypes.SET_PRODUCTS,
    payload: products,
})

export const deleteProductStart = productID => ({
    type: productTypes.DELETE_PRODUCT_START,
    payload: productID
})