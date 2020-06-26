/* eslint-disable react/no-deprecated */
/* eslint-disable react/jsx-boolean-value */
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
import * as CurrencyFormat from 'react-currency-format';
import HighlightOffOutlinedIcon from '@material-ui/icons/HighlightOffOutlined';
import SearchIcon from '@material-ui/icons/Search';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import SearchProduct from '../SearchProduct';
import styles from './styles';
import * as receiptActions from '../../../../../action/receipt';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  Button,
  UncontrolledPopover,
  PopoverHeader,
  PopoverBody,
} from 'reactstrap';
class AddProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      size: 5,
      totalPages: 0,
      activePage: 1,
      showSearchList: false,
      inputSearch: '',
      purchaseProducts: [],
      totalAmount: 0,
      quantity: 0,
      price: 1,
      status: '',
    };
  }

  componentDidMount() {
    const { products, receipt } = this.props;
    console.log('datanhan', receipt);
    this.setState({
      purchaseProducts: products.productsReceiptDTOS,
      totalAmount: products.totalMoney,
      status: products.status,
    });
    if (receipt.payment !== null) {
      this.setState({
        status: 1,
      });
    }
  }

  handlePriceProduct = (e, id) => {
    let { purchaseProducts } = this.state;
    let value = e.value;
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

  handleTotalAmountQuantity = () => {
    let { purchaseProducts } = this.state;
    let totalAmount = 0;
    let quantity = 0;
    for (let i = 0; i < purchaseProducts.length; i++) {
      totalAmount += purchaseProducts[i].quantity * purchaseProducts[i].price;
      quantity += purchaseProducts[i].quantity;
    }
    this.setState(
      {
        totalAmount: totalAmount,
        quantity: quantity,
      },
      () => {
        let purchaseProducts = this.state.purchaseProducts;
        let totalAmount = this.state.totalAmount;
        this.props.setPurchaseProducts(purchaseProducts, totalAmount);
      },
    );
  };

  pushPurchaseProducts = (product) => {
    let purchaseProduct = {
      varianId: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      skuCode: product.skuCode,
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

  removeProduct = (id) => {
    let { purchaseProducts } = this.state;
    for (let i = 0; i < purchaseProducts.length; i++) {
      if (purchaseProducts[i].varianId === id) {
        purchaseProducts.splice(i, 1);
      }
    }

    this.setState(
      {
        purchaseProducts: purchaseProducts,
      },
      () => this.handleTotalAmountQuantity(),
    );
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

  setPage = (e) => {
    this.setState((prevState) => ({
      showSearchList: true,
      activePage: e,
    }));
    const { receiptActionCreators } = this.props;
    const { fetchListVariant } = receiptActionCreators;
    const { inputSearch, activePage } = this.state;
    if (activePage === 0) {
      this.setState((prevState) => ({
        showSearchList: true,
        activePage: 1,
      }));
    }
    fetchListVariant(e, inputSearch);
  };

  handleClick = (event) => {
    this.setState((prevState) => ({
      showSearchList: !prevState.showSearchList,
      activePage: 1,
    }));
    const { receiptActionCreators } = this.props;
    const { fetchListVariant } = receiptActionCreators;
    const { inputSearch } = this.state;
    fetchListVariant(1, inputSearch);
  };

  onChange = (e) => {
    let target = e.target;
    let value = target.value;
    let name = target.name;
    this.setState({
      [name]: value,
    });
  };

  OnSearch = () => {
    this.setState((prevState) => ({
      showSearchList: true,
      activePage: 1,
    }));
    const { receiptActionCreators } = this.props;
    const { fetchListVariant } = receiptActionCreators;
    const { activePage, inputSearch } = this.state;
    console.log('search', inputSearch);
    fetchListVariant(activePage, inputSearch);
  };

  render() {
    const { classes, listVariant } = this.props;
    const { listResult } = listVariant;
    const {
      purchaseProducts,
      totalAmount,
      quantity,
      activePage,
      inputSearch,
      status,
    } = this.state;
    let disbaled = false;
    if (status === 1) {
      disbaled = true;
    }
    return (
      <div>
        <div className={classes.row}>
          <InputGroup>
            <InputGroupAddon addonType="prepend">
              <InputGroupText>
                {status === 1 ? (
                  <SearchIcon className={classes.icon} />
                ) : (
                  <SearchIcon
                    className={classes.icon}
                    onClick={this.OnSearch}
                  />
                )}
              </InputGroupText>
            </InputGroupAddon>
            <Input
              placeholder="Tìm kiếm sản phẩm..."
              onClick={this.handleClick}
              id="PopoverLegacy"
              name="inputSearch"
              onChange={this.onChange}
              disabled={disbaled}
              autoComplete="off"
            />
          </InputGroup>

          <div className="row" />
          {listResult && this.state.showSearchList ? (
            <SearchProduct
              pushPurchaseProducts={this.pushPurchaseProducts}
              variant={listResult}
              setPage={this.setPage}
              activePage={activePage}
            />
          ) : (
            ''
          )}
        </div>
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
                {purchaseProducts.map((row) => (
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
                      <input
                        type="number"
                        name="quantity"
                        id="quantity"
                        className="form-control"
                        min="1"
                        onFocus={(e) => e.target.select()}
                        value={row.quantity}
                        disabled={disbaled}
                        onChange={(e) =>
                          this.handleQuantityProduct(e, row.varianId)
                        }
                        style={{
                          fontFamily:
                            '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif',
                          fontSize: '14px',
                          fontWeight: '400',
                          textAlign: 'right',
                        }}
                      />
                    </TableCell>
                    <TableCell
                      align="right"
                      style={{
                        width: '110px',
                        padding: '10px',
                      }}
                    >
                      <CurrencyFormat
                        thousandSeparator={true}
                        style={{
                          fontFamily:
                            '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif',
                          fontSize: '14px',
                          fontWeight: '400',
                          textAlign: 'right',
                        }}
                        onValueChange={(e) =>
                          this.handlePriceProduct(e, row.varianId)
                        }
                        value={Number(row.price)}
                        disabled={disbaled}
                        className="form-control"
                      />
                    </TableCell>
                    <TableCell align="right" colSpan={5} style={{ padding: 1 }}>
                      {(row.price * row.quantity)
                        .toFixed(1)
                        .replace(/\d(?=(\d{3})+\.)/g, '$&,')
                        .replace('.0', '')}
                      &nbsp;&nbsp;
                      {status === 1 ? (
                        ''
                      ) : (
                        <span
                          style={{
                            color: 'rgb(130, 138, 146)',
                            marginRight: '4px',
                          }}
                          onClick={() => this.removeProduct(row.varianId)}
                        >
                          <i className="fas fa-times " />
                        </span>
                      )}
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
                    {totalAmount
                      .toFixed(1)
                      .replace(/\d(?=(\d{3})+\.)/g, '$&,')
                      .replace('.0', '')}
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

AddProduct.propTypes = {
  classes: PropTypes.object,
  receiptActionCreators: PropTypes.shape({
    fetchListVariant: PropTypes.func,
  }),
  listVariant: PropTypes.array,
};
const mapStateToProps = (state) => {
  return {
    listVariant: state.receipt.listVariant,
    receipt: state.receipt.receiptEditting,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    receiptActionCreators: bindActionCreators(receiptActions, dispatch),
  };
};
export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(AddProduct),
);
