/* eslint-disable prefer-destructuring */
/* eslint-disable prefer-const */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable object-shorthand */
/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-unused-state */
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  withStyles,
} from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import * as receiptActions from '../../../action/receipt';
import { toastError } from '../../../helpers/toastHelper';
import AddProduct from '../MateProduct-Reciept/AddProduct';
import AddSupplier from '../MateSupplier-ReceiptMate/AddSupplier';
import styles from './styles';
import { Col, FormGroup, Label, Input, FormText } from 'reactstrap';
class ReceiptCreateMate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: 1,
      size: 5,
      totalPages: 20,
      haha: [],
      supplierId: '',
      receiptProduct: [],
      totalAmount: '',
      code: '',
      description: '',
      tag: '',
      status: 0,
      pay: 0,
      paymentMethod: '',
      showPay: false,
      payment: '',
    };
  }

  addReceipt = () => {
    const { receiptActionCreators } = this.props;
    const { addReceipt } = receiptActionCreators;
    let payment = {};
    if (this.state.pay === 1) {
      payment = {
        paymentMethod: this.state.paymentMethod,
        status: this.state.pay,
        totalMoney: this.state.totalAmount,
      };
    }

    const receipt = {
      totalMoney: this.state.totalAmount,
      note: this.state.description,
      tag: this.state.tag,
      supplierId: this.state.supplierId,
      productsReceiptDTOS: this.state.receiptProduct,
      code: this.state.code,
      status: this.state.status,
      payment: payment,
    };
    console.log('data', receipt);
    let error = false;

    if (receipt.supplierId === '') {
      error = true;
      toastError('Vui lòng thêm nhà cung cấp');
    }

    if (receipt.productsReceiptDTOS.length === 0) {
      error = true;
      toastError('Vui lòng thêm ít nhất một sản phẩm');
    }

    if (error === false) {
      addReceipt(receipt);
    }
  };

  setSupplier = (supplier) => {
    this.setState({
      supplierId: supplier,
    });
  };

  setPurchaseProducts = (purchaseProducts, totalAmount) => {
    this.setState({
      receiptProduct: purchaseProducts,
      totalAmount: totalAmount,
    });
  };

  handleInputChange = (e) => {
    let target = e.target;
    let value = target.value;
    if (target.name === 'status' || target.name === 'pay') {
      value = target.checked === true ? 1 : 0;
    }
    console.log('value', value);
    let name = target.name;
    this.setState({
      [name]: value,
    });
  };

  renderPayment = () => {
    const { pay, totalAmount } = this.state;
    let html = '';
    if (pay === 1 && totalAmount) {
      html = (
        <div>
          <div style={{ float: 'left', marginTop: '10px', width: '270px' }}>
            <FormGroup row>
              <Label for="exampleSelect" sm={10}>
                Hình thức thanh toán
              </Label>
              <Col sm={10}>
                <Input
                  type="select"
                  name="paymentMethod"
                  id="exampleSelect"
                  onChange={this.handleInputChange}
                  style={{
                    fontFamily:
                      '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif',
                    fontSize: '14px',
                    fontWeight: '400',
                  }}
                >
                  <option>Tiền Mặt</option>
                  <option>COD</option>
                  <option>Chuyển Khoản</option>
                </Input>
              </Col>
            </FormGroup>
          </div>
          <div style={{ float: 'right', marginTop: '-1px' }}>
            <FormGroup row>
              <Label for="exampleSelect" sm={8}>
                Số tiền thanh toán
              </Label>
              <Col sm={10}>
                <input
                  type="text"
                  className="form-control"
                  name="paymoney"
                  disabled
                  style={{
                    fontFamily:
                      '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif',
                    fontSize: '14px',
                    fontWeight: '400',
                  }}
                  value={totalAmount
                    .toFixed(1)
                    .replace(/\d(?=(\d{3})+\.)/g, '$&,')
                    .replace('.0', '')}
                />
              </Col>
            </FormGroup>
          </div>
        </div>
      );
    }

    return html;
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <header className="ui-title-bar-container title-product1 title-product-top">
          <div className="ui-title-bar" style={{ marginTop: '-16px' }}>
            <div className="ui-title-bar__navigation">
              <div className="ui-breadcrumbs">
                <Link to="/receipts" className={classes.a}>
                  <i
                    className="fas fa-chevron-left"
                    style={{
                      fill: '#637381',
                      width: '20px',
                      height: '20px',
                      position: 'relative',
                      top: '0px',
                      left: '-5px',
                      color: '#637381',
                    }}
                  />
                  <span
                    className="ui-breadcrumb__item"
                    style={{
                      color: '#637381',
                      fontSize: '15px',
                      position: 'relative',
                      left: '-7px',
                    }}
                  >
                    Quay lại danh sách hóa đơn{' '}
                  </span>
                </Link>
              </div>
            </div>
            <div className="ui-title-bar__main-group w-75">
              <h1
                style={{
                  fontSize: '24px',
                  lineHeight: '3.4rem',
                  fontWeight: '600',
                  color: '#212B35',
                  fontFamily:
                    'apple-system,BlinkMacSystemFont,San Francisco,Segoe UI,Roboto,Helvetica Neue,sans-serif',
                  marginTop: '-7px',
                }}
              >
                {' '}
                Tạo Đơn Nhập Hàng
              </h1>
            </div>
          </div>
        </header>
        <Grid container spacing={4}>
          <Grid item md={8} xs={12}>
            <Card>
              <CardHeader
                title="Thông Tin Sản Phẩm"
                style={{ fontSize: '16px' }}
              />
              <Divider />
              <CardContent>
                <AddProduct setPurchaseProducts={this.setPurchaseProducts} />
              </CardContent>
            </Card>
            <Card className={classes.card}>
              <Divider />
              <CardContent>
                <div>
                  <span style={{ fontSize: '16px' }}>
                    <i className="fas fa-money-check fa-1x" />
                    &nbsp; &nbsp;Thanh Toán
                  </span>
                  <div style={{ float: 'right', marginTop: '-10px' }}>
                    <Checkbox
                      checked={this.state.pay}
                      // checked={checked}
                      onChange={this.handleInputChange}
                      name="pay"
                      color="primary"
                      value={this.state.pay}
                      inputProps={{ 'aria-label': 'primary checkbox' }}
                      onClick={this.addPayment}
                    />
                    <span>Thanh toán với nhà cung cấp</span>
                  </div>
                  <div>{this.renderPayment()}</div>
                </div>
              </CardContent>
            </Card>
            <Card className={classes.card}>
              <Divider />
              <CardContent>
                <div>
                  <span style={{ fontSize: '16px' }}>
                    <i className="fas fa-truck fa-1x" />
                    &nbsp; &nbsp;Nhập Kho
                  </span>

                  <div style={{ float: 'right', marginTop: '-10px' }}>
                    <Checkbox
                      checked={this.state.status}
                      onChange={this.handleInputChange}
                      color="primary"
                      name="status"
                      value={this.state.status}
                      inputProps={{ 'aria-label': 'primary checkbox' }}
                    />{' '}
                    <span>Nhập kho</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Grid>

          <Grid item md={4} xs={12}>
            <Card>
              <CardHeader
                title="Thông Tin Nhà Cung Cấp"
                style={{ fontSize: '16px' }}
              />
              <Divider />
              <CardContent>
                <AddSupplier setSupplier={this.setSupplier} />
              </CardContent>
            </Card>

            <Card className={classes.card}>
              <CardHeader
                title="Thông Tin Đơn Nhập Hàng"
                className={classes.header}
              />
              <Divider />
              <CardContent>
                <div className="tag">
                  <div className="form-group tag">
                    <label htmlFor="tag">Mã Đơn Nhập Hàng</label>
                    <input
                      type="text"
                      className="form-control"
                      id="code"
                      name="code"
                      placeholder=""
                      onChange={this.handleInputChange}
                    />
                  </div>
                </div>
                <div className="desciption-tag">
                  <div className="form-group description">
                    <label htmlFor="description">Ghi chú</label>
                    <textarea
                      className="form-control"
                      id="description"
                      name="description"
                      rows={5}
                      placeholder="Ghi chú"
                      onChange={this.handleInputChange}
                    />
                  </div>
                  <div className="tag">
                    <div className="form-group tag">
                      <label htmlFor="tag">Tag</label>
                      <input
                        type="text"
                        className="form-control"
                        id="tag"
                        name="tag"
                        placeholder="Tag"
                        onChange={this.handleInputChange}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <div className={classes.addReceipt}>
          <Button
            variant="contained"
            // color="default"
            className={classes.button}
          >
            <NavLink
              to="/receipts"
              style={{ textDecoration: 'none', color: 'rgb(64, 75, 86)' }}
            >
              Hủy
            </NavLink>
          </Button>
          &nbsp; &nbsp; &nbsp;
          <Button
            className={classes.Button}
            disableRipple
            onClick={this.addReceipt}
          >
            Duyệt Hàng
          </Button>
        </div>
      </div>
    );
  }
}

ReceiptCreateMate.propTypes = {
  classes: PropTypes.object,
  receiptActionCreators: PropTypes.shape({
    fetchListReceipt: PropTypes.func,
    addReceipt: PropTypes.func,
  }),
};
const mapStateToProps = (state) => {
  return {
    listReceipt: state.receipt.listReceipt,
    receiptEditting: state.receipt.receiptEditting,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    receiptActionCreators: bindActionCreators(receiptActions, dispatch),
  };
};
export default withStyles(styles)(
  connect(null, mapDispatchToProps)(ReceiptCreateMate),
);
