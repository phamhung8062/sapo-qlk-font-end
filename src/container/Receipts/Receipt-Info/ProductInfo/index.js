/* eslint-disable no-shadow */
/* eslint-disable react/jsx-curly-newline */
/* eslint-disable object-shorthand */
/* eslint-disable no-plusplus */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable prefer-destructuring */
/* eslint-disable prefer-const */
/* eslint-disable consistent-return */
/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-unused-state */
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  withStyles,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as receiptActions from '../../../../action/receipt';
import styles from './styles';
class ProductInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      size: 5,
      totalPages: 0,
      activePage: 1,
      showSearchList: false,
      inputSearch: '',
      purchaseProducts: '',
      totalAmount: 90000,
      quantity: 0,
      purchaseProductss: [
        {
          varianId: '1',
          name: 'haha',
          price: '10',
          quantity: '4',
        },
      ],
    };
  }

  componentDidMount() {
    const { setPurchaseProducts } = this.props;
    this.setState({
      purchaseProducts: setPurchaseProducts,
    });
  }

  handlePriceProduct = (e, id) => {
    let { purchaseProducts } = this.state;
    let value = e.target.value;
    if (value > 999999999) {
      value = 999999999;
    }
    for (let i = 0; i < purchaseProducts.length; i++) {
      if (purchaseProducts[i].varianId === id) {
        purchaseProducts[i].price = Number(value);
      }
    }

    this.setState(
      {
        purchaseProducts: purchaseProducts,
      },
      () => this.handleTotalAmountQuantity(),
    );
  };

  pushPurchaseProducts = (product) => {
    let purchaseProduct = {
      varianId: product.id,
      name: product.name,
      price: product.price,
      quantity: product.quantity,
    };
    let purchaseProducts = this.state.purchaseProducts;
    let flag = false;
    for (let i = 0; i < purchaseProducts.length; i++) {
      if (purchaseProducts[i].varianId === purchaseProduct.varianId) {
        purchaseProducts[i].quantity += 1;
        flag = true;
        break;
      }
    }

    if (!flag) {
      purchaseProducts.push(purchaseProduct);
    }

    this.setState(
      {
        purchaseProducts: purchaseProducts,
      },
      () => this.handleTotalAmountQuantity(),
    );

    if (this.state.showSearchList === true) {
      this.handleClick();
    }
  };

  handleQuantityProduct = (e, id) => {
    let { purchaseProducts } = this.state;
    let value = e.target.value;
    if (value > 999999999) {
      value = 999999999;
    }
    for (let i = 0; i < purchaseProducts.length; i++) {
      if (purchaseProducts[i].varianId === id) {
        purchaseProducts[i].quantity = Number(value);
      }
    }

    this.setState(
      {
        purchaseProducts: purchaseProducts,
      },
      () => this.handleTotalAmountQuantity(),
    );
  };

  render() {
    const { classes, setPurchaseProducts } = this.props;
    const { productsReceiptDTOS, totalMoney } = setPurchaseProducts;

    const {
      totalAmount,
      quantity,
      purchaseProductss,
      purchaseProducts,
    } = this.state;
    console.log('varina', purchaseProducts);
    return (
      <div>
        <div className={classes.table}>
          <TableContainer component={Paper}>
            <Table className={classes.table1} aria-label="spanning table">
              <TableHead>
                <TableRow
                  style={{
                    background: '#f9fafc',
                    padding: '10px',
                    maxWidth: 654,
                  }}
                >
                  <TableCell
                    align="left"
                    style={{
                      width: '120px',
                      padding: '12px',
                      fontSize: '13px',
                    }}
                  >
                    Mã Sản Phẩm
                  </TableCell>
                  <TableCell
                    align="left"
                    style={{
                      width: '191px',
                      padding: '12px',
                      fontSize: '13px',
                    }}
                  >
                    Tên Sản Phẩm
                  </TableCell>
                  <TableCell
                    align="right"
                    style={{
                      width: '130px',
                      fontSize: '13px',
                    }}
                  >
                    Số Lượng
                  </TableCell>
                  <TableCell
                    align="right"
                    style={{
                      width: '130px',
                      fontSize: '13px',
                    }}
                  >
                    Giá
                  </TableCell>
                  <TableCell
                    align="right"
                    style={{
                      width: '130px',
                      fontSize: '13px',
                    }}
                  >
                    Thành Tiền
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {productsReceiptDTOS.map((row) => (
                  <TableRow key={row.varianId}>
                    <TableCell
                      style={{
                        width: '120px',
                        fontSize: '13px',
                      }}
                    >
                      {row.skuCode}
                    </TableCell>
                    <TableCell
                      align="left"
                      style={{
                        fontFamily:
                          '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif',
                        fontSize: '14px',
                        fontWeight: '400',
                      }}
                    >
                      <span
                        style={{
                          width: '120px',
                          fontSize: '13px',
                        }}
                      >
                        {row.name}
                      </span>
                    </TableCell>
                    <TableCell
                      align="right"
                      style={{
                        width: '110px',
                        padding: '10px',
                      }}
                    >
                      {row.quantity}
                    </TableCell>
                    <TableCell
                      align="right"
                      style={{
                        width: '110px',
                        padding: '10px',
                      }}
                    >
                      {row.price
                        .toFixed(1)
                        .replace(/\d(?=(\d{3})+\.)/g, '$&,')
                        .replace('.0', '')}
                    </TableCell>

                    <TableCell align="right" colSpan={5} style={{ padding: 1 }}>
                      {(row.price * row.quantity)
                        .toFixed(1)
                        .replace(/\d(?=(\d{3})+\.)/g, '$&,')
                        .replace('.0', '')}
                      &nbsp;&nbsp;
                    </TableCell>
                  </TableRow>
                ))}

                <TableRow>
                  <TableCell rowSpan={2} />
                  <TableCell colSpan={3} align="right" style={{ fontSize: 13 }}>
                    Tổng Số Lượng
                  </TableCell>
                  <TableCell align="right">{quantity}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={3} align="right" style={{ fontSize: 13 }}>
                    Tổng Tiền
                  </TableCell>
                  <TableCell align="right">
                    {totalMoney
                      .toFixed(1)
                      .replace(/\d(?=(\d{3})+\.)/g, '$&,')
                      .replace('.0', '')}
                    &nbsp; <sup>đ</sup>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    );
  }
}

ProductInfo.propTypes = {
  classes: PropTypes.object,
  receiptActionCreators: PropTypes.shape({
    fetchListVariant: PropTypes.func,
  }),
};
const mapStateToProps = (state) => {
  return {
    listVariant: state.receipt.listVariant,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    receiptActionCreators: bindActionCreators(receiptActions, dispatch),
  };
};
export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(ProductInfo),
);
