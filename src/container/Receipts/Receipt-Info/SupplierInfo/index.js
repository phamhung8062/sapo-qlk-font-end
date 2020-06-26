/* eslint-disable object-shorthand */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable prefer-destructuring */
/* eslint-disable prefer-const */
/* eslint-disable consistent-return */
/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-unused-state */
import { withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as receiptActions from '../../../../action/receipt';
import styles from './styles';
class SupplierInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      supplier: {
        name: 'Hung',
        phone: '0979620656',
      },
      size: 5,
      totalPages: 0,
      activePage: 1,
      showSearchList: false,
      inputSearch: '',
    };
  }

  renderSupplier = () => {
    const { classes, setSupplier } = this.props;
    console.log('status', setSupplier.status);
    let supplier = setSupplier;
    if (supplier !== '') {
      return (
        <div className="info-provider ml-3">
          <div className="info-name d-flex  mb-3">
            <div
              href="#"
              target="_blank"
              style={{
                marginTop: '13px',
                fontFamily:
                  '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif',
                fontSize: '14px',
                fontWeight: '550',
                color: '#08f',
              }}
            >
              <i className="fas fa-user" /> {supplier.name}
            </div>
          </div>
          <div className="info-detail">
            <h6
              style={{
                fontFamily:
                  '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif',
                fontSize: '14px',
                fontWeight: '450',
              }}
            >
              Số điện thoại: {supplier.phone}
            </h6>
            <h6
              style={{
                fontFamily:
                  '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif',
                fontSize: '14px',
                fontWeight: '450',
              }}
            >
              Email: {supplier.email}
            </h6>
            <h6
              style={{
                fontFamily:
                  '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif',
                fontSize: '14px',
                fontWeight: '450',
              }}
            >
              Địa chỉ: {supplier.address}, {supplier.province}
            </h6>
          </div>
        </div>
      );
    }
  };

  render() {
    const { classes, setSupplier } = this.props;

    return (
      <div>
        <div className={classes.searchList}>{this.renderSupplier()}</div>
      </div>
    );
  }
}

SupplierInfo.propTypes = {
  classes: PropTypes.object,
  receiptActionCreators: PropTypes.shape({
    fetchListSupplier: PropTypes.func,
  }),
};
const mapStateToProps = (state) => {
  return {
    listSupplier: state.receipt.listSupplier,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    receiptActionCreators: bindActionCreators(receiptActions, dispatch),
  };
};
export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(SupplierInfo),
);
