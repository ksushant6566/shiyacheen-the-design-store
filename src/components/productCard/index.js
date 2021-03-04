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
import Loading from '../../assets/imgs/Loading.gif';

const mapState = ({ products }) => ({
    product: products.product
})

const ProductCard = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { productID } = useParams();

    const { product } = useSelector(mapState);
    const [artSize, setArtSize] = useState('');
    const [artSizeCM, setArtSizeCM] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [imgSliderWidth, setImgSliderWidth] = useState(400);

    const Ref = useRef(null);

    const {
        productName,
        productThumbnail,
        productPrice,
        productDesc,
        productCategory,
    } = product;

    useEffect(() => {
        if (!product.productName) setIsLoading(true);
        else setIsLoading(false);

    }, [product])

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

    useEffect(() => {
        const width = window.innerWidth;
        if (width < 800) {
            const sliderWidth = Ref.current && Ref.current.offsetWidth;
            setImgSliderWidth(sliderWidth);
        } else {
            setImgSliderWidth(400);
        }
    })

    useEffect(() => {
        document.getElementsByClassName("sizeOption").forEach(element => {
            if (element.classList.contains(artSize)) {
                element.classList.add("selected");
            } else {
                element.classList.remove("selected");
            }
        });
        switch (artSize) {
            case 'A0':
                setArtSizeCM('118.9cm x 84.1cm')
                break;
            case 'A1':
                setArtSizeCM('84.1cm x 59.4cm')
                break;
            case 'A2':
                setArtSizeCM('59.4cm x 42.0cm')
                break;
            case 'A3':
                setArtSizeCM('42.0cm x 29.7cm')
                break;
            default:
                break;
        }
    }, [artSize])

    const handleAddToCart = () => {
        const configOrder = {
            artSize,
        }
        dispatch(
            addProduct(product, configOrder)
        );
        history.push('/cart');
    };

    const configAddToCartBtn = {
        type: 'button'
    }

    return (
        <div className='productCard' >
            {isLoading ?
                <img src={Loading} style={{ margin: '40vh auto' }} /> :
                (<>
                    <div className="hero" ref={Ref} >
                        <ImgSlider
                            imgs={productThumbnail}
                            height={imgSliderWidth}
                            width={imgSliderWidth}
                            speed={1500}
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
                                <span onClick={() => setArtSize('A3')} className="sizeOption A3">A3</span>
                                <span onClick={() => setArtSize('A2')} className="sizeOption A2">A2</span>
                                <span onClick={() => setArtSize('A1')} className="sizeOption A1">A1</span>
                                <span onClick={() => setArtSize('A0')} className="sizeOption A0">A0</span>
                            </div>

                            <div className="artSizeCM">
                                <p>{artSizeCM}</p>

                            </div>

                            <div className="addToCart">
                                <Button {...configAddToCartBtn} onClick={() => handleAddToCart(product)} >
                                    Add to Cart
                        </Button>
                            </div>
                        </div>

                    </div>

                    <div className="productDetails">
                        <span dangerouslySetInnerHTML={{ __html: productDesc }} />
                    </div>
                </>
                )
            }
        </div>
    )
}

export default ProductCard;