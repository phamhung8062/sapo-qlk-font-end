/* eslint-disable prefer-destructuring */
/* eslint-disable prefer-const */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable object-shorthand */
/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-unused-state */
import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  Typography,
  withStyles,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Col, FormGroup, Input, Label } from 'reactstrap';
import { bindActionCreators } from 'redux';
import * as receiptActions from '../../../action/receipt';
import { toastSuccess } from '../../../helpers/toastHelper';
import ProductInfo from './ProductInfo';
import styles from './styles';
import SupplierInfo from './SupplierInfo';
class ReceiptInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      paymentMethod: 'Tiền Mặt',
    };
  }

  componentDidMount() {
    const { receiptActionCreators } = this.props;
    const { fetchOneReceipt } = receiptActionCreators;
    const id = this.props.match.params.id;
    fetchOneReceipt(id);
  }

  renderPay = (receitpts) => {
    const { classes, receipt } = this.props;
    let html = null;
    const { payment, totalMoney } = receitpts;
    console.log('payment', receitpts);
    if (payment !== null) {
      const { status, createdDate, paymentMethod, createdBy, id } = payment;
      if (status === 1)
        html = (
          <div>
            <span style={{ fontSize: '16px' }}>
              <i className="fas fa-money-check fa-1x" />
              &nbsp; &nbsp;Thanh Toán
            </span>
            <Divider style={{ marginTop: '8px' }} />
            {/* <Card className={classes.paycard} variant="outlined"> */}
            <CardContent>
              <div>
                <Typography
                  className={classes.title}
                  gutterBottom
                  style={{ fontSize: '15px', color: 'blue' }}
                >
                  Xác Nhận &nbsp; &nbsp;
                  <span className={classes.badge}>Đã Thanh Toán</span>
                </Typography>

                <Typography
                  variant="body2"
                  component="p"
                  style={{ float: 'right', marginTop: '-27px' }}
                >
                  06/21/2020 15:27:49
                </Typography>
              </div>
              <Typography
                className={classes.pos}
                color="textSecondary"
                style={{ fontSize: '13px' }}
              >
                Số tiền thanh toán
              </Typography>
              <Typography variant="body2" component="p">
                <Typography variant="body2" component="p">
                  {receipt.totalMoney
                    ? receipt.totalMoney
                        .toFixed(1)
                        .replace(/\d(?=(\d{3})+\.)/g, '$&,')
                        .replace('.0', '')
                    : ''}{' '}
                  vnđ
                </Typography>
              </Typography>
              <Typography
                className={classes.pos}
                color="textSecondary"
                style={{ fontSize: '13px' }}
              >
                Phương Thức Thanh Toán
              </Typography>
              <Typography variant="body2" component="p">
                {paymentMethod}
              </Typography>
              <div
                style={{
                  float: 'right',
                  marginTop: '-80px',
                  marginRight: '21px',
                }}
              >
                <Typography
                  className={classes.pos}
                  color="textSecondary"
                  style={{ fontSize: '13px' }}
                >
                  Người Thanh Toán
                </Typography>
                <Typography variant="body2" component="p">
                  {createdBy}
                </Typography>
              </div>
            </CardContent>
            {/* </Card> */}
          </div>
        );
    }

    if (payment == null)
      html = (
        <div>
          <div>
            <span style={{ fontSize: '16px' }}>
              <i className="fas fa-money-check fa-1x" />
              &nbsp; &nbsp; Thanh Toán{' '}
            </span>
            <div
              style={{
                float: 'right',
                // marginTop: '-57px',
                // marginRight: '21px',
              }}
            >
              <Button
                color="#f8f9fa"
                style={{ background: '#d0e7ff' }}
                onClick={() => this.addPay()}
              >
                <Typography color="textSecondary" style={{ fontSize: '15px' }}>
                  Xác Nhận Thanh Toán
                </Typography>
              </Button>
            </div>
          </div>

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
          <div style={{ float: 'right', marginTop: '-5px' }}>
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
                  value={receipt.totalMoney
                    .toFixed(1)
                    .replace(/\d(?=(\d{3})+\.)/g, '$&,')
                    .replace('.0', '')}
                />
              </Col>
            </FormGroup>
          </div>
        </div>
      );

    return html;
  };

  handleInputChange = (e) => {
    let target = e.target;
    let value = target.value;
    console.log('value', value);
    let name = target.name;
    this.setState({
      [name]: value,
    });
  };

  addPay = () => {
    const { receipt, receiptActionCreators } = this.props;
    const { paymentMethod } = this.state;
    const { updatePayment } = receiptActionCreators;
    const ids = this.props.match.params.id;
    const payment = {
      paymentMethod: this.state.paymentMethod,
      totalMoney: receipt.totalMoney,
      status: 1,
      receiptId: receipt.id,
    };
    // updatePayment(payment);
    if (updatePayment(payment)) {
      toastSuccess('Thanh Toán Thành Công');
    }
  };

  renderReceipt = (receipt) => {
    const {
      status,
      totalMoney,
      createdDate,
      paymentMethod,
      createdBy,
      id,
    } = receipt;
    const { classes } = this.props;
    let html = null;
    if (status === 1)
      html = (
        <div>
          <div>
            <span style={{ fontSize: '16px' }}>
              <i className="fas fa-truck fa-1x" />
              &nbsp; &nbsp;Nhập Kho
            </span>
          </div>
          <Divider style={{ marginTop: '8px' }} />
          <div className={classes.pay}>
            <div className={classes.paycard}>
              <CardContent>
                <Typography
                  className={classes.title}
                  gutterBottom
                  style={{ fontSize: '15px', color: 'blue' }}
                >
                  {receipt.code} &nbsp; &nbsp;
                  <span className={classes.badge}>Đã Nhập Kho</span>
                </Typography>

                <Typography
                  className={classes.pos}
                  color="textSecondary"
                  style={{ fontSize: '13px' }}
                >
                  Mã phiếu nhập kho
                </Typography>
                <Typography variant="body2" component="p">
                  {receipt.code}
                </Typography>
                <Typography
                  className={classes.pos}
                  color="textSecondary"
                  style={{ fontSize: '13px' }}
                >
                  Ngày Nhập Kho
                </Typography>
                <Typography variant="body2" component="p">
                  6/7/2020
                </Typography>
                <div
                  style={{
                    float: 'right',
                    marginTop: '-96px',
                    marginRight: '21px',
                  }}
                >
                  <Typography
                    className={classes.pos}
                    color="textSecondary"
                    style={{ fontSize: '13px' }}
                  >
                    Tổng Tiền
                  </Typography>
                  <Typography variant="body2" component="p">
                    {receipt.totalMoney
                      ? receipt.totalMoney
                          .toFixed(1)
                          .replace(/\d(?=(\d{3})+\.)/g, '$&,')
                          .replace('.0', '')
                      : ''}
                    đ
                  </Typography>
                </div>
              </CardContent>
            </div>
          </div>
        </div>
      );
    if (status === 0)
      html = (
        <div>
          <span style={{ fontSize: '16px' }}>
            <i className="fas fa-truck fa-1x" />
            &nbsp; &nbsp; Nhập Kho
          </span>

          <div
            style={{
              float: 'right',
            }}
          >
            <Button
              color="#f8f9fa"
              style={{ background: '#d0e7ff' }}
              onClick={() => this.updateStatus(id)}
            >
              <Typography color="textSecondary" style={{ fontSize: '15px' }}>
                Nhập Kho
              </Typography>
            </Button>
          </div>
        </div>
      );
    return html;
  };

  updateStatus = (id) => {
    const { receipt, receiptActionCreators } = this.props;
    const { updateStatus, fetchOneReceipt } = receiptActionCreators;
    const ids = this.props.match.params.id;
    const payment = {
      status: 1,
      id: id,
    };
    updateStatus(payment);
    if (updateStatus(payment)) {
      toastSuccess('Nhập Kho Thành Công');
    }
  };

  render() {
    const { classes, receipt } = this.props;
    const { productsReceiptDTOS, supplier, payment } = receipt;
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
                {receipt.code} &nbsp; &nbsp;
                <Link to={`/receipts/${receipt.id}/edit`} className={classes.a}>
                  <span
                    className="ui-breadcrumb__item"
                    style={{
                      color: '#637381',
                      fontSize: '18px',
                      position: 'relative',
                      left: '-7px',
                    }}
                  >
                    Sửa{' '}
                  </span>
                </Link>
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
                {productsReceiptDTOS ? (
                  <ProductInfo setPurchaseProducts={receipt} />
                ) : (
                  ''
                )}
              </CardContent>
            </Card>
            <Card className={classes.card}>
              <Divider />
              <CardContent>
                {receipt ? this.renderPay(receipt) : ''}
              </CardContent>
            </Card>
            <Card className={classes.card}>
              <Divider />
              <CardContent>
                {receipt ? this.renderReceipt(receipt) : ''}
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
                {productsReceiptDTOS ? (
                  <SupplierInfo setSupplier={supplier} />
                ) : (
                  ''
                )}
              </CardContent>
            </Card>

            <Card className={classes.card}>
              <CardHeader
                title="Thông Tin Đơn Nhập Hàng"
                className={classes.header}
              />
              <Divider />
              <CardContent>
                <div className="desciption-tag">
                  <div className="form-group description">
                    <label htmlFor="description">Ghi chú</label>
                    <Typography variant="body2" component="p">
                      {receipt.note}
                    </Typography>
                  </div>
                  <div className="tag">
                    <div className="form-group tag">
                      <label htmlFor="tag">Tag</label>
                      &nbsp; &nbsp; &nbsp;
                      <Typography
                        variant="body2"
                        component="p"
                        className={classes.tag}
                      >
                        {receipt.tag}
                      </Typography>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    );
  }
}

ReceiptInfo.propTypes = {
  classes: PropTypes.object,
  receiptActionCreators: PropTypes.shape({
    fetchListReceipt: PropTypes.func,
    addReceipt: PropTypes.func,
  }),
  receipt: PropTypes.object,
};
const mapStateToProps = (state) => {
  return {
    receipt: state.receipt.receipt,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    receiptActionCreators: bindActionCreators(receiptActions, dispatch),
  };
};
export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(ReceiptInfo),
);
