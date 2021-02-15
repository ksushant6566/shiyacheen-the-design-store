import React from 'react';
import { useDispatch } from "react-redux";

// actions
import { removeCartItem, addProduct, reduceCartItem } from '../../../redux/Cart/cart.actions';

const Item = product => {
    const dispatch = useDispatch();

    const {
        productName,
        productPrice,
        productThumbnail,
        quantity,
        documentID
    } = product;

    const handleRemoveCartItem = (documentID) => {
        dispatch(
            removeCartItem({
                documentID
            })
        );
    };

    const handleAddProduct = (documentID) => {
        dispatch(
            addProduct({
                documentID
            })
        )
    }

    const handleReduceCartItem = (documentID) => {
        dispatch(
            reduceCartItem({
                documentID
            })
        )
    }

    return (
        <table className="cartItem" border="0" cellSpacing="0" cellPadding="10" >
            <tbody>
                <tr>
                    <td>
                        <img src={productThumbnail} alt={productName} />
                    </td>
                    <td>
                        {productName}
                    </td>
                    <td>
                        <span className="cartBtn" onClick={() => handleReduceCartItem(documentID)}>
                            {` < `}
                        </span>
                        <span>
                            {quantity}
                        </span>
                        <span className="cartBtn" onClick={() => handleAddProduct(documentID)}>
                            {` > `}
                        </span>
                    </td>
                    <td>
                        ₹{productPrice}
                    </td>
                    <td align="center">
                        <span className="cartBtn" onClick={() => handleRemoveCartItem(documentID)}>
                            X
                        </span>
                    </td>
                </tr>
            </tbody>
        </table>
    );
};

export default Item;