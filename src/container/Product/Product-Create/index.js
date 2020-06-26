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
    withStyles, IconButton, Collapse
} from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import Alert from '@material-ui/lab/Alert';
import CloseIcon from '@material-ui/icons/Close';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import React, { useState, useEffect } from 'react';
import { NavLink, Link, Redirect } from 'react-router-dom';
import { toastError, toastSuccess } from '../../../helpers/toastHelper';
import styles from './styles';
import ProductAPI from '../../../apis/product'
import ViewModalImage from '../Modal/ViewModalImage';
import ListCategory from './ListCategory/ListCategory';


function ProductCreate(props) {

    const {classes} = props
    const initialProduct = {
        id: null,
        name: null,
        producer: '',
        description: '',
        color: '',
        quantity: Number,
        size: '',
        material: '',
        price: '',
        status: true,
        skuCode: '',
        reset: false
    }

    const [showDescription, setShowDescription] = useState(false)
    const [product, setProduct] = useState(initialProduct)
    const [category, setCategory] = useState({name: '', id: null})
    const [images, setImages] = useState([])
    const [previewImageUrls, setPreviewImageUrls] = useState([])
    const [addProductSuccess, setAddProductSuccess] = useState({ name: null, status: false })
    const [isRedirectS, setIsRedirect] = useState(false)

    useState(() => {

    }, [isRedirectS, category])

    const onChangeProduct = (event) => {
        event.persist();
        setProduct(product => ({ ...product, [event.target.name]: event.target.value }))
        console.log(product.status)
    }

    const onChangeImages = (event) => {
        let image = event.target.files[0]
        let reader = new FileReader();
        reader.onloadend = () => {
            setPreviewImageUrls([...previewImageUrls, reader.result])
            setImages([...images, { nameImage: image.name, base64Image: reader.result.split(',')[1] }])
        }
        reader.readAsDataURL(image)

    }

    const onDeletePreview = (e, index) => {
        e.preventDefault();
        let listImages = [...images]
        let listPreviewImageUrl = [...previewImageUrls]
        listImages.splice(index, 1);
        listPreviewImageUrl.splice(index, 1);
        setPreviewImageUrls(listPreviewImageUrl)
        setImages(listImages)

    }

    const onSubmitForm = (e) => {
        e.preventDefault();
        
        let productForm = {
            name: product.name,
            producer: product.producer,
            description: product.description,
            status: product.status,
            skuCode: product.skuCode,
            color: product.color,
            size: product.size,
            material: product.material,
            price: product.price,
            quantity: 0,
            category: (category.id == null && category.name == "") ? null : {id: category.id, name: category.name},
            base64Images: images
        }
        console.log("perfect: ", productForm)
        ProductAPI.postProduct(productForm)
            .then(res => {
                console.log(res.data);
                setProduct({...product, id: res.data.object})
                // setAddProductSuccess({ name: res.data.name, status: true })
                window.scrollTo(0, 0)
                toastSuccess('thêm sản phẩm mới thành công')
                setTimeout(() => window.location.reload(false), 1500)
            }).catch(error => {
                if(error.response.data != undefined){
                let listMessError = error.response.data.errors
                listMessError.map((mess) => toastError(mess))
                }
                
            })
    }

    const onChangeCategory = (nameCategory, idCategory)=>{
        setCategory({name: nameCategory, id: idCategory})
    }

    const onChangeCategoryName = (e) =>{
        setCategory({name: e.target.value, id: null})
    }


    return (
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
                            {' '}
                            Thêm mới sản phẩm
                        </h1>

                    </div>
                    {/* {
                        <Collapse in={addProductSuccess.status}>
                            <Alert className={classes.myAlert}
                                action={
                                    <IconButton
                                        aria-label="close"
                                        color="inherit"
                                        size="small"
                                        onClick={() => {
                                            setAddProductSuccess(false);
                                        }}
                                    >
                                        <CloseIcon fontSize="inherit" />
                                    </IconButton>
                                }
                            >
                                Sản phẩm <strong>{product.name}</strong> đã được tạo thành công!
                <span className="ml-3">
                                    <Button variant="outlined" color=""
                                        onClick={(e) => {
                                            e.preventDefault()
                                            setAddProductSuccess({ name: null, status: false })
                                            window.location.reload(false)
                                        }}>Tạo sản phẩm mới</Button></span>
                            </Alert>
                        </Collapse>

                    } */}
                </div>
            </header>
            <Grid container spacing={4}>
                <Grid item md={8} xs={12}>
                    <Card>
                        <CardContent>
                            <div className="tag">
                                <div className="form-group tag">
                                    <label htmlFor="tag">Tên sản phẩm<span style={{ color: 'red' }}>*</span></label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="name"
                                        name="name"
                                        value={product.name}
                                        placeholder="Nhập tên sản phẩm"
                                        onChange={onChangeProduct}
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className=" col-sm-6 col-lg-6 tag">
                                    <div className="form-group tag">
                                        <label htmlFor="tag">Mã sản phẩm / SKU</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="skuCode"
                                            name="skuCode"
                                            value={product.skuCode}
                                            onChange={onChangeProduct}
                                        />
                                    </div>
                                </div>
                                <div className="col-sm-6 col-lg-6">
                                    <div className="form-group tag">
                                        <label htmlFor="tag">Nhà sản xuất</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="producer"
                                            name="producer"
                                            value={product.producer}
                                            onChange={onChangeProduct} />
                                    </div>

                                </div>
                            </div>
                            {
                                !showDescription ? <div className="mt-0 mb-3 mx-3">
                                    <a className="text-primary addDecription" onClick={(e) => { setShowDescription(true) }}>Thêm mô tả</a>
                                </div>
                                    :
                                    <div className="my-3 mx-3">
                                        <a className="text-primary addDecription" onClick={(e) => { setShowDescription(false) }}>Đóng mô tả</a>
                                        <CKEditor editor={ClassicEditor}
                                            onChange={(e, editor) => { setProduct({ ...product, description: editor.getData() }) }}
                                            data={product.description}
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
                                                name="color"
                                                value={product.color}
                                                onChange={onChangeProduct} />
                                        </div>
                                    </div>
                                    <div className="col-sm-6 col-lg-6">
                                        <div className="form-group tag">
                                            <label htmlFor="tag">Kích thước</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="size"
                                                name="size"
                                                value={product.size}
                                                onChange={onChangeProduct}
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
                                                name="material"
                                                value={product.material}
                                                onChange={onChangeProduct}
                                            />
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
                                    <div className="col-sm-6 col-lg-6">
                                        <div className="form-group tag">
                                            <label htmlFor="tag">Giá nhập</label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                id="price"
                                                value={product.price}
                                                name="price" onChange={onChangeProduct}
                                            />
                                        </div>

                                        <div className="form-group tag">
                                            <label htmlFor="tag">Số lượng</label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                id="quantity"
                                                name="quantity"
                                                value={product.quantity}
                                                onChange={onChangeProduct}
                                            />
                                        </div>
                                    </div>

                                </div>



                            </div>
                        </CardContent>
                    </Card>
                </Grid>


                <Grid item md={4} xs={12}>
                    <Card>


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
                                onChange={onChangeCategoryName}
                                value={category.name}
                            />

                            <ListCategory onSelectCategory={onChangeCategory}/>

                        </CardContent>
                    </Card>

                    <Card className={classes.card}>
                        <CardContent>
                            <h6 style={{ display: 'inline' }}>Ảnh sản phẩm</h6>
                            <span className="float-right">
                                <div className="fileupload text-primary">
                                    <input type="file" onChange={onChangeImages} />
                     Thêm ảnh
                  </div>
                            </span>
                        </CardContent>
                        <CardContent>
                            {
                                previewImageUrls.length === 0 ? <img className="mb-3 fadeIn"
                                    width='100%' src="https://www.amerikickkansas.com/wp-content/uploads/2017/04/default-image.jpg"></img>
                                    : previewImageUrls.map((previewImageUrl, index) => {
                                        if (index === 0)
                                            return <div className="show-image">
                                                <img className="item-image" src={previewImageUrl} width='50%'></img>
                                                <button
                                                    onClick={(e) => onDeletePreview(e, index)} className="delete btn btn-warning">X</button>
                                            </div>
                                        else
                                            return <div className="show-image">
                                                <img className="item-image" src={previewImageUrl} width='30%'></img>
                                                <button
                                                    onClick={(e) => onDeletePreview(e, index)} className="delete btn btn-warning">X</button>
                                            </div>

                                    }
                                    )
                            }
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
            <div className={classes.addReceipt}>
                        <NavLink
                            to="/products"
                            style={{ textDecoration: 'none', float: 'right'}}
                            
                        >
                            <Button disableRipple variant="contained">Hủy</Button>
                        </NavLink>
            &nbsp; &nbsp; &nbsp;
            <Button
                        variant="contained" className="bg-primary text-white float-right mr-2"
                        disableRipple
                        onClick={onSubmitForm}
                    >
                        Lưu
            </Button>
            </div>
        </div>
    );
}

export default withStyles(styles)(ProductCreate);
