import React from 'react';
import { useSelector } from "react-redux";
import { selectCartItems, selectCartTotal } from '../../redux/Cart/cart.selectors';
import { createStructuredSelector } from "reselect";
import { useHistory } from "react-router-dom";
import {
    TableContainer,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell
} from "@material-ui/core";
import './styles.scss';

// compoenents
import Button from '../forms/Button';
import Item from './Item';

const mapState = createStructuredSelector({
    cartItems: selectCartItems,
    total: selectCartTotal,
})

const styles = {
    fontSize: '16px',
    width: '10%',
}

const Checkout = props => {
    const history = useHistory();
    const { cartItems, total } = useSelector(mapState);

    return (
        <div className="checkout">
            <h1>
                Checkout
            </h1>

            <div className="cart">
                {cartItems.length > 0 ? (
                    <TableContainer>
                        <Table >
                            <TableHead className="checkoutHeader">
                                <TableRow>
                                    <TableCell style={styles}>
                                        Product
                                                </TableCell>
                                    <TableCell style={styles}>
                                        Description
                                                </TableCell>
                                    <TableCell style={styles}>
                                        Quantity
                                                </TableCell>
                                    <TableCell style={styles}>
                                        Price
                                                </TableCell>
                                    <TableCell style={styles}>
                                        Remove
                                    </TableCell >
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {cartItems.map((item, index) => {
                                    return (
                                        <Item {...item} key={index} />
                                    )
                                })}

                                <TableRow>
                                    <TableCell colSpan='5' style={styles}>
                                        <h3>
                                            Total: ₹{total}
                                        </h3>
                                    </TableCell>
                                </TableRow>
                                <TableRow >
                                    <TableCell style={styles} >
                                        <Button onClick={() => history.goBack()}>
                                                Shop More
                                        </Button>
                                    </TableCell>
                                    <TableCell style={styles}>
                                        <Button onClick={() => history.push('/payment')}>
                                                Checkout
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                ) : (
                        <p>
                            You have no items in your cart.
                        </p>
                    )}
            </div>
        </div >
    );
};

export default Checkout;
