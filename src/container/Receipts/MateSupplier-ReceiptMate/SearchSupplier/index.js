/* eslint-disable react/no-deprecated */
/* eslint-disable prefer-destructuring */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable prefer-const */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-unused-state */
import { withStyles } from '@material-ui/core';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './styles';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import * as receiptActions from '../../../../action/receipt';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { toastError } from '../../../../helpers/toastHelper';
class SearchSupplier extends Component {
  constructor(props) {
    super(props);
    this.state = {
      supplier: '',
      size: 5,
      totalPages: 0,
      activePage: 2,
      supplierList: [],
      showSearchList: false,
      inputSearch: '',
      setModal: false,
      name: '',
      phone: '',
      email: '',
      address: '',
      suppliers: '',
    };
  }

  componentWillMount() {
    const { supplierr } = this.props;
    if (supplierr !== null) {
      console.log('gahaha');
      this.setState({
        suppliers: supplierr,
      });
    }
  }

  openModal = () => {
    this.setState({
      setModal: !this.state.setModal,
    });
  };

  onClose = () => {
    this.setState({
      setModal: !this.state.setModal,
    });
  };

  setPageDow = (activePage) => {
    this.setState(
      {
        // activePage: activePage - 1,
      },
      () => this.props.setPage(activePage - 1),
    );
  };

  setPageUp = (activePage) => {
    this.setState(
      {
        // activePage: activePage + 1,
      },
      () => this.props.setPage(activePage + 1),
    );
  };

  renderItemList = () => {
    let supplier = '';
    supplier = this.props.supplier;
    const { classes } = this.props;
    if (supplier.length === 0) {
      return (
        <div className="text-center mt-3">Không có nhà cung cấp tìm kiếm</div>
      );
    }

    let a = supplier.map((item) => {
      return (
        <div className={classes.Item}>
          <div
            key={item.id}
            className="d-flex  item-product"
            onClick={() => this.props.addSupplier(item)}
            // onClick={() => this.addSuppliers(item)}
            style={{
              borderBottom: '1px solid #dfdada',
              padding: '1px 5px',
              height: '50px',
              cursor: 'pointer',
            }}
          >
            <div style={{ marginTop: '13px' }}>
              <AccountCircleOutlinedIcon size="" color="primary" />
            </div>

            <div style={{ marginLeft: '10px' }}>
              <p style={{ marginTop: '5px' }}>{item.name}</p>
              <p style={{ marginTop: '-13px' }}>{item.phone}</p>
            </div>
          </div>
        </div>
      );
    });
    return a;
  };

  addSuppliers = (item) => {
    const { addSupplier, supplierr } = this.props;
    const { suppliers } = this.state;
    if (suppliers !== null) {
      addSupplier(suppliers);
    }
    this.props.addSupplier(item);

    // console.log('receipt', suppliers);
  };

  handleInputChange = (e) => {
    let target = e.target;
    let value = target.value;
    let name = target.name;
    this.setState({
      [name]: value,
    });
  };

  addQuickSupplier = () => {
    const { receiptActionCreators } = this.props;
    const { addSupplier } = receiptActionCreators;
    const data = {
      name: this.state.name,
      email: this.state.email,
      phone: this.state.phone,
      address: this.state.address,
    };
    let error = false;
    if (data.name === '') {
      error = true;
      toastError('Vui lòng thêm tên nhà cung cấp');
    }

    if (error === false) {
      addSupplier(data);
      this.onClose();
    }

    // this.addSuppliers();
  };

  renderModalSupplier = () => {
    const { setModal } = this.state;
    return (
      <div>
        <Modal isOpen={setModal}>
          <ModalHeader>Thêm mới sản phẩm</ModalHeader>
          <ModalBody>
            <div className="form-group" id="name">
              <label htmlFor="name">
                Tên nhà cung cấp <span className="valid-label">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                name="name"
                onChange={this.handleInput}
              />
              <div className="invalid-feedback" />
            </div>
            <div className="form-group" id="phone">
              <label htmlFor="phone">Số điện thoại </label>
              <input
                type="number"
                className="form-control"
                name="phone"
                onChange={this.handleInput}
              />
              <div className="invalid-feedback" />
            </div>
            <div className="form-group" id="email">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                className="form-control"
                name="email"
                onChange={this.handleInput}
              />
              <div className="invalid-feedback" />
            </div>
            <div className="form-group" id="address">
              <label htmlFor="address">
                Địa chỉ <span className="valid-label" />
              </label>
              <input
                type="text"
                className="form-control"
                name="address"
                onChange={this.handleInput}
              />
              <div className="invalid-feedback" />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() => this.addQuickSupplier()}>
              Thêm
            </Button>{' '}
            <Button color="secondary" onClick={() => this.onClose()}>
              Thoát
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  };

  handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    this.setState({
      [name]: value,
    });
  };

  addSupplier = () => {};

  render() {
    const { classes, activePage } = this.props;
    const { setModal } = this.state;
    console.log('nhận', activePage);
    return (
      <div className={classes.listSearch}>
        <div className={classes.addProduct}>
          <button
            type="button"
            className="btn"
            style={{
              fontSize: '13px',
              borderRight: '1px solid rgb(223, 218, 218)',
              borderRadius: 0,
              padding: '0 10px',
              lineHeight: '34px',
              marginRight: '10px',
            }}
            onClick={this.openModal}
          >
            <span style={{ color: '#343a40' }}>
              <i className="fas fa-plus fa-1x" />
            </span>
          </button>
          <span style={{ color: '#343a40' }}>Thêm Mới Nhà Cung Cấp</span>
        </div>
        {this.renderItemList()}
        <div style={{ textAlign: 'right', padding: '6px' }}>
          <button
            type="button"
            className="btn"
            style={{
              fontSize: '7px',
              border: '1px solid #c4cdd5',
              borderRadius: '5px',
              background: '#f8f9fb',
              // borderColor: '#f8f9fb',
              marginRight: '8px',
            }}
            onClick={() => this.setPageDow(activePage)}
          >
            <span style={{ color: '#b8c0c9' }}>
              <i className="fas fa-arrow-left fa-2x" />
            </span>
          </button>
          <button
            type="button"
            className="btn"
            style={{
              fontSize: '7px',
              borderRadius: '5px',
              background: '#f8f9fb',
              border: '1px solid #c4cdd5',
            }}
            onClick={() => this.setPageUp(activePage)}
          >
            <span style={{ color: '#b8c0c9' }}>
              <i className="fas fa-arrow-right fa-2x" />
            </span>
          </button>
        </div>
        <div> {this.renderModalSupplier()}</div>
      </div>
    );
  }
}

SearchSupplier.propTypes = {
  classes: PropTypes.object,
  receiptActionCreators: PropTypes.shape({
    fetchListSupplier: PropTypes.func,
  }),
};
const mapStateToProps = (state) => {
  return {
    listSuppliers: state.receipt.listSuppliers,
    supplierr: state.receipt.supplier,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    receiptActionCreators: bindActionCreators(receiptActions, dispatch),
  };
};
export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(SearchSupplier),
);
