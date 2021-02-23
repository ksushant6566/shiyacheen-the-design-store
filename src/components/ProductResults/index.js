import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { fetchProductsStart } from "../../redux/Products/products.actions";

// components
import Product from './Product';
import FormSelect from '../forms/FormSelect';
import LoadMore from '../LoadMore';

import './styles.scss';

const mapState = ({ products }) => ({
    products: products.products
})

const ProductResults = props => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { filterType } = useParams();

    const { products } = useSelector(mapState);
    const { data, queryDoc, isLastPage } = products;

    useEffect(() => {
        dispatch(
            fetchProductsStart({ filterType })
        )
    }, [filterType]);

    const handleFilter = (e) => {
        const nextFilter = e.target.value;
        history.push(`/search/${nextFilter}`)
    }

    if(!Array.isArray(data)) return null;

    if(data.length < 1) {
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

    const handleLoadMore = () => {
        dispatch(
            fetchProductsStart({ 
                filterType, 
                startAfterDoc: queryDoc,
                persistProducts: data
            })
        )
    }

    const configLoadMore = {
        onLoadMoreEvt: handleLoadMore,
    }

    return (
        <div className="productResults">

            <h2>
                Browse Products
            </h2>

            <div className="productCategory">
                <FormSelect {...congfigFilter} />
            </div>

            <div className="products">
                {data.map( (product, index) => {
                    const { productThumbnail, productName, productPrice } = product;

                    if(!productThumbnail || !productName || 
                        typeof productPrice === 'undefined' ) return null;

                    const configProduct = {
                        ...product
                    }

                    return (    
                        <Product key={index} {...configProduct} />
                    )
                })}
            </div>
            {!isLastPage &&
                <LoadMore {...configLoadMore} />

            }
        </div>
    )
}

export default ProductResults;
