/* eslint-disable react/no-will-update-set-state */
/* eslint-disable react/no-did-update-set-state */
/* eslint-disable react/no-deprecated */
/* eslint-disable lines-between-class-members */
/* eslint-disable no-unused-vars */
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
import SearchIcon from '@material-ui/icons/Search';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import SearchSupplier from '../SearchSupplier';
import styles from './styles';
import * as receiptActions from '../../../../action/receipt';
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
class AddSupplier extends Component {
  constructor(props) {
    super(props);
    this.state = {
      supplier: '',
      size: 5,
      totalPages: 0,
      activePage: 1,
      showSearchList: false,
      inputSearch: '',
      activeSearch: '',
      haha: 1,
    };
  }

  componentWillUpdate() {
    console.log('ưlll');
  }

  componentDidUpdate() {
    const supplierr = this.props.supplier;
    const { showSearchList, haha } = this.state;
    console.log('diss');

    if (haha === 1) {
      if (supplierr) {
        this.setState({
          showSearchList: !showSearchList,
          supplier: supplierr,
          haha: 0,
        });
      }
    }
  }

  handleClick = (event) => {
    this.setState((prevState) => ({
      showSearchList: !prevState.showSearchList,
      activePage: 1,
    }));
    const { receiptActionCreators } = this.props;
    const { fetchListSupplier } = receiptActionCreators;
    const { activePage, inputSearch } = this.state;
    fetchListSupplier(1, inputSearch);
  };

  setPage = (e) => {
    this.setState((prevState) => ({
      showSearchList: true,
      activePage: e,
    }));
    const { receiptActionCreators } = this.props;
    const { fetchListSupplier } = receiptActionCreators;
    const { activeSearch, inputSearch, activePage } = this.state;
    if (activePage === 0) {
      this.setState((prevState) => ({
        showSearchList: true,
        activePage: 1,
      }));
    }
    fetchListSupplier(e, inputSearch);
  };

  addSupplier = (suppliers) => {
    // const { supplier } = this.props;
    // console.log('datanhaajn', suppliers);

    // const supplierss = receipt.supplier;
    // if (supplierss !== null) {
    //   this.handleClick();
    //   this.setState(
    //     {
    //       supplier: supplierss,
    //     },
    //     () => this.props.setSupplier(this.state.supplier.id),
    //   );
    // }
    console.log('supplier', suppliers);
    this.handleClick();
    this.setState(
      {
        supplier: suppliers,
      },
      () => this.props.setSupplier(this.state.supplier.id),
    );
  };

  removeSupplier = () => {
    this.setState({
      supplier: '',
      // haha: 1,
      showSearchList: false,
    });
  };

  renderSupplier = () => {
    let supplier = this.state.supplier;
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
                fontWeight: '400',
                color: '#08f',
              }}
            >
              <i className="fas fa-user" /> {supplier.name}
            </div>
            <div
              className="clear"
              onClick={this.removeSupplier}
              style={{
                marginLeft: '-51px',
                marginTop: '6px',
                fontFamily:
                  '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif',
                fontSize: '14px',
                fontWeight: '400',
              }}
            >
              <button
                type="button"
                className="btn  ml-5"
                style={{ fontSize: '13px' }}
              >
                <span style={{ color: '#828a92' }}>
                  <i className="fas fa-times " />
                </span>
              </button>
            </div>
          </div>
          <div className="info-detail">
            <h6
              style={{
                fontFamily:
                  '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif',
                fontSize: '14px',
                fontWeight: '400',
              }}
            >
              Số điện thoại: {supplier.phone}
            </h6>
            <h6
              style={{
                // fontSize: '13px',
                fontFamily:
                  '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif',
                fontSize: '14px',
                fontWeight: '400',
              }}
            >
              Email: {supplier.email}
            </h6>
            <h6
              style={{
                // fontSize: '13px',
                fontFamily:
                  '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif',
                fontSize: '14px',
                fontWeight: '400',
              }}
            >
              Địa chỉ: {supplier.address}, {supplier.province}
            </h6>
          </div>
        </div>
      );
    }
  };

  OnClickSearch = () => {
    this.setState((prevState) => ({
      showSearchList: true,
      activePage: 1,
    }));
    const { receiptActionCreators } = this.props;
    const { fetchListSupplier } = receiptActionCreators;
    const { activePage, inputSearch } = this.state;
    fetchListSupplier(activePage, inputSearch);
  };

  onChangeSearch = (e) => {
    let target = e.target;
    let value = target.value;
    let name = target.name;
    this.setState({
      [name]: value,
    });
  };

  onToggle = () => {
    this.setState((prevState) => ({
      showSearchList: false,
    }));
  };

  render() {
    const { classes, listSuppliers } = this.props;
    const { listResult } = listSuppliers;
    const { showSearchList, supplier, activePage } = this.state;
    console.log('supplet', supplier);
    return (
      <div>
        <div className={classes.row}>
          <div>
            {!supplier ? (
              <div>
                <InputGroup style={{ marginBottom: 16 }}>
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <SearchIcon
                        className={classes.icon}
                        onClick={this.OnClickSearch}
                      />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Tìm kiếm nhà cung cấp..."
                    onClick={this.handleClick}
                    onChange={this.onChangeSearch}
                    name="inputSearch"
                    toggle={this.onToggle}
                    autoComplete="off"
                  />
                </InputGroup>
              </div>
            ) : (
              ''
            )}
          </div>
        </div>
        {listResult && showSearchList ? (
          <SearchSupplier
            addSupplier={this.addSupplier}
            supplier={listResult}
            setPage={this.setPage}
            activePage={activePage}
          />
        ) : (
          <div className={classes.searchList}>{this.renderSupplier()}</div>
        )}
      </div>
    );
  }
}

AddSupplier.propTypes = {
  classes: PropTypes.object,
  receiptActionCreators: PropTypes.shape({
    fetchListSupplier: PropTypes.func,
  }),
  listSuppliers: PropTypes.array,
  setSupplier: PropTypes.func,
};
const mapStateToProps = (state) => {
  return {
    listSuppliers: state.receipt.listSuppliers,
    supplier: state.receipt.supplier,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    receiptActionCreators: bindActionCreators(receiptActions, dispatch),
  };
};
export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(AddSupplier),
);
