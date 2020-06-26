import React, { Component } from 'react';
import styles from './styles';
import PropTypes from 'prop-types';
import { IconButton, Table, TableBody, TableCell, TableHead, TableRow, Checkbox, withStyles } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import { Link } from 'react-router-dom';
import DeleteIcon from '@material-ui/icons/Delete';
import { withRouter } from 'react-router-dom';
import { toastError, toastSuccess } from '../../../helpers/toastHelper';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
class SupplierItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
        };
    }

    notif = (supplier) => {
        if (supplier.receiptDTOS.length != 0)
            toastError("Không thể xóa nhà cung cấp đã có đơn hàng");
        else {
            this.setState({
                modal: !this.state.modal,
            })
        }
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal,
        })
    }

    renderModal = (supplier, modal, deleteSupplier) => {
        return (
            <Modal isOpen={modal} toggle={this.toggle}>
                <ModalHeader toggle={this.toggle}>Xóa nhà cung cấp</ModalHeader>
                <ModalBody>
                    <strong>Nhà cung cấp này sẽ bị xóa, Bạn có chắc chắn không?</strong>
                    <p>Hành động này sẽ không thể khôi phục lại</p>
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" onClick={() => { deleteSupplier(supplier.id); this.toggle() }}>Xóa</Button>
                </ModalFooter>
            </Modal>
        );
    }

    handleClick = (event, supplier) => {
        //debugger
        //console.log(supplier.id);
        event.stopPropagation();
        //this.setState({ isSelected: !this.state.isSelected });
        this.props.history.push({
            pathname: `/suppliers/${supplier.id}`,
            params: { id: supplier.id },
            state: { supplier },
        });
        //console.log(supplier.name);
    }

    handleClickDelete = (id, deleteSupplier) => {
        debugger
        //console.log(supplier);
        deleteSupplier(id);
    }

    handleP = (e) => {
        e.stopPropagation();
        //e.preventDefault();
    }

    reorderTableBody = (items, supplier, classes) => {
        let body = null;
        body = items.filter((item) => {
            return item.show;
        });

        body = body.map((v) => {
            switch (v.id) {
                case 1:
                    return (<TableCell className={classes.cell} style={{ color: '#08f', }}>
                        {supplier.code}
                    </TableCell>);
                case 2:
                    return (<TableCell className={classes.cell}>
                        {supplier.name}
                    </TableCell>);
                case 3:
                    return (<TableCell className={classes.cell}>
                        {supplier.address}
                    </TableCell>);
                case 4:
                    return (<TableCell className={classes.cell}>
                        {supplier.email}
                    </TableCell>);
                case 5:
                    return (<TableCell className={classes.cell}>
                        {supplier.phone}
                    </TableCell>);
                case 6:
                    return (<TableCell className={classes.cell}>
                        {supplier.status == 'true' ? <span className={classes.true}>Đang giao dịch</span> : <span className={classes.false}>Ngừng giao dịch</span>}
                    </TableCell>);
                case 7:
                    return (<TableCell className={classes.cell}>
                        {supplier.createdDate}
                    </TableCell>);
                case 8:
                    return (<TableCell className={classes.cell}>
                        {supplier.modifiedDate}
                    </TableCell>);
                case 9:
                    return (<TableCell className={classes.cell}>
                        {supplier.website}
                    </TableCell>);
                case 10:
                    return (<TableCell className={classes.cell}>
                        {supplier.taxCode}
                    </TableCell>);
                case 11:
                    return (<TableCell className={classes.cell}>
                        {supplier.description}
                    </TableCell>);
                case 12:
                    return (<TableCell className={classes.cell}>
                        {supplier.address2}
                    </TableCell>);
                default:
                    break;
            }
        });
        return body;
    }

    handleDel = (cb, supplier) => {
        console.log(supplier);
        cb(supplier.id);
    }

    componentDidMount() {
        console.log()
    }

    renderDelConfirmDialog = (deleteSupplier, supplier) => {
        //console.log(id);
        return (
            <div className="modal fade" id="doDeleteModalProduct" tabIndex={-1} role="dialog" aria-labelledby="deleteVariantModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Xóa nhà cung cấp</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <strong>Nhà cung cấp này sẽ bị xóa, Bạn có chắc chắn không?</strong>
                            <p>hành động này sẽ không thể khôi phục lại</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" onClick={() => deleteSupplier(supplier.id)} className="btn btn-danger" >Xóa</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    render() {
        const { classes, supplier, items, deleteSupplier } = this.props;

        //console.log("id:", supplier.id);
        const { modal } = this.state;
        //console.log(supplier.receiptDTOS.length == 0);
        return (
            <TableRow style={{ cursor: 'pointer' }} key={supplier.id} onClick={(event) => this.handleClick(event, supplier)} hover>
                {/* <TableCell
                    style={{
                        color: '#08f',
                        fontFamily:
                            '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif',
                        fontSize: '14px',
                        fontWeight: '400',
                    }}>{supplier.code}
                </TableCell>
                <TableCell
                    style={{
                        fontFamily:
                            '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif',
                        fontSize: '14px',
                        fontWeight: '400',
                    }}>
                    {supplier.name}
                </TableCell>
                {/* {this.renderStatus()} */}
                {/*<TableCell
                    style={{
                        fontFamily:
                            '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif',
                        fontSize: '14px',
                        fontWeight: '400',
                    }}>
                    {supplier.address}
                </TableCell>
                <TableCell
                    style={{
                        fontFamily:
                            '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif',
                        fontSize: '14px',
                        fontWeight: '400',
                    }}>
                    {supplier.email}
                </TableCell>
                <TableCell
                    style={{
                        fontFamily:
                            '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif',
                        fontSize: '14px',
                        fontWeight: '400',
                    }}>
                    {supplier.phone}
                </TableCell>
                <TableCell
                    style={{
                        fontFamily:
                            '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif',
                        fontSize: '14px',
                        fontWeight: '400',
                    }}>
                    {supplier.status == 'true' ? <span className={classes.true}>Đang giao dịch</span> : <span className={classes.false}>Ngừng giao dịch</span>}
                </TableCell> */}
                {this.reorderTableBody(items, supplier, classes)}
                <TableCell onClick={this.handleP} align="left" className={classes.inline} >
                    <Link to={{ pathname: `/suppliers/${supplier.id}/edit`, state: { supplier, isEditAvailable: true }, items: items }} onClick={this.handleP} className={classes.link}>
                        <IconButton style={{ padding: '0px' }} color="primary" aria-label="edit supplier">
                            <EditIcon />
                        </IconButton>
                    </Link>
                    {/* {this.renderDelConfirmDialog(deleteSupplier, supplier)} */}

                    {/* <IconButton onClick={() => this.handleClickDelete(supplier)} color="secondary" aria-label="delete supplier">
                        <DeleteIcon data-toggle="modal" data-target={supplier.receiptDTOS.length != 0 ? "" : "#doDeleteModalProduct"} />
                    </IconButton> */}
                    {this.renderModal(supplier, modal, deleteSupplier)}
                    <IconButton onClick={() => this.notif(supplier)} color="secondary" aria-label="delete supplier">
                        <DeleteIcon />
                    </IconButton>
                </TableCell>
            </TableRow>
        );
    }
}

export default withStyles(styles)(withRouter(SupplierItem));