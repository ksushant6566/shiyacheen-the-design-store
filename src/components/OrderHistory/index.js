import React from 'react';
import moment from 'moment';
import {
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableBody,
    TableCell
} from "@material-ui/core";
import { useHistory } from "react-router-dom";

const columns = [
    {
        id: 'orderCreatedDate',
        lable: 'Order Date'
    },
    {
        id: 'documentID',
        lable: 'Order ID'
    },
    {
        id: 'orderTotal',
        lable: 'Amount'
    }
]

const styles = {
    fontSize: '16px',
    cursor: 'pointer',
    width: '10%'
}

const formatText = (colName, colValue) => {
    switch (colName) {
        case 'orderTotal':
            return `₹${colValue}`;

        case 'orderCreatedDate':
            return moment(colValue.nano).format('DD/MM/YYYY');

        default:
            return colValue
    }
}

const Orderhistory = ({ orders }) => {

    const history = useHistory();

    return (
        <TableContainer>
            <Table>

                <TableHead>
                    <TableRow>
                        {columns.map((col, idx) => {
                            const { lable } = col;
                            return (
                                <TableCell
                                    key={idx}
                                    style={styles}
                                >
                                    {lable}
                                </TableCell>
                            )
                        })}
                    </TableRow>
                </TableHead>

                <TableBody>
                    {Array.isArray(orders) && orders.length > 0 && orders.map((order, idx) => {
                        const { documentID } = order;

                        return (
                            <TableRow 
                                key={idx}
                                onClick={() => history.push(`/orders/${documentID}`)}
                            >

                                {columns.map((col, idx) => {
                                    const colName = col.id;
                                    const colValue = order[colName];
                                    const formattedText = formatText(colName, colValue);

                                    return (
                                        <TableCell
                                            key={idx}
                                            style={styles}
                                        >
                                            {formattedText}
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
}

export default Orderhistory