import React from 'react';
import { useDispatch } from "react-redux";
import {
    TableContainer,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell
} from "@material-ui/core";

// actions
import { removeCartItem, addProduct, reduceCartItem } from '../../../redux/Cart/cart.actions';


const styles = {
    fontSize: '16px',
    width: '10%',
}

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
        <TableRow className="cartItem">
            <TableCell style={styles}>
                <img src={productThumbnail[0]} alt={productName} />
            </TableCell>
            <TableCell style={styles}>
                {productName}
            </TableCell>
            <TableCell style={styles}>
                <span className="cartBtn" onClick={() => handleReduceCartItem(documentID)}>
                    {` < `}
                </span>
                <span>
                    {quantity}
                </span>
                <span className="cartBtn" onClick={() => handleAddProduct(documentID)}>
                    {` > `}
                </span>
            </TableCell>
            <TableCell style={styles}>
                ₹{productPrice}
            </TableCell>
            <TableCell style={styles}>
                <span className="cartBtn" onClick={() => handleRemoveCartItem(documentID)}>
                    X
                </span>
            </TableCell>
        </TableRow>

    );
};

export default Item;