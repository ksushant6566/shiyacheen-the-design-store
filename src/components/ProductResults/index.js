import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { fetchProductsStart, setProducts } from "../../redux/Products/products.actions";

// components
import Product from './Product';
import FormSelect from '../forms/FormSelect';
import LoadMore from '../LoadMore';

import './styles.scss';

// assets
import Loading from '../../assets/imgs/Loading.gif';

import mixpanel from 'mixpanel-browser';

const mapState = ({ products }) => ({
    products: products.products
})

const ProductResults = props => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { filterType } = useParams();

    const { products } = useSelector(mapState);
    const { data, queryDoc, isLastPage } = products;
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (products.data) setIsLoading(false);
        else setIsLoading(true);
    })

    useEffect(() => {
        setIsLoading(true);
        dispatch(
            fetchProductsStart({ filterType })
        )
        
        // MIXPANEL
        mixpanel.track('landed on products page', {
            category: filterType
        })

        return () => {
            dispatch(setProducts({}));
        }
    }, [filterType]);

    const handleFilter = (e) => {
        // MIXPANEL
        mixpanel.track('changed category', {
            filter: nextFilter
        })

        const nextFilter = e.target.value;
        history.push(`/search/${nextFilter}`)
    }

    if (Array.isArray(data) && data.length < 1) {
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
        options: [{
            name: 'Show all',
            value: ''
        }, {
            name: 'Royal Art',
            value: 'royal-art',
        }, {
            name: 'Alternate Reality',
            value: 'alternate-reality'
        }, {
            name: 'Originals',
            value: 'originals'
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
            {isLoading ? <img src={Loading} style={{ margin: '40vh auto', display: 'block' }} /> : (
                <>
                    <h2>
                        Browse Products
                        </h2>

                    <div className="productCategory">
                        <FormSelect {...congfigFilter} />
                    </div>

                    <div className="products">
                        {data.map((product, index) => {
                            const { productThumbnail, productName, productPrice } = product;

                            if (!productThumbnail || !productName ||
                                typeof productPrice === 'undefined') return null;

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
                </>
            )
            }
        </div>
    )
}

export default ProductResults;
