/* eslint-disable prefer-template */
/* eslint-disable react/void-dom-elements-no-children */
import { TableCell, TableRow, withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './styles';
class ReceiptItem extends Component {
  renderStatus = () => {
    const { receipt, classes } = this.props;
    let html = '';
    html = (
      <TableCell
        className={classes.cell}
        style={{
          color: '#ff7f00',
        }}
      >
        Đang Giao Dịch
      </TableCell>
    );
    if (receipt.status === 1 && receipt.payment !== null) {
      html = <TableCell className={classes.cell}>Đã Hoàn Thành</TableCell>;
    }

    return html;
  };

  render() {
    const { classes, receipt } = this.props;
    return (
      <TableRow className={classes.tableRow} hover>
        <TableCell className={classes.cell}>
          <Link to={`/receipts/info/${receipt.id}`} className={classes.link}>
            {receipt.code}
          </Link>
        </TableCell>
        <TableCell className={classes.cell}>{receipt.supplier.name}</TableCell>
        {this.renderStatus()}
        <TableCell className={classes.cell}>
          {receipt.status === 1 ? 'Đã Nhập Hàng ' : 'Chờ Nhập Hàng'}
        </TableCell>
        <TableCell className={classes.cell}>
          {receipt.payment !== null ? 'Đã Thanh Toán ' : 'Chưa Thanh Toán'}
        </TableCell>
        <TableCell className={classes.cell}>
          {/* replace(/\d(?=(\d{3})+\.)/g, '$&.1') */}
          {/* .toFixed(3) .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') */}
          {receipt.totalMoney
            .toFixed(0)
            .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}
          {/* .replace('.', ',') */}
          &nbsp;<sup>đ</sup>
        </TableCell>
        {/* <TableCell className={classes.cell}>{receipt.createdDate}</TableCell> */}
      </TableRow>
    );
  }
}
ReceiptItem.propTypes = {
  classes: PropTypes.object,
  receipt: PropTypes.object,
};
export default withStyles(styles)(ReceiptItem);
