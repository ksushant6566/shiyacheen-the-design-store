import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserOrderHistory } from '../../redux/Orders/orders.actions';

import Orderhistory from '../../components/OrderHistory';

// styles
import './styles.scss';


const mapState = ({ user, orders }) => ({
    currentUser: user.currentUser,
    orderHistory: orders.orderHistory
})

const Dashboard = props => {
    const dispatch = useDispatch();
    const { currentUser, orderHistory } = useSelector(mapState);

    useEffect(() => {
        dispatch(
            getUserOrderHistory(currentUser.id)
        )
    }, [])


    return (
        <div>
            <h1>
                Order History
            </h1>

            <Orderhistory orders={orderHistory} />
        </div>
    )
}

export default Dashboard;