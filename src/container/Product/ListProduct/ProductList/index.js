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
import React, { useState, useEffect } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import styles from './styles';
import ProductItem from '../ProductItem';
import ProductAPI from '../../../../apis/product'
function ProductList({ classes, products}) {

  const initialFilterProduct = {
    name: null,
    producer: null,
    skuCode: null,
    status: null,
  }

  const showListItemProduct = () =>{
    let result = null;
    if(products.length > 0){
      result = products.map((product, index) => {
        return (<ProductItem key={product.id} product={product} productId={product.id} index={index} images={product.images} />)
      })
    }
    return result;
  }


    return (
      <Card className={classes.card}>
        <CardContent className={classes.content}>
          <PerfectScrollbar>
            <div className={classes.inner}>
              <Table className="table-striped ">
                <TableHead >
                  <TableRow>
                  <TableCell>Ảnh</TableCell>
                    <TableCell>Mã/SKU</TableCell>
                    <TableCell>Tên sản phẩm</TableCell>
                    <TableCell>Thương hiệu</TableCell>
                    <TableCell >Trạng thái</TableCell>
                    <TableCell >Đơn giá nhập</TableCell>
                    <TableCell style={{textAlign: 'center'}}>Số lượng</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  
                  {
                    products .length > 0 
                    ?
                     showListItemProduct()
                    :
                    <td colSpan="8" className="text-center ">
                      <div className="mt-2">Không có sản phẩm nào để  hiển thị</div>
                    </td>
                  }

                </TableBody>
              </Table>
            </div>
          </PerfectScrollbar>
        </CardContent>
      </Card>
    );
  }
  

export default withStyles(styles)(ProductList);
