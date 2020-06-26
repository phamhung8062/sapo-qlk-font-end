/* eslint-disable react/void-dom-elements-no-children */
import {
    Avatar,
    Checkbox,
    IconButton,
    TableCell,
    TableRow,
    Typography,
    withStyles,
    TextField,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import VisibilityIcon from '@material-ui/icons/Visibility';
import EditIcon from '@material-ui/icons/Edit';
import PropTypes from 'prop-types';
import ProductAPI from '../../../../apis/product'
import { toastError, toastSuccess } from '../../../../helpers/toastHelper';
import React, { useState, useEffect } from 'react';
import styles from './styles';
import { Link, Redirect } from 'react-router-dom';
function ProductItem({ product, images, classes, productId }) {

    const [imageActive, setImageActive] = useState(null)


    useEffect(() => {
        getImageActive()
    }, [])

    const getImageActive = () => {

        let imgActive = [];
        imgActive = images.length == 0 ? null
            : images.filter(image => image.active == true)

        if (imgActive != null) setImageActive(imgActive[0]);
    }


    const onDeleteProduct = (e) => {
        e.preventDefault()
        ProductAPI.deleteProduct(product.id)
            .then(res => {
                toastSuccess('Xóa sản phẩm thành công')
                window.location.reload(false);
                
            })
            .catch(error => {
                console.log("error nè: ", error.response.data)
                let listMessError = error.response.data.errors
                listMessError.map((mess) => toastError(mess))
            })
    }

    return (
            <TableRow className={classes.tableRow} hover>
                <TableCell>
                    {
                        imageActive == null ? <img className={classes.myImage} src="https://vinatex.com.vn/wp-content/themes/vinatex/assets/images/default-thumbnail.png"></img>
                            : <div className="imageInList">
                                <img className={classes.myImage}
                                    src={"/image/" + imageActive.path}></img>
                            </div>
                    }
                </TableCell>
                <TableCell
                    style={{
                        fontFamily:
                            '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif',
                        fontSize: '14px',
                        verticalAlign: 'bottom',
                    }} >
                    <p>
                        {product.skuCode}
                    </p>

                </TableCell>

                <TableCell>
                    <Link to={`products/${product.id}`} className={classes.link}>
                        {product.name}
                    </Link>
                </TableCell>

                <TableCell style={{
                    fontFamily: '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif',
                    fontSize: '14px',
                }}>
                    {product.producer}
                </TableCell>



                <TableCell style={{
                    fontFamily:
                        '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif',
                    fontSize: '14px',
                    verticalAlign: 'bottom',
                }} >
                    {product.status ? <p className="text-primary">Đang giao dịch</p> : <p className="text-danger">Ngừng giao dịch</p>}
                </TableCell>
                <TableCell >
                    {
                        Number.parseFloat(product.price).toFixed(1)
                        .replace(/\d(?=(\d{3})+\.)/g, '$&,')
                        .replace('.0', '')
                    }
                </TableCell>
                <TableCell style={{
                    fontFamily:
                        '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif',
                    fontSize: '14px',
                    textAlign: 'center'
                }}>
                    {product.quantity}
                </TableCell>

                <TableCell style={{paddingLeft: '60px'}}>
                    <Link to={`products/${product.id}`} className={classes.link}>
                        <IconButton color="primary" style={{marginLeft:'-44px'}}>
                            <EditIcon />
                        </IconButton>
                    </Link>
                    <IconButton color="secondary" style={{marginLeft:'-18px', marginRight:'-30px'}}>
                        <DeleteIcon data-toggle="modal" data-target={"#doDeleteModalProduct_"+product.id} />
                    </IconButton>
                </TableCell>

                <div className="modal fade" id={"doDeleteModalProduct_"+product.id} tabIndex={-1} role="dialog" aria-labelledby="deleteVariantModalLabel" aria-hidden="true">
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
                                <button type="button" className="btn btn-danger" onClick={onDeleteProduct}>Xóa</button>
                            </div>
                        </div>
                    </div>
                </div>
            </TableRow>
    );
}

export default withStyles(styles)(ProductItem);
