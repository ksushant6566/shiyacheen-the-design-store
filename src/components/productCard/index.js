import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// components
import Button from '../forms/Button';

// actions
import { fetchProductStart, setProduct} from '../../redux/Products/products.actions';
import { addProduct } from "../../redux/Cart/cart.actions";

// styles
import './styles.scss';

const mapState = ({ products }) => ({
    product: products.product
})

const ProductCard = ({}) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { productID } = useParams();
    
    const { product } = useSelector(mapState);

    const {
        productName,
        productThumbnail,
        productPrice,
        productDesc,
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
    }, []);


    const configAddToCartBtn = {
        type: 'button'
    }

    const handleAddToCart = () => {
        dispatch(
            addProduct(product)
        );
        history.push('/cart');
    };

    return (
        <div className='productCard'>
            <div className="hero">
                <img src={productThumbnail} alt={productName} />
            </div>
            <div className="productDetails">
                <ul>
                    <li>
                        <h1>
                            {productName}
                        </h1>
                    </li>
                    <li>
                        <span>
                            ₹{productPrice}
                        </span>
                    </li>
                    <li>
                        <div className="addToCart">
                            <Button {...configAddToCartBtn} onClick = {() => handleAddToCart(product)} >
                                Add to Cart
                            </Button>
                        </div>
                    </li>
                    <li>
                        <span dangerouslySetInnerHTML={{ __html: productDesc }}
                        />
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default ProductCard;