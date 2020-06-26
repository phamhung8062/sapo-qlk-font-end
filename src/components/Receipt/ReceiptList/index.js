/* eslint-disable react/no-unused-prop-types */
import {
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  withStyles,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import ReceiptItem from '../ReceiptItem';
import styles from './styles';
class ReceiptsList extends Component {
  showReceiptItem = (receipts) => {
    const { onClickDelete } = this.props;
    let result = null;
    if (receipts.length > 0) {
      result = receipts.map((receipt, index) => {
        return (
          <ReceiptItem
            key={receipt.id}
            receipt={receipt}
            index={index}
            onClickDelete={() => onClickDelete(receipt)}
          />
        );
      });
    }
    return result;
  };

  render() {
    const { classes, receipts } = this.props;
    return (
      <Card className={classes.card}>
        <CardContent className={classes.content}>
          <PerfectScrollbar>
            <div className={classes.inner}>
              <Table className="table-striped ">
                <TableHead>
                  <TableRow>
                    <TableCell>Mã Đơn </TableCell>
                    <TableCell>Nhà Cung Cấp</TableCell>
                    <TableCell>Trạng Thái</TableCell>
                    <TableCell>Nhập Kho</TableCell>
                    <TableCell>Thanh Toán</TableCell>
                    <TableCell>Tổng Tiền</TableCell>
                    {/* <TableCell>Ngày Tạo</TableCell> */}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {receipts.length > 0 ? (
                    this.showReceiptItem(receipts)
                  ) : (
                    <tr style={{ background: '#ffff' }}>
                      <td colSpan="6">
                        <div style={{ textAlign: 'center', paddingTop: 8 }}>
                          Không tìm thấy sản phẩm!
                        </div>
                      </td>
                    </tr>
                  )}
                </TableBody>
              </Table>
            </div>
          </PerfectScrollbar>
        </CardContent>
      </Card>
    );
  }
}
ReceiptsList.propTypes = {
  classes: PropTypes.object,
  receipts: PropTypes.array,
  onClickEdit: PropTypes.func,
  onClickDelete: PropTypes.func,
};
export default withStyles(styles)(ReceiptsList);
