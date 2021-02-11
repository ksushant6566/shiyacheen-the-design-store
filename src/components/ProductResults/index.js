import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchProductStart } from "../../redux/Products/products.actions";
import Product from './Product';
import './styles.scss';

const mapState = ({ products }) => ({
    products: products.products
})

const ProductResults = props => {
    const dispatch = useDispatch();
    const { products } = useSelector(mapState);


    useEffect(() => {
        dispatch(
            fetchProductStart()
        )
    }, []);

    if(!Array.isArray(products)) return null;

    if(products.length < 1) {
        return (
            <div className="productResults">
                <p>
                    No search results.
                </p>
            </div>
        )
    }

    return (
        <div className="productResults">

            <h1>
                Browse Products
            </h1>

            <div className="products">
                {products.map( (product, index) => {
                    const { productThumbnail, productName, productPrice } = product;

                    const configProduct = {
                        productThumbnail, 
                        productName, 
                        productPrice
                    }

                    return (    
                        <Product key={index} {...configProduct} />
                    )
                })}
            </div>
        </div>
    )
}

export default ProductResults;
