/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable prefer-destructuring */
/* eslint-disable prefer-const */
/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-unused-state */
import {
  withStyles,
  Box,
  Button,
  Paper,
  styled,
  TableCell,
  TableRow,
  TableHead,
  Hidden,
} from '@material-ui/core';
import React, { Component } from 'react';
import ReceiptList from '../../../components/Receipt/ReceiptList';
import ReceiptToolbar from '../../../components/Receipt/ReceiptToolbar';
import styles from './styles';
import { connect } from 'react-redux';
import * as receiptActions from '../../../action/receipt';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import Pagination from 'react-js-pagination';
import * as modalActions from '../../../action/modal';
import SearchInput from '../../../components/SearchInput';
import SearchIcon from '@material-ui/icons/Search';
import { Link } from 'react-router-dom';
import {
  UncontrolledPopover,
  PopoverHeader,
  PopoverBody,
  Popover,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  FormGroup,
  Label,
} from 'reactstrap';
import AsyncSelect from 'react-select/async';
class ListReceipts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: 1,
      size: 10,
      totalPages: 100,
      haha: [
        {
          label: 'haha',
        },
        {
          label: 'huhu',
        },
        {
          label: 'hihi',
        },
      ],
      code: '',
      status: '',
      statuspayment: '',
      supplierName: '',
      open: false,
      cleartext: false,
      test: '',
    };
  }

  componentDidMount() {
    const { receiptActionCreators } = this.props;
    const { fetchListReceipt, searchReceipt } = receiptActionCreators;
    const { activePage, size } = this.state;
    const data = {
      code: this.state.code,
      status: this.state.status,
      statuspayment: this.state.statuspayment,
      supplierName: this.state.supplierName,
    };
    searchReceipt(activePage, 10, data);
  }

  handlePageChange = (pageNumber) => {
    const { receiptActionCreators } = this.props;
    const { fetchListReceipt, searchReceipt } = receiptActionCreators;
    this.setState({
      activePage: pageNumber,
    });
    const { size, code } = this.state;
    const data = {
      code: this.state.code,
      status: this.state.status,
      statuspayment: this.state.statuspayment,
      supplierName: this.state.supplierName,
    };
    searchReceipt(pageNumber, size, data);
  };

  setPageSize = (e) => {
    let target = e.target;
    let value = target.value;
    let name = target.name;
    this.setState({
      [name]: value,
    });
  };

  Search = () => {
    this.setState({
      cleartext: !this.state.cleartext,
    });
    const { receiptActionCreators } = this.props;
    const { searchReceipt } = receiptActionCreators;
    const { activePage, size, code } = this.state;

    const data = {
      code: this.state.code,
      status: this.state.status,
      statuspayment: this.state.statuspayment,
      supplierName: this.state.supplierName,
    };
    searchReceipt(activePage, size, data);
  };

  onChange = (e) => {
    let target = e.target;
    let value = target.value;
    let name = target.name;
    this.setState({
      [name]: value,
    });
  };

  clearText = () => {
    this.setState({
      cleartext: !this.state.cleartext,
      code: '',
      status: '',
      statuspayment: '',
      supplierName: '',
    });
    const { receiptActionCreators } = this.props;
    const { searchReceipt } = receiptActionCreators;
    const { size } = this.state;

    const data = {
      code: '',
      status: '',
      statuspayment: '',
      supplierName: '',
    };
    searchReceipt(1, size, data);
  };

  renderClearText = () => {
    let html = '';
    html = (
      <InputGroupText
        style={{ marginLeft: -12, height: '38px' }}
        onClick={this.clearText}
      >
        <span
          style={{
            fontFamily:
              '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif',
            fontSize: '14px',
            fontWeight: '400',
            textTransform: 'none',
          }}
        >
          Hủy
        </span>
      </InputGroupText>
    );
    return html;
  };

  render() {
    const { classes, listReceipt, totalItem } = this.props;
    const { open, cleartext, haha, test } = this.state;
    console.log('test2', this.state.test);
    const filterColors = (inputValue) => {
      return haha.filter((i) =>
        i.label.toLowerCase().includes(inputValue.toLowerCase()),
      );
    };

    const promiseOptions = (inputValue) =>
      new Promise((resolve) => {
        setTimeout(() => {
          resolve(filterColors(inputValue));
        }, 1000);
      });
    return (
      <div className={classes.root}>
        <div style={{ marginTop: '-18px', marginBottom: '18px' }}>
          <h1
            style={{
              fontSize: '24px',
              lineHeight: '3.4rem',
              fontWeight: '600',
              color: '#212B35',
              fontFamily:
                'apple-system,BlinkMacSystemFont,San Francisco,Segoe UI,Roboto,Helvetica Neue,sans-serif',
            }}
          >
            {' '}
            Đơn Nhập Hàng
          </h1>
        </div>

        <div className={classes.row}>
          <div style={{ float: '' }}>
            <div style={{ height: 57 }}>
              <div className={classes.cell} style={{ marginBottom: '-20px' }}>
                <InputGroup
                  style={{
                    marginLeft: '16px',
                    width: '180px',
                    float: 'left',
                    marginTop: '16px',
                  }}
                >
                  <Input
                    placeholder="Nhập mã đơn hàng..."
                    style={{
                      fontFamily:
                        '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif',
                      fontSize: '16px',
                      fontWeight: '400',
                      height: 38,
                    }}
                    onChange={this.onChange}
                    name="code"
                    value={this.state.code}
                  />
                </InputGroup>
                <div style={{}}>
                  <TableCell
                    className={classes.cell}
                    // style={{
                    //   width: '230px',
                    //   fontSize: '17px!important',
                    // }}
                  >
                    {/* <AsyncSelect
                      cacheOptions
                      defaultOptions
                      loadOptions={promiseOptions}
                      onInputChange={this.handleInputChange}
                      // onChange={this.onChange}
                      name="test"
                    /> */}
                    <Input
                      placeholder="Tên nhà cung cấp..."
                      style={{
                        fontFamily:
                          '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif',
                        fontSize: '16px',
                        fontWeight: '400',
                        height: 38,
                        marginLeft: 10,
                      }}
                      onChange={this.onChange}
                      name="supplierName"
                      value={this.state.supplierName}
                    />
                    {/* <select
                      className="form-control"
                      name="status"
                      onChange={this.onChange}
                    >
                      <option>Nhà Cung Cấp</option>
                      <option value={1}>Đã thanh toán</option>
                      <option value={0}>Chưa thanh toán</option>
                    </select> */}
                  </TableCell>
                  <TableCell
                    style={{ textAlign: 'center' }}
                    className={classes.cell}
                  >
                    <select
                      className="form-control"
                      name="statuspayment"
                      onChange={this.onChange}
                    >
                      <option
                        selected={
                          this.state.statuspayment !== '' ? '' : 'selected'
                        }
                      >
                        Thanh Toán
                      </option>
                      <option value={1}>Đã thanh toán</option>
                      <option value={0}>Chưa thanh toán</option>
                    </select>
                  </TableCell>
                  <TableCell className={classes.cell}>
                    <div style={{ display: 'flex' }}>
                      <select
                        className="form-control"
                        name="status"
                        onChange={this.onChange}
                        style={{ marginLeft: -5 }}
                      >
                        <option
                          selected={this.state.status !== '' ? '' : 'selected'}
                        >
                          Nhập Kho
                        </option>
                        <option value={1}>Đã nhập kho</option>
                        <option value={0}>Chưa nhập kho</option>
                      </select>
                      <InputGroupText
                        style={{ marginLeft: 29, cursor: 'pointer' }}
                        onClick={this.Search}
                      >
                        <SearchIcon className={classes.icon} />
                        <span
                          style={{
                            fontFamily:
                              '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif',
                            fontSize: '14px',
                            fontWeight: '400',
                            textTransform: 'none',
                          }}
                        >
                          Tìm kiếm
                        </span>
                      </InputGroupText>
                    </div>
                  </TableCell>
                  <TableCell className={classes.cell}>
                    {cleartext ? this.renderClearText() : ''}
                  </TableCell>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style={{ float: 'right', marginTop: '-110px' }}>
          <Button
            variant="contained"
            className={classes.button}
            onClick={this.setEdit}
          >
            <Link
              to="/receipts/create"
              style={{
                textDecoration: 'none',
                color: '#f8f9fa',
                fontFamily:
                  '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif',
              }}
            >
              Thêm Đơn Hàng
            </Link>
          </Button>
        </div>
        <div className={classes.content}>
          {listReceipt ? (
            <ReceiptList
              receipts={listReceipt}
              onClickDelete={this.showModalDeleteReceipt}
            />
          ) : (
            ''
          )}
        </div>
        <div className="d-flex justify-content-between mt-3 align-items-start ">
          <div className="d-flex justify-content-center align-items-center">
            <span className="d-block">Hiển thị</span>
            <select
              className="form-control form-control-sm ml-3 mr-3"
              style={{ width: 'auto' }}
              onChange={this.setPageSize}
              name="size"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={30}>30</option>
            </select>
            <span className="d-block">trên tổng số {totalItem} kết quả.</span>
          </div>
          <Pagination
            activePage={this.state.activePage}
            itemsCountPerPage={this.state.size} // size số bản ghi 1 trang
            totalItemsCount={totalItem} // tổng số bản ghi
            pageRangeDisplayed={10} // số nút hiển thị
            onChange={this.handlePageChange}
            itemClass={'page-item'}
            linkClass={'page-link'}
          />
        </div>
      </div>
    );
  }
}

ListReceipts.propTypes = {
  classes: PropTypes.object,
  receiptActionCreators: PropTypes.shape({
    fetchListReceipt: PropTypes.func,
  }),
  listReceipt: PropTypes.array,
  modalActionCreators: PropTypes.shape({
    showModal: PropTypes.func,
    hideModal: PropTypes.func,
    changeModalTittle: PropTypes.func,
    changeModalContent: PropTypes.func,
  }),
};
const mapStateToProps = (state) => {
  return {
    listReceipt: state.receipt.listReceipt,
    totalItem: state.receipt.totalItem,
    receiptEditting: state.receipt.receiptEditting,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    receiptActionCreators: bindActionCreators(receiptActions, dispatch),
    modalActionCreators: bindActionCreators(modalActions, dispatch),
  };
};
export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(ListReceipts),
);
