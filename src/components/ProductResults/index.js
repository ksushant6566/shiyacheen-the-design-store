import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { fetchProductStart } from "../../redux/Products/products.actions";
import Product from './Product';
import FormSelect from '../forms/FormSelect';

import './styles.scss';

const mapState = ({ products }) => ({
    products: products.products
})

const ProductResults = props => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { filterType } = useParams();

    const { products } = useSelector(mapState);

    useEffect(() => {
        dispatch(
            fetchProductStart({ filterType })
        )
    }, [filterType]);

    const handleFilter = (e) => {
        const nextFilter = e.target.value;
        history.push(`/search/${nextFilter}`)
    }

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

    const congfigFilter = {
        defaultValue: filterType,
        options : [{
            name: 'Show all',
            value: ''
        }, {
            name: 'Mens',
            value: 'mens',
        }, {
            name: 'Womens',
            value: 'womens'
        }],

        handleChange: handleFilter,

    }

    return (
        <div className="productResults">

            <h1>
                Browse Products
            </h1>

            <div className="productCategory">
                <FormSelect {...congfigFilter} />
            </div>

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
