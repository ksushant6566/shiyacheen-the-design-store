import React, { useEffect, useRef, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// components
import Button from '../forms/Button';
import ImgSlider from '../ProductResults/ImgSlider';

// actions
import { fetchProductStart, setProduct } from '../../redux/Products/products.actions';
import { addProduct } from "../../redux/Cart/cart.actions";

// styles
import './styles.scss';

const mapState = ({ products }) => ({
    product: products.product
})

const ProductCard = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { productID } = useParams();

    const { product } = useSelector(mapState);
    const [size, setSize] = useState('');

    const Ref = useRef(null);

    const {
        productName,
        productThumbnail,
        productPrice,
        productDesc,
        productCategory,
    } = product;

    useEffect(() => {
        dispatch(
            fetchProductStart(productID)
        )

        return () => {
            dispatch(
                setProduct({})
            )
        }
    }, [dispatch, productID]);


    const configAddToCartBtn = {
        type: 'button'
    }

    const handleAddToCart = () => {
        const configOrder = {
            size,
        }

        dispatch(
            addProduct(product, configOrder)
        );
        history.push('/cart');
    };

    if (!productThumbnail || !productName ||
        typeof productPrice === 'undefined') return null;

    var width = window.innerWidth;

    return (
        <div className='productCard' ref={Ref}>
            <div className="hero"  >
                <ImgSlider
                    imgs={productThumbnail}
                    height={ width < 600 ? width - 0.1 * width : 400 }
                    width={ width < 600 ? width - 0.1 * width : 400 }
                    speed={2000}
                    manual={true}
                />
            </div>

            <div className="subdetails">     
                <div className="productCategory">
                    <p>
                        # {productCategory}
                    </p>
                </div>   
                <div className="productName">
                    <h1>
                        {productName}
                    </h1>  
                </div>
                <div className="productPrice">
                    <span>
                        ₹{productPrice}
                    </span>
                </div>

                <div className="orderCustom">
                    <div className="sizeOptions">
                        <span onClick={() => setSize('A3')} className="sizeOption">A3</span>
                        <span onClick={() => setSize('A2')} className="sizeOption">A2</span>
                        <span onClick={() => setSize('A1')} className="sizeOption">A1</span>
                        <span onClick={() => setSize('A0')} className="sizeOption">A0</span>
                    </div>
                     
                    <div className="addToCart">
                        <Button {...configAddToCartBtn} onClick={() => handleAddToCart(product)} >
                            Add to Cart
                        </Button>
                    </div>
                </div>

            </div>

            <div className="productDetails">
                <span dangerouslySetInnerHTML={{ __html: productDesc }}/>
            </div>
        </div>
    )
}

export default ProductCard;