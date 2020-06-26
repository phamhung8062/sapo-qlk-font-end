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
import DeleteIcon from '@material-ui/icons/Delete';
import VisibilityIcon from '@material-ui/icons/Visibility'
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import React, { useState, useEffect } from 'react';
import { NavLink, Link, Redirect } from 'react-router-dom';
import { toastError, toastSuccess } from '../../../helpers/toastHelper';
import styles from './styles';
import { Col, FormGroup, Label, Input } from 'reactstrap';
import ProductAPI from '../../../apis/product'
import ImageAPI from '../../../apis/image'
import CategoryAPI from '../../../apis/category'
import { wait } from '@testing-library/react';
import ViewModalImage from '../Modal/ViewModalImage';
import ChangeImageModal from '../Modal/ChangeImageModal';
import ListCategory from '../../Product/Product-Create/ListCategory/ListCategory'
import HistoryRepository from './HistoryRepository';


function ProductDetail(props) {
    const { classes } = props

    const initialProduct = {
        name: null,
        producer: '',
        description: '',
        color: '',
        size: '',
        material: '',
        quantity: null,
        price: '',
        status: true,
        skuCode: '',
        receiptProducts: []
    }

    const [showDescription, setShowDescription] = useState(false)
    const [product, setProduct] = useState(initialProduct)
    const [imageList, setImageList] = useState([])
    const [imageNeedToDelete, setImageNeedToDelete] = useState(null)
    const [imageActive, setImageActive] = useState(null)
    const [isRedirect, setIsRedirect] = useState(false)
    const [productReceipt, setProductReceipt] = useState([])
    const [category, setCategory] = useState({ name: '', id: null })
    const [editPrice, setEditPrice] = useState(false)

    useEffect(() => {
        getProductDetail(props.match.params.id)
        getImageActive()
    }, imageActive)



    const onChangeProduct = (event) => {
        event.persist();
        setProduct(product => ({ ...product, [event.target.name]: event.target.value }))
        console.log(product.status)
    }

    const getProductDetail = (idProduct) => {
        ProductAPI.getOneProduct(idProduct)
            .then(response => {
                let data = response.data
                console.log("helo: ", data)
                setImageList(data.images)
                setProduct(data)
                setCategory({ name: data.category.name, id: data.category.id })
            }).catch(error => {
                console.log("err này: ", error)
            })
    }

    const onAddImage = (event) => {
        event.preventDefault()
        let image = event.target.files[0]
        let reader = new FileReader()
        let imageUpload = null

        reader.onloadend = () => {
            imageUpload = { nameImage: image.name, base64Image: reader.result.split(',')[1] }
            ImageAPI.addImage(product.id, imageUpload).
                then(res => {
                    console.log(res.data)
                    console.log(imageList)
                    setImageList((imageList) => [...imageList, res.data]);
                }).catch(err => {
                    alert('có lỗi.. thử lại sau!!!  ', err);
                })
        }
        reader.readAsDataURL(image)


    }

    const onDeleteImage = (e, imageId) => {
        e.preventDefault();
        ImageAPI.deleteImage(product.id, imageId)
            .then(res => {
                window.location.reload(false);
            }).catch(err => {
                alert('có lỗi xảy ra.. thử lại sau!!!', err);
            })
    }

    const onDeleteProduct = (e) => {
        e.preventDefault()
        ProductAPI.deleteProduct(product.id)
            .then(res => {
                toastSuccess('xóa sản phẩm thành công')
                setTimeout(() => {
                    setIsRedirect(true)
                    window.location.reload(false);
                }, 1000)

            })
            .catch(error => {
                console.log("error nè: ", error.response.data)
                let listMessError = error.response.data.errors
                listMessError.map((mess) => toastError(mess))
            })
    }


    const onSubmitUpdateProduct = (e) => {
        e.preventDefault();
        let productForm = {
            name: product.name === "" ? null : product.name,
            producer: product.producer,
            description: product.description,
            status: product.status,
            skuCode: product.skuCode,
            quantity: product.quantity,
            color: product.color,
            size: product.size,
            material: product.material,
            price: product.price == null ? '' : product.price
        }
        console.log("what: ", productForm)
        ProductAPI.updateProduct(product.id, productForm)
            .then(res => {
                toastSuccess('Cập nhật thành công')
                window.scrollTo(0, 0)
            }).catch(error => {
                console.log("error nè: ", error.response.data)
                let listMessError = error.response.data.errors
                listMessError.map((mess) => toastError(mess))
            })
    }


    const getImageActive = () => {
        let imgActive = [];
        console.log(product.images)
        imgActive = product.images == null ? null
            : product.images.filter(image => image.active == true)

        if (imgActive != null) setImageActive(imgActive[0]);
    }

    const onChangeCategory = (nameCategory, idCategory) => {
        setCategory({ name: nameCategory, id: idCategory })
        CategoryAPI.changeCategoryInProduct(idCategory, product.id)
            .then(res => {
                toastSuccess('đã thay đổi thể loại của sản phẩm')

            }).catch(err => {
                console.log("lỗi này đù má: ", err)
            })
    }



    return (
        isRedirect ? <Redirect to={`/products`} /> :
            <div className={classes.root}>
                <header className="ui-title-bar-container title-product1 title-product-top">
                    <div className="ui-title-bar" style={{ marginTop: '-16px' }}>
                        <div className="ui-title-bar__navigation">
                            <div className="ui-breadcrumbs">
                                <Link to="/products" className={classes.a}>
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
                                        Quay lại danh sách sản phẩm{' '}
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
                                {product.name}
                            </h1>
                        </div>
                    </div>
                </header>
                <Grid container spacing={4}>
                    <Grid item md={8} xs={12}>
                        <Card>
                            <CardContent>
                                <div className="tag">

                                </div>
                                <div className="row">
                                    <div className=" col-sm-8 col-lg-8 tag">
                                        <div className="form-group tag">
                                            <label htmlFor="tag">Tên sản phẩm<span style={{ color: 'red' }}>*</span></label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="name"
                                                name="name" value={product.name}
                                                placeholder="Nhập tên sản phẩm"
                                                onChange={onChangeProduct}
                                            />
                                        </div>
                                        <div className="form-group tag">
                                            <label htmlFor="tag">Mã sản phẩm / SKU</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="skuCode"
                                                name="skuCode" value={product.skuCode}
                                                onChange={onChangeProduct} />
                                        </div>
                                        <div className="form-group tag">
                                            <label htmlFor="tag">Nhà sản xuất</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="producer"
                                                name="producer" value={product.producer}
                                                onChange={onChangeProduct} />
                                        </div>
                                    </div>
                                    <div className="col-sm-4 col-lg-4">
                                        {
                                            imageActive == null ? <img className={classes.myImage} src="https://vinatex.com.vn/wp-content/themes/vinatex/assets/images/default-thumbnail.png"></img>
                                                : <img className={classes.myImage}
                                                    src={"/image/" + imageActive.path}></img>
                                        }
                                        <p className="changeImage" data-toggle="modal" data-target="#changeImageModal">Thay đổi ảnh chính</p>
                                        <ChangeImageModal imageList={product.images} productId={product.id} />
                                    </div>
                                </div>
                                {
                                    !showDescription ? <div className="mt-0 mb-3 mx-3">
                                        <a className="text-primary addDecription" onClick={(e) => { setShowDescription(true) }}>Thêm mô tả</a>
                                    </div>
                                        :
                                        <div className="my-3 mx-3">
                                            <a className="text-primary addDecription" onClick={(e) => { setShowDescription(false) }}>Đóng mô tả</a>
                                            <CKEditor
                                                editor={ClassicEditor}
                                                data={product.description}
                                                config={{ minHeight: '100px', width: '780px' }}
                                                onChange={(e, editor) => { setProduct({ ...product, description: editor.getData() }) }}
                                            />
                                        </div>
                                }


                            </CardContent>
                        </Card>
                        <Card className={classes.card}>
                            <Divider />
                            <CardHeader
                                title="Chi tiết sản phẩm"
                                style={{ fontSize: '10px' }}
                            />
                            <CardContent>
                                <div>
                                    <div className="row">
                                        <div className=" col-sm-6 col-lg-6 tag">
                                            <div className="form-group tag">
                                                <label htmlFor="tag">Màu sắc</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="color"
                                                    name="color" value={product.color}
                                                    onChange={onChangeProduct} />
                                            </div>
                                        </div>
                                        <div className="col-sm-6 col-lg-6">
                                            <div className="form-group tag">
                                                <label htmlFor="tag">Kích thước</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="size" value={product.size}
                                                    name="size" onChange={onChangeProduct}
                                                />
                                            </div>

                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className=" col-sm-6 col-lg-6 tag">
                                            <div className="form-group tag">
                                                <label htmlFor="tag">Chất liệu</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="material"
                                                    name="material" value={product.material}
                                                    onChange={onChangeProduct}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-sm-6 col-lg-6">
                                            <div className="form-group tag mt-4">
                                                <div>
                                                <label htmlFor="tag">Giá nhập </label>
                                                
                                                {
                                                    editPrice ? 
                                                    <input
                                                        type="number"
                                                        className="form-control"
                                                        id="price" value={product.price}
                                                        name="price" 
                                                        autoComplete="off"
                                                        onChange={onChangeProduct}
                                                    /> :
                                                        <strong className="float-right">
                                                            {
                                                            Number.parseFloat(product.price).toFixed(1)
                                                                                                .replace(/\d(?=(\d{3})+\.)/g, '$&,')
                                                                                                .replace('.0', '') } đ
                                                       </strong>

                                                }
                                                </div>
                                                {
                                                    editPrice ?
                                                     <p className="priceEdit float-right mt-1" onClick={() => setEditPrice(false)}>Xong</p>
                                                      :
                                                      <p className="priceEdit float-right" onClick={() => setEditPrice(true)}>Chỉnh sửa</p>
                                                }
                                            </div>
                                        </div>
                                    </div>

                                    <Checkbox
                                        checked={product.status}
                                        name="status"
                                        color="primary"
                                        value={product.status}
                                        onClick={(e) => setProduct({ ...product, status: !product.status })}
                                        inputProps={{ 'aria-label': 'primary checkbox' }}
                                    /><span>Cho phép bán</span>
                                </div>
                            </CardContent>
                        </Card>
                    </Grid>


                    <Grid item md={4} xs={12}>
                        <Card >
                            <CardContent>
                                <h5 className="mt-2 ml-2" style={{ display: 'inline' }}>Thể loại</h5>
                                <span className="float-right">
                                    <div className="fileupload text-primary" id="addCategory" data-toggle="modal" data-target="#doAddCategoryModal">
                                        Thêm thể loại
                                    </div>
                                </span>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="PopoverLegacy"
                                    name="category"
                                    autocomplete="off"
                                    value={category.name}
                                />
                                <ListCategory onSelectCategory={onChangeCategory} />
                            </CardContent>
                        </Card>
                        <Card className={classes.card}>
                            <CardContent>
                                <h6 style={{ display: 'inline' }}>Tất cả ảnh</h6>
                                <span className="float-right">
                                    <div className="fileupload text-primary">
                                        <input type="file" onChange={onAddImage} />
                                    Thêm ảnh
                                    </div>
                                </span>
                            </CardContent>
                            <Divider />
                            <CardContent>
                                {
                                    imageList && imageList.map((image, index) => {
                                        return <div className="show-image">
                                            <img className="item-image" src={'/image/' + image.path}></img>
                                            <button data-toggle="modal" data-target="#doDeleteModalImage"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    setImageNeedToDelete(image)
                                                }} className="delete btn"><DeleteIcon />
                                            </button>
                                            <button data-toggle="modal" data-target={"#imageDetail_" + index}
                                                className="visibility btn"><VisibilityIcon />
                                            </button>
                                            <ViewModalImage imagePath={"/image/" + image.path} viewId={"imageDetail_" + index} />
                                        </div>
                                    }
                                    )
                                }
                            </CardContent>
                        </Card>

                    </Grid>
                </Grid>

                <Grid>
                    <Card className={classes.card}>
                        <CardContent>
                            <h6 style={{ display: 'inline' }}>Tồn kho</h6>
                            <span>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="price" value={product.quantity}
                                    name="price" onChange={null}
                                />
                            </span>

                        </CardContent>
                        <CardContent>
                            <h6 style={{ display: 'inline' }}>Lịch sử</h6>
                            <hr />
                        </CardContent>
                        <HistoryRepository receiptProducts={product.receiptProducts} />
                    </Card>

                </Grid>

                <div className={classes.addReceipt}>
                    <Button data-toggle="modal" data-target="#doDeleteModalProduct" variant="contained" color="secondary">Xóa sản phẩm này</Button>
                    <NavLink
                        to="/products"
                        style={{ textDecoration: 'none', float: 'right' }}

                    >
                        <Button disableRipple variant="contained">Hủy</Button>
                    </NavLink>
            &nbsp; &nbsp; &nbsp;
            <Button
                        variant="contained" className="bg-primary text-white float-right mr-2"
                        disableRipple
                        onClick={onSubmitUpdateProduct}
                    >
                        Lưu
            </Button>
                </div>

                <div className="modal fade" id="doDeleteModalImage" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Xóa ảnh</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <strong>Ảnh này sẽ bị xóa, Bạn có chắc chắn không?</strong>
                            </div>
                            <div className="modal-footer">
                                <Button onClick={(e) => onDeleteImage(e, imageNeedToDelete.id)} variant="contained" color="secondary">Xóa</Button>
                            </div>
                        </div>
                    </div>
                </div>


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
                                <button type="button" className="btn btn-danger" onClick={onDeleteProduct}>Xóa</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    );
}

export default withStyles(styles)(ProductDetail);
