import React, { useEffect, useRef, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import ImgSlider from '../ImgSlider';

// components
import Button from '../../forms/Button';

// actions
import { addProduct } from '../../../redux/Cart/cart.actions';

import mixpanel from 'mixpanel-browser';

const Product = (product) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const thumbRef = useRef(null);

    const {
        documentID,
        productThumbnail,
        productName,
        productPrice
    } = product;

    useEffect(() => {
        // MIXPANEL
        mixpanel.track('product view', {
            product: productName,
            productId: documentID,
            productPrice,
        })
    })

    const [showSlider, setShowSlider] = useState(false);

    if (!documentID || !productThumbnail || !productName ||
        typeof productPrice === 'undefined') return null;


    const addToCartButton = {
        type: 'button',
    }

    const handleAddToCart = product => {
        if (!product) return;

        dispatch(
            addProduct(product)
        )

        // MIXPANEL
        mixpanel.track('Add to cart', {
            product: productName,
            productId: documentID,
            productPrice,
        })
        history.push('/cart')
    };

    const width = thumbRef.current && thumbRef.current.offsetWidth ;
    const height = thumbRef.current && thumbRef.current.offsetHeight ;

    return (
        <div className="product">
            <div 
            className="thumb" 
            ref={thumbRef}
            onMouseEnter={() => setShowSlider(true)} 
            onMouseLeave={() => setShowSlider(false)}>
                <Link to={`/product/${documentID}`}>
                    {showSlider ? 
                        <ImgSlider
                            imgs={productThumbnail}
                            height={height}
                            width={width}
                            speed={1500}
                        /> : 
                        <img src={productThumbnail[0]} alt={productName} />
                    }
                </Link>
            </div>

            <div className="details">
                <ul>
                    <li>
                        <span className="name">
                            <Link to={`/product/${documentID}`}>
                                {productName}
                            </Link>
                        </span>
                    </li>
                    <li>
                        <span className="price">
                            ₹{productPrice}
                        </span>
                    </li>
                    <li>
                        <div className="addToCart">
                            <Button {...addToCartButton} onClick={() => handleAddToCart(product)}>
                                Add to cart
                            </Button>
                        </div>
                    </li>
                </ul>
            </div>            
        </div>
    );
};

export default Product;