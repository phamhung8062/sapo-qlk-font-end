/* eslint-disable react/void-dom-elements-no-children */
import {
    Avatar,
    Checkbox,
    IconButton,
    TableCell,
    TableRow,
    Typography,
    withStyles,
    TextField,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import styles from './styles';
import { Link, Redirect } from 'react-router-dom';
function ItemHistory({ classes, receiptProduct }) {

    return (
            <TableRow className={classes.tableRow} hover>
                <TableCell
                    style={{
                        fontFamily:
                            '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif',
                        fontSize: '14px',
                        verticalAlign: 'bottom',
                    }} >
                        {receiptProduct.completeDate}
                </TableCell>

                <TableCell>
                    {receiptProduct.createdBy}
                </TableCell>

                <TableCell style={{
                    fontFamily: '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif',
                    fontSize: '14px',
                }}>
                    {receiptProduct.quantity}
                </TableCell>
                <TableCell style={{
                    fontFamily:
                        '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif',
                    fontSize: '14px',
                    verticalAlign: 'bottom',
                }} >
                    {Number.parseFloat(receiptProduct.price).toFixed(1)
                    .replace(/\d(?=(\d{3})+\.)/g, '$&,')
                    .replace('.0', '')}
                </TableCell>
                
                <TableCell style={{
                    fontFamily:
                        '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif',
                    fontSize: '14px',
                }}>
                     <Link to={`/receipts/info/${receiptProduct.idReceipt}`}>
                    {receiptProduct.receiptCode}
                     </Link>
                </TableCell>
            </TableRow>
    );
}

export default withStyles(styles)(ItemHistory);
