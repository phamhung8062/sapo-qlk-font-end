/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable prefer-destructuring */
/* eslint-disable prefer-const */
/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-unused-state */
import { withStyles, Button, Paper } from '@material-ui/core';
import React, { Component } from 'react';
import styles from './styles';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import Pagination from 'react-js-pagination';
import * as modalActions from '../../../action/modal';
import SearchInput from '../../../components/SearchInput';
import SearchIcon from '@material-ui/icons/Search';
import { Link } from 'react-router-dom';
import * as supplierActions from '../../../action/supplier';
import DeleteIcon from '@material-ui/icons/Delete';
import SupplierModal from '../../Supplier/SupplierModal/index';
import { Table, TableCell } from '@material-ui/core';


import {
    UncontrolledPopover,
    PopoverHeader,
    PopoverBody,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Input,
} from 'reactstrap';

import SupplierList from './SupplierList';


class ListSuppliers extends Component {
    constructor(props) {
        // /debugger
        super(props);
        this.state = {
            isSearching: false,
            searchCode: '',
            searchName: '',
            searchStatus: '',
            cleartext: false,
            page: 1,
            size: 5,
            //totalItemState: 10,
            items: [
                {
                    id: 1,
                    header: <TableCell align="left">Mã nhà cung cấp</TableCell>,
                    show: true,
                },
                {
                    id: 2,
                    header: <TableCell align="left">Tên nhà cung cấp</TableCell>,
                    show: true,
                },
                {
                    id: 3,
                    header: <TableCell align="left">Địa chỉ</TableCell>,
                    show: true,
                },
                {
                    id: 4,
                    header: <TableCell align="left">Email</TableCell>,
                    show: true,
                },
                {
                    id: 5,
                    header: <TableCell align="left">Số điện thoại</TableCell>,
                    show: true,
                },
                {
                    id: 6,
                    header: <TableCell align="left">Trạng thái</TableCell>,
                    show: true,
                },
                {
                    id: 7,
                    header: <TableCell align="left">Ngày tạo</TableCell>,
                    show: false,
                },
                {
                    id: 8,
                    header: <TableCell align="left">Cập nhật cuối</TableCell>,
                    show: false,
                },
                {
                    id: 9,
                    header: <TableCell align="left">Website</TableCell>,
                    show: false,
                },
                {
                    id: 10,
                    header: <TableCell align="left">Mã số thuế</TableCell>,
                    show: false,
                },
                {
                    id: 11,
                    header: <TableCell align="left">Mô tả</TableCell>,
                    show: false,
                },
                {
                    id: 12,
                    header: <TableCell align="left">Địa chỉ 2</TableCell>,
                    show: false,
                },
            ]
        };
    }

    // cb = (e, call) => {
    //     const { supplierActionCreators } = this.props;
    //     const { fetchListSupplierByPageSize } = supplierActionCreators;

    //     // this.setState({
    //     //     size: e.target.value,
    //     //     page: 1,
    //     // });
    //     fetchListSupplierByPageSize(this.state.page - 1, e.target.value);
    //     debugger
    //     call(e);
    // }

    // callBack = (e) => {
    //     this.setState({
    //         size: e.target.value,
    //         page: 1,
    //     });
    // }

    handlePageChange = (pageNumber, size) => {
        //debugger
        // const { receiptActionCreators } = this.props;
        // const { fetchListReceipt, searchReceipt } = receiptActionCreators;
        // this.setState({
        //   activePage: pageNumber,
        // });
        // const { size, search } = this.state;
        // searchReceipt(pageNumber, size, search);
        // // fetchListReceipt(pageNumber, size,code),;
        //debugger
        const { supplierActionCreators } = this.props;
        const { fetchListSupplierByPageSize, searchSupplier } = supplierActionCreators;
        //debugger
        this.setState({
            page: pageNumber,
            //size:size,
        });
        if (this.state.isSearching) {
            const { searchCode, searchName, searchStatus, size } = this.state;
            searchSupplier(searchCode, searchName, searchStatus, pageNumber - 1, size);
        }
        else fetchListSupplierByPageSize(pageNumber - 1, this.state.size);
    };

    handlePageSizeChange = (e) => {
        //e = arguments[0];
        //debugger
        const { supplierActionCreators } = this.props;
        const { fetchListSupplierByPageSize, searchSupplier } = supplierActionCreators;
        if (this.state.isSearching) {
            const { searchCode, searchName, searchStatus } = this.state;
            searchSupplier(searchCode, searchName, searchStatus, 0, e.target.value);
        }
        else fetchListSupplierByPageSize(0, e.target.value);
        this.setState({
            size: e.target.value,
            page: 1,
            searchCode: '',
            searchName: '',
            searchStatus: '',
            isClear: true,
        });
        //this.cb(e, this.callBack);
    }

    componentDidMount() {
        // var data1 = api.getAllListSupplier();
        // data1.then(function (res) {
        //   console.log(res.data);
        // });
        //console.log('listSupplier did mount');
        const { supplierActionCreators } = this.props;
        const { fetchAllListSupplier, fetchListSupplierByPageSize, fetchTotalItem } = supplierActionCreators;
        const { page, size } = this.state;
        fetchListSupplierByPageSize(0, size);
        fetchTotalItem();
        //debugger

        const _items = this.props.location.items;
        if (_items != undefined || _items != null) {
            this.setState({
                items: _items,
            });
        }
    }

    // componentDidMount() {
    //     debugger
    //     this.setState((state, props) => ({
    //         size: this.state.size,
    //         page: 1,
    //         totalItemState: props.totalItem,
    //     }));
    // }

    clearText = () => {
        this.setState({
            cleartext: !this.state.cleartext,
        });
    }

    renderDelConfirmDialog = () => {
        return (
            <div className="modal fade" id="doDeleteModalProduct" tabIndex={-1} role="dialog" aria-labelledby="deleteVariantModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Xóa sản phẩm?</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <strong>Sản phẩm này sẽ bị xóa, Bạn có chắc chắn không?</strong>
                            <p>hành động này sẽ không thể khôi phục lại</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" >Xóa</button>
                        </div>
                    </div>
                </div>
                <DeleteIcon data-toggle="modal" data-target="#doDeleteModalProduct" />
            </div>
        );
    }

    reorder = (items) => {
        //debugger
        this.setState({
            items: items,
        });
    }

    cbDeleteSupplier = (id) => {
        const { supplierActionCreators } = this.props;
        const { deleteSupplier, fetchListSupplierByPageSize, fetchTotalItem } = supplierActionCreators;
        deleteSupplier(id);
        this.setState({
            page: 1,
        });
        fetchListSupplierByPageSize(0, this.state.size);
        //debugger
        // this.setState({
        //     totalItemState: this.props.totalItem,
        //     page: 1,
        // })
    }


    //***************************** ******************************/
    onChangeSearch = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        //debugger
        this.setState({
            [name]: value,
            isClear: false,
        });
    }

    handleSearch = () => {
        const { supplierActionCreators } = this.props;
        const { searchSupplier } = supplierActionCreators;
        const { searchCode, searchName, searchStatus, page, size } = this.state;
        if (searchCode != '' || searchName != '' || searchStatus != '') {
            this.setState({
                isSearching: true,
            })
            searchSupplier(searchCode, searchName, searchStatus, page - 1, size)
        }
    }

    handleCancelSearch = () => {
        this.setState({
            isSearching: false,
            searchCode: '',
            searchName: '',
            searchStatus: '',
        })
        this.componentDidMount();
    }

    //*************************************************************** */

    /************************ */
    renderClearText = () => {
        let html = '';
        html = (
            <InputGroupText
                style={{ marginLeft: -12, height: '38px' }}
                onClick={this.handleCancelSearch}>
                <span
                    style={{
                        fontFamily:
                            '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif',
                        fontSize: '14px',
                        fontWeight: '400',
                        textTransform: 'none',
                    }}>
                    Hủy
                    </span>
            </InputGroupText>
        );
        return html;
    };

    render() {
        const { classes, listSupplier, totalItem = 0 } = this.props;
        const { isSearching } = this.state;
        //debugger
        return (
            <div className={classes.root}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between'
                }}>
                    <div style={{ marginTop: '-18px', marginBottom: '18px', height: '46px', }}>
                        <h1 style={{
                            fontSize: '24px',
                            lineHeight: '3.4rem',
                            fontWeight: '600',
                            color: '#212B35',
                            fontFamily: 'apple-system,BlinkMacSystemFont,San Francisco,Segoe UI,Roboto,Helvetica Neue,sans-serif',
                        }}>{' '}Nhà Cung Cấp
                    </h1>
                    </div>
                    <SupplierModal backItems={this.state.items} cb={this.reorder}></SupplierModal>
                    <div style={{ float: 'right', marginTop: '0px' }}>
                        <Link
                            to={{ pathname: '/suppliers/create', state: { isEdit: false }, items: this.state.items }}>
                            <Button style={{
                                textDecoration: 'none',
                                color: '#f8f9fa',
                                fontFamily: '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif',
                            }}
                                variant="contained"
                                className={classes.button}>Thêm mới nhà cung cấp
                        </Button>
                        </Link>
                    </div>

                </div>

                <div className={classes.row}>
                    <div style={{ float: '', width: '100%' }}>
                        <div style={{ height: 57 }}>
                            <div className={classes.cell} style={{ marginBottom: '-20px' }}>
                                <InputGroup
                                    style={{
                                        marginLeft: '16px',
                                        width: '200px',
                                        float: 'left',
                                        marginTop: '16px',
                                    }}
                                >
                                    <Input
                                        placeholder="Nhập mã nhà cung cấp..."
                                        style={{
                                            fontFamily:
                                                '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif',
                                            fontSize: '16px',
                                            fontWeight: '400',
                                            height: 38,
                                        }}
                                        onChange={this.onChangeSearch}
                                        name="searchCode"
                                        value={this.state.searchCode}
                                    />
                                </InputGroup>
                                <div style={{}}>
                                    <TableCell
                                        className={classes.cell}>
                                        <Input
                                            placeholder="Tên nhà cung cấp..."
                                            style={{
                                                fontFamily:
                                                    '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif',
                                                fontSize: '16px',
                                                fontWeight: '400',
                                                height: 38,
                                            }}
                                            onChange={this.onChangeSearch}
                                            name="searchName"
                                            value={this.state.searchName}
                                        />
                                    </TableCell>

                                    <TableCell className={classes.cell}>
                                        <div style={{ display: 'flex' }}>
                                            <select
                                                className="form-control"
                                                name="searchStatus"
                                                onChange={this.onChangeSearch}>
                                                <option value="" placeholder="" selected={!this.state.isSearching}>
                                                    Trạng thái
                                                </option>
                                                <option value={'true'}>Đang giao dịch</option>
                                                <option value={'false'}>Ngừng giao dịch</option>
                                            </select>
                                            <InputGroupText
                                                style={{ marginLeft: 29, cursor: 'pointer' }}
                                                onClick={this.handleSearch}>
                                                <SearchIcon className={classes.icon} />
                                                <span
                                                    style={{
                                                        fontFamily:
                                                            '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif',
                                                        fontSize: '14px',
                                                        fontWeight: '400',
                                                        textTransform: 'none',
                                                    }}>Tìm kiếm
                                                </span>
                                            </InputGroupText>
                                        </div>
                                    </TableCell>
                                    <TableCell className={classes.cell}>
                                        {isSearching ? this.renderClearText() : ''}
                                    </TableCell>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                {/* Truyền dữ liệu vào props */}
                <div className={classes.content}>
                    <SupplierList deleteAction={this.cbDeleteSupplier} suppliers={listSupplier} items={this.state.items} />
                </div>
                {totalItem == 0 ? '' :
                    <div className="d-flex justify-content-between mt-3 align-items-start ">
                        <div className="d-flex justify-content-center align-items-center">
                            <span className="d-block">Hiển thị tối đa </span>
                            <select
                                className="form-control form-control-sm ml-3 mr-3"
                                style={{ width: 'auto' }} name="size"
                                onChange={this.handlePageSizeChange}>
                                <option value={5}>5</option>
                                <option value={10}>10</option>
                                <option value={15}>15</option>
                                <option value={30}>30</option>
                            </select>
                            <span className="d-block">
                                trên tổng số {totalItem} kết quả.
                           </span>
                        </div>
                        <Pagination
                            activePage={this.state.page}
                            itemsCountPerPage={this.state.size} // size số bản ghi 1 trang
                            totalItemsCount={totalItem} // tổng số bản ghi
                            pageRangeDisplayed={5} // số nút hiển thị
                            onChange={this.handlePageChange}
                            itemClass={'page-item'}
                            linkClass={'page-link'} />
                    </div>}

            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        listSupplier: state.supplier.listSupplier,
        totalItem: state.supplier.totalItem,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        supplierActionCreators: bindActionCreators(supplierActions, dispatch),
    };
};

export default withStyles(styles)(
    connect(mapStateToProps, mapDispatchToProps)(ListSuppliers));

