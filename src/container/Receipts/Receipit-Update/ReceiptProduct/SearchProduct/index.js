/* eslint-disable react/jsx-boolean-value */
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
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import CurrencyFormat from 'react-currency-format';
class SearchProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      size: 5,
      totalPages: 0,
      activePage: 2,
      supplierList: [],
      showSearchList: false,
      inputSearch: '',
      setModal: false,
    };
  }

  componentDidUpdate(prevProps, prevState) {}

  // setPageDow = () => {
  //   this.setState(
  //     {
  //       activePage: this.state.activePage - 1,
  //     },
  //     () => this.props.setPage(this.state.activePage),
  //   );
  // };

  // setPageUp = () => {
  //   this.setState(
  //     {
  //       activePage: this.state.activePage + 1,
  //     },
  //     () => this.props.setPage(this.state.activePage),
  //   );
  // };
  setPageDow = (activePage) => {
    console.log('Nhận up', activePage);
    this.setState({}, () => this.props.setPage(activePage - 1));
  };

  setPageUp = (activePage) => {
    console.log('Nhận up', activePage);
    this.setState(
      {
        // activePage: activePage + 1,
      },
      () => this.props.setPage(activePage + 1),
    );
  };

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

  renderModalProduct = () => {
    const { setModal } = this.state;
    return (
      <div>
        <Modal isOpen={setModal} c>
          <ModalHeader>Thêm mới sản phẩm</ModalHeader>
          <ModalBody>
            <div name="main-body">
              <div className="form-group" id="name">
                <label htmlFor="name">
                  Tên sản phẩm <span className="valid-label">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  onChange={this.handleInput}
                />
                <div className="invalid-feedback" />
              </div>
              <div className="form-group" id="code">
                <label htmlFor="code">
                  Mã sản phẩm <span className="valid-label">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="code"
                  onChange={this.handleInput}
                />
                <div className="invalid-feedback" />
              </div>
              <div className="form-group" id="inventoryNumber">
                <label htmlFor="inventoryNumber">Số lượng tồn</label>
                <input
                  type="number"
                  className="form-control"
                  name="inventoryNumber"
                  onChange={this.handleInput}
                  min="0"
                />
                <div className="invalid-feedback" />
              </div>
              <div className="form-group" id="importPrice">
                <label htmlFor="importPrice">Giá nhập</label>
                {/* <input type="text" className="form-control" name="importPrice" onChange={this.handleInput} /> */}
                <CurrencyFormat
                  className="form-control"
                  thousandSeparator={true}
                  value={this.state.importPrice}
                  name="importPrice"
                  onValueChange={this.handleInputImportPrice}
                />
                <div className="invalid-feedback" />
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="primary">Thêm</Button>{' '}
            <Button color="secondary" onClick={() => this.onClose()}>
              Thoát
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  };

  renderItemList = () => {
    const { classes, variant } = this.props;
    console.log('haha123', variant);
    if (variant.length === 0) {
      return (
        <div className="text-center mt-3">Không có sản phẩm cần tìm kiếm</div>
      );
    }

    let a = variant.map((product) => {
      return (
        <div className={classes.Item}>
          <div
            key={product.id}
            className="d-flex justify-content-between item-product"
            onClick={() => this.props.pushPurchaseProducts(product)}
            style={{
              borderBottom: '1px solid #dfdada',
              // padding: '4px 20px',
              cursor: 'pointer',
            }}
          >
            <div>
              <h6
                className="search-product"
                style={{ marginLeft: 16, marginTop: 8 }}
              >
                {' '}
                <span>{product.code}</span>{' '}
                <span
                  style={{
                    fontFamily:
                      '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif',
                    fontSize: '14px',
                    fontWeight: '400',
                  }}
                >
                  {product.name}
                  <br />( {product.skuCode} )
                </span>
              </h6>
            </div>
            <h6
              className="search-product"
              style={{ marginTop: 26, fontSize: '14px', marginRight: 10 }}
            >
              <span
                style={{
                  fontFamily:
                    '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif',
                  fontSize: '14px',
                  fontWeight: '400',
                }}
              >
                {/* {product.price}
                <br /> */}
                Số lượng:
              </span>
              &nbsp;{product.quantity}
            </h6>
          </div>
        </div>
      );
    });
    return a;
  };

  render() {
    const { classes, activePage } = this.props;
    return (
      <div className={classes.listSearch}>
        {/* <div className={classes.addProduct}>
          <button
            type="button"
            className="btn"
            style={{
              fontSize: '13px',
              borderRight: '1px solid rgb(223, 218, 218)',
              borderRadius: '5px',
            }}
            onClick={this.openModal}
          >
            <span style={{ color: '#343a40' }}>
              <i className="fas fa-plus fa-2x" />
            </span>
          </button>
          <span style={{ color: '#343a40' }}>Thêm Mới Sản Phẩm</span>
        </div> */}
        <div> {this.renderItemList()}</div>

        <div style={{ textAlign: 'right', padding: '6px' }}>
          <button
            type="button"
            className="btn"
            style={{
              fontSize: '7px',
              background: '#f8f9fb',
              border: '1px solid #c4cdd5',
              marginRight: '8px',
              borderRadius: '5px',
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
              background: '#f8f9fb',
              border: '1px solid #c4cdd5',
              // float: 'right',
              borderRadius: '5px',
            }}
            onClick={() => this.setPageUp(activePage)}
          >
            <span style={{ color: '#b8c0c9' }}>
              <i className="fas fa-arrow-right fa-2x" />
            </span>
          </button>
        </div>
        {this.renderModalProduct()}
      </div>
    );
  }
}

// AddProducts.propTypes = {
//   classes: PropTypes.object,
//   receiptActionCreators: PropTypes.shape({
//     fetchListReceipt: PropTypes.func,
//   }),
//   listReceipt: PropTypes.array,
//   receiptEditting: PropTypes.object,
// };
// const mapStateToProps = (state) => {
//   return {
//     listReceipt: state.receipt.listReceipt,
//     receiptEditting: state.receipt.receiptEditting,
//   };
// };
// const mapDispatchToProps = (dispatch) => {
//   return {
//     receiptActionCreators: bindActionCreators(receiptActions, dispatch),
//   };
// };
export default withStyles(styles)(connect(null, null)(SearchProduct));
