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
import PerfectScrollbar from 'react-perfect-scrollbar';
import React, { useState, useEffect } from 'react';
import { NavLink, Link, Redirect } from 'react-router-dom';
import styles from './styles';
import ItemHistory from './ItemHistory';

function HistoryRepository({classes, receiptProducts}) {

    const showListItemHistory = () =>{
        let result = null;
        if(receiptProducts.length > 0){
          result = receiptProducts.map((receiptProduct, index) => {
            return (<ItemHistory key={receiptProduct.id} receiptProduct={receiptProduct} index={index} />)
          })
        }
        return result;
      }



    return (
          <PerfectScrollbar>
            <div className={classes.inner}>
              <Table className="table-striped " style={{marginTop: '-35px'}}>
                <TableHead >
                  <TableRow>
                    <TableCell>Ngày ghi nhận</TableCell>
                    <TableCell>Nhân viên</TableCell>
                    <TableCell>Số lượng thay đổi</TableCell>
                    <TableCell>Đơn giá nhập</TableCell>
                    <TableCell >Mã hóa đơn</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {  
                  receiptProducts.length > 0
                    ? 
                    showListItemHistory()
                    :
                    <td colSpan="5">
                        <div className="text-center my-3">
                            Sản phẩm chưa có giao dịch nào
                        </div>
                    </td>
                 }
                </TableBody>
              </Table>
            </div>
          </PerfectScrollbar>
    )
}

export default withStyles(styles)(HistoryRepository);
