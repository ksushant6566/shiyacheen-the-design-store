import React, { useEffect } from 'react';
import {
    TableContainer,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell
} from "@material-ui/core";
import { useDispatch } from "react-redux";
import { setOrderDetails } from "../../redux/Orders/orders.actions";

const columns = [
    {
        id: 'productThumbnail',
        lable: ''
    },
    {
        id: 'productName',
        lable: 'Name'
    },
    {
        id: 'productPrice',
        lable: 'Price'
    },
    {
        id: 'quantity',
        lable: 'Quantity'
    }
]
const styles = {
    fontSize: '16px',
    width: '10%',
}

const formatText = (colName, colValue) => {
    switch (colName) {
        case 'productPrice':
            return `₹${colValue}`;
        case 'productThumbnail':
            return <img src={colValue} width={250} alt='product img'/>
        default:
            return colValue;
    }
}

const OrderDeatils = ({ order }) => {

    const dispatch = useDispatch();
    const orderItems = order && order.orderItems;

    useEffect(() => {
        return () => {
            dispatch(setOrderDetails({}))
        }
    }, []);

    return (
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        {columns.map((col, idx) => {
                            return (
                                <TableCell
                                    key={idx}
                                    style={styles}
                                >
                                    {col.lable}
                                </TableCell>
                            )
                        })}
                    </TableRow>
                </TableHead>

                <TableBody>
                    {Array.isArray(orderItems) && orderItems.length > 0 && orderItems.map((order, idx) => {
                        return (
                            <TableRow key={idx}>
                                {columns.map((col, idx) => {
                                    const colName = col.id;
                                    const colValue = order[colName];

                                    return (
                                        <TableCell
                                            key={idx}
                                            style={styles}
                                        >
                                            {formatText(colName, colValue)}
                                        </TableCell>
                                    )
                                })}
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    )
};

export default OrderDeatils;