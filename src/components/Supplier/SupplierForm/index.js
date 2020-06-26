import React, { Component } from 'react';
import styles from './styles';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as supplierActions from '../../../action/supplier';
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
import { NavLink, Link } from 'react-router-dom';
// import Paper from '@material-ui/core/Paper';
// import TextField from '@material-ui/core/TextField';
// import ButtonGroup from '@material-ui/core/ButtonGroup';
// import { Link } from 'react-router-dom';
// import Input from '@material-ui/core/Input';
// import InputLabel from '@material-ui/core/InputLabel';

import { Container, Row, Col, Label } from 'reactstrap';
import { Input } from 'reactstrap';
import { toastError } from '../../../helpers/toastHelper';

class SupplierForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            supplier:
                { id: null, code: null, name: null, address: null, address2: null, email: null, phone: null, status: 'true', description: null, taxCode: null, website: null, },
            isDisable: false,
            invalid: {
                id: false, code: false, name: false, address: false, address2: false, email: false, phone: false, description: false, taxCode: false, website: false,
            },
            isEdited: {
                name: false, address: false,
            },
        };
    }

    handleOnChange = (event) => {
        const target = event.target;
        let { id, code, name, address, address2, email, phone, status, description, taxCode, website } = this.state.supplier;
        let _invalid = this.state.invalid;
        // let count = 0;
        //debugger
        switch (target.name) {
            case 'id': {
                id = target.value; break;
            }
            case 'name': {
                name = target.value;
                _invalid.name = !this.validateName(name);
                break;
            }
            case 'code': code = target.value; break;
            case 'address': {
                address = target.value;
                _invalid.address = !this.validateAddress(address);
                break;
            }
            case 'address2': address2 = target.value; break;
            case 'email': {
                email = target.value;
                _invalid.email = !this.validateEmail(email);
                break;
            }
            case 'phone': {
                phone = target.value;
                _invalid.phone = !this.validatePhone(phone);
                break;
            }
            case 'status': status = target.value; break;
            case 'description': description = target.value; break;
            case 'taxCode': taxCode = target.value; break;
            case 'website': {
                website = target.value;
                _invalid.website = !this.validateWebsite(website);
                break;
            }
        }
        //debugger
        this.setState({
            supplier: {
                id: id, code: code, name: name, address: address, address2: address2, email: email, phone: phone, status: status, description: description, taxCode: taxCode, website: website,
            },
            invalid: _invalid,
            //isEdited: true,
        });
    }

    validateName = (name) => {
        return name != null && name.length != 0;
    }

    validatePhone = (phone) => {
        const reg = /^\d{10,}$/;
        return (phone == null) || (phone.length == 0) || (reg.test(phone));
    }

    validateEmail = (email) => {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return (email == null) || (email.length == 0) || (re.test(String(email).toLowerCase()));
    }

    validateAddress = (address) => {
        return address != null && address.length != 0;
    }

    validateWebsite = (website) => {
        if (website == null || website.length == 0) return true;
        var res = website.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
        return res != null;
    }

    invalidNotification = (isEditAvailable) => {
        const _invalid = this.state.invalid;
        let invalid = false;
        let name, address = false;
        debugger
        if (!isEditAvailable && this.state.supplier.name == null && this.state.supplier.address == null) {
            //toastError('Tên nhà cung cấp không được để trống');
            // toastError('Địa chỉ không được để trống');
            this.setState({
                invalid: { name: true, address: true }
            });
            name = address = true;
            invalid = true;
        }
        else if (!isEditAvailable && this.state.supplier.address == null) {
            //toastError('Địa chỉ không được để trống');
            this.setState({
                invalid: { address: true, }
            });
            address = true;
            invalid = true;
        }
        else if (!isEditAvailable && this.state.supplier.name == null) {
            //toastError('Tên nhà cung cấp không được để trống');
            this.setState({
                invalid: { name: true, }
            });
            name = true;
            invalid = true;
        }
        if (_invalid.name || name) {
            toastError('Tên nhà cung cấp không được để trống');
            invalid = true;
        }
        if (_invalid.address || address) {
            toastError('Địa chỉ không được để trống');
            invalid = true;
        }
        if (_invalid.phone) {
            toastError('Số điện thoại không hợp lệ');
            invalid = true;
        }
        if (_invalid.email) {
            toastError('Email không hợp lệ');
            invalid = true;
        }

        if (_invalid.website) {
            toastError('website không hợp lệ');
            invalid = true;
        }
        return invalid;
    }

    handleOnclickSave = (isEditAvailable) => {
        const { supplier } = this.state;
        const { supplierActionsCreators } = this.props;
        const { addSupplier, updateSupplier } = supplierActionsCreators;
        //debugger
        if (this.invalidNotification(isEditAvailable)) {
            return;
        }
        if (isEditAvailable) {
            updateSupplier(supplier, supplier.id);
        }
        else {
            addSupplier(supplier);
        }
    }

    // componentDidUpdate() {
    //     console.log(this.state.supplier);
    // }

    componentDidMount() {
        if (this.props.location.state.supplier != undefined) {
            this.setState({ supplier: this.props.location.state.supplier });
        }
    }

    render() {
        const { classes, location, } = this.props;
        const { isEditAvailable } = location.state;
        const { items } = this.props.location;
        //debugger
        const { supplier, isDisable, invalid } = this.state;
        return (
            <div className={classes.root}>
                <header className="ui-title-bar-container title-product1 title-product-top">
                    <div className="ui-title-bar" style={{ marginTop: '-16px' }}>
                        <div className="ui-title-bar__navigation">
                            <div className="ui-breadcrumbs">
                                <Link to={{ pathname: "/suppliers", items: items }} className={classes.a}>
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
                                        Quay lại danh sách nhà cung cấp{' '}
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
                                }}>
                                {isEditAvailable ? `Cập nhật nhà cung cấp ${supplier.name}` : ' Thêm mới nhà cung cấp'}
                            </h1>
                        </div>
                    </div>
                </header>
                <Grid container spacing={4}>
                    <Grid item md={8} xs={12}>
                        <Card>
                            <CardHeader
                                title="Thông Tin Chính"
                                className={classes.header}
                            />
                            <Divider />
                            <CardContent>
                                <Label>Tên nhà cung cấp <span style={{ color: 'red' }}>*</span></Label>
                                <Input invalid={invalid.name} value={supplier.name} name="name" onChange={this.handleOnChange} disabled={isDisable} />
                                <br />
                                <Row>
                                    <Col>
                                        <Label>Mã nhà cung cấp</Label>
                                        <Input value={supplier.code} name="code" onChange={this.handleOnChange} disabled={isDisable} />
                                    </Col >
                                    <Col>
                                        <Label>Số điện thoại</Label>
                                        <Input invalid={invalid.phone} value={supplier.phone} name="phone" onChange={this.handleOnChange} disabled={isDisable} />
                                    </Col>
                                </Row>
                                <br />
                                <Row>
                                    <Col>
                                        <Label>Email</Label>
                                        <Input invalid={invalid.email} value={supplier.email} name="email" onChange={this.handleOnChange} disabled={isDisable} type='url' />
                                    </Col>
                                </Row>

                                {/* <AddProduct setPurchaseProducts={this.setPurchaseProducts} /> */}
                            </CardContent>
                        </Card>

                        <Card className={classes.card}>
                            <CardHeader
                                title="Thông Tin Địa Chỉ"
                                className={classes.header}
                            />
                            <Divider />
                            <CardContent>
                                <Row>
                                    <Col>
                                        <Label>Địa chỉ <span style={{ color: 'red' }}>*</span></Label>
                                        <Input invalid={invalid.address} value={supplier.address} name="address" onChange={this.handleOnChange} disabled={isDisable} />
                                    </Col>
                                    <Col>
                                        <Label>Địa chỉ 2</Label>
                                        <Input value={supplier.address2} name="address2" onChange={this.handleOnChange} disabled={isDisable} />
                                    </Col>
                                </Row>

                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item md={4} xs={12}>
                        <Card >
                            <CardHeader
                                title="Thông Tin Bổ Sung"
                                className={classes.header}
                            />
                            <Divider />
                            <CardContent>
                                <Row>
                                    <Col>
                                        <Label>Mã số thuế</Label>
                                        <Input value={supplier.taxCode} name="taxCode" onChange={this.handleOnChange} disabled={isDisable} />
                                    </Col>
                                </Row>
                                <br />
                                <Row>
                                    <Col>
                                        <Label>Website</Label>
                                        <Input invalid={invalid.website} value={supplier.website} name="website" onChange={this.handleOnChange} disabled={isDisable} />
                                    </Col>
                                </Row>
                                <br />

                                {isEditAvailable ? <Row>
                                    <Col>
                                        <Label>Trạng thái nhà cung cấp</Label>
                                        <Input value={supplier.status} onChange={this.handleOnChange} disabled={isDisable} name="status" type="select">
                                            <option value='true' name='true'>Đang giao dịch</option>
                                            <option value='false' name='false'>Ngừng giao dịch</option>
                                        </Input>
                                    </Col>
                                </Row> : ''}
                            </CardContent>
                        </Card>

                        <Card className={classes.card}>
                            <CardHeader
                                title="Thông tin khác"
                                className={classes.header}
                            />
                            <Divider />
                            <CardContent>
                                <Label>Mô tả</Label>
                                <Input value={supplier.description} name="description" style={{ height: '70%' }} onChange={this.handleOnChange} disabled={isDisable} type="textarea" />
                                {/* <AddSupplier setSupplier={this.setSupplier} /> */}
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
                <div className={classes.addReceipt}>
                    <NavLink to="/suppliers">
                        <Button style={{ textDecoration: 'none' }} variant="contained" className={classes.Button}>
                            Hủy
                        </Button>
                    </NavLink>
                    <Button
                        className={classes.button}
                        disableRipple
                        onClick={() => { this.handleOnclickSave(isEditAvailable) }}>
                        Lưu
                    </Button>
                    &nbsp; &nbsp; &nbsp;
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {

    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        supplierActionsCreators: bindActionCreators(supplierActions, dispatch),
    };
};

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(SupplierForm));