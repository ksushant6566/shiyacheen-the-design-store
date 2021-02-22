import React, { useEffect } from 'react';
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';

import { getOrderDetailsStart } from '../../redux/Orders/orders.actions';
import OrderDeatils from "../../components/OrderDetails";

const mapState = ({ orders }) => ({
    orderDetails: orders.orderDetails
});

const Order = () => {
    const dispatch = useDispatch();
    const { orderID } = useParams();
    const { orderDetails } = useSelector(mapState);
    const { orderTotal } = orderDetails;

    useEffect(() => {
        dispatch(getOrderDetailsStart(orderID))
    }, []);

    return (
        <div>
            <h1>
                Order ID: {orderID}
            </h1>

            <OrderDeatils order={orderDetails} />

            <h4>
                Total : ₹{orderTotal}
            </h4>
        </div>
    )
};

export default Order;