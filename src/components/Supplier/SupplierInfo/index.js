import React, { Component } from 'react';
import { Container, Row, Col, Label } from 'reactstrap';
import { withStyles } from '@material-ui/core';
import styles from './styles';
import { Badge } from 'reactstrap';
import ListReceipt from '../../Receipt/ReceiptList/index';
import { Link } from 'react-router-dom';
import {
    Button,
    Card,
    CardContent,
    CardHeader,
    Divider,
    Grid,
} from '@material-ui/core';

class SupplierInfo extends Component {
    constructor(props) {
        super(props);
    }

    renderPersonalInfo = (supplier, classes) => {
        return (
            <div>
                <Grid container spacing={4}>
                    <Grid item md={12} xs={12}>
                        <Card>
                            <Row>
                                <Col>
                                    <CardHeader
                                        title="Thông Tin Cá Nhân"
                                        className={classes.header}
                                    />
                                </Col>
                                <Col style={{ lineHeight: '59px' }}>
                                    {supplier.status == 'false' ? <Badge color="secondary">Ngừng giao dịch</Badge> : <Badge color="primary">Đang giao dịch</Badge>}
                                </Col>
                            </Row>
                            <Divider />
                            <CardContent>
                                <div>
                                    <Row xs="12">
                                        <Col className={classes.field}>
                                            <Label className={classes.label}>Mã nhà cung cấp</Label>
                                            <div className={classes.div}>: {supplier.code == null || supplier.code == '' ? '---' : supplier.code}</div>
                                        </Col>
                                        <Col className={classes.field}>
                                            <Label className={classes.label}>Mã số thuế</Label>
                                            <div className={classes.div}>: {supplier.taxCode == null || supplier.taxCode == '' ? '---' : supplier.taxCode}</div>
                                        </Col>
                                        <Col className={classes.field}>
                                            <Label className={classes.label}>Mô tả</Label>
                                            <div className={classes.div}>: {supplier.description == null || supplier.description == '' ? '---' : supplier.description}</div>
                                        </Col>
                                    </Row>

                                    <Row xs="12">
                                        <Col className={classes.field}>
                                            <Label className={classes.label}>Tên nhà cung cấp</Label>
                                            <div className={classes.div}>: {supplier.name}</div>
                                        </Col>
                                        <Col className={classes.field}>
                                            <Label className={classes.label}>Website</Label>
                                            <div className={classes.div}>: {supplier.website == null || supplier.website == '' ? '---' : supplier.website}</div>
                                        </Col>
                                        <Col className={classes.field}>
                                            <Label className={classes.label}></Label>
                                            <div className={classes.div}>{}</div>
                                        </Col>
                                    </Row>

                                    <Row xs="12">
                                        <Col className={classes.field}>
                                            <Label className={classes.label}>Số điện thoại</Label>
                                            <div className={classes.div}>: {supplier.phone == null || supplier.phone == '' ? '---' : supplier.phone}</div>
                                        </Col>
                                        <Col className={classes.field}>
                                            <Label className={classes.label}>Địa chỉ</Label>
                                            <div className={classes.div}>: {supplier.address}</div>
                                        </Col>
                                        <Col className={classes.field}>
                                            <Label className={classes.label}></Label>
                                            <div className={classes.div}>{}</div>
                                        </Col>
                                    </Row>
                                    <Row xs="12">
                                        <Col className={classes.field}>
                                            <Label className={classes.label}>Email</Label>
                                            <div className={classes.div}>: {supplier.email == null || supplier.email == '' ? '---' : supplier.email}</div>
                                        </Col>
                                        <Col className={classes.field}>
                                            <Label className={classes.label}>Địa chỉ 2</Label>
                                            <div className={classes.div}>: {supplier.address2 == null || supplier.address2 == '' ? '---' : supplier.address2}</div>
                                        </Col>
                                        <Col className={classes.field}>
                                            <Label className={classes.label}></Label>
                                            <div className={classes.div}>{}</div>
                                        </Col>
                                    </Row>
                                </div>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </div>
        );
    }

    renderListReceipt = (receipts, classes) => {
        if (receipts == undefined || receipts == null) receipts = [];
        return (
            <div className={classes.card}>
                <ListReceipt receipts={receipts} />
            </div>
        );
    }

    render() {
        const { classes } = this.props;
        console.log(this.props.location.state);
        const { supplier } = this.props.location.state;
        const receipts = supplier.receiptDTOS;
        return (
            <div className={classes.root}>
                <header className="ui-title-bar-container title-product1 title-product-top">
                    <div className="ui-title-bar" style={{ marginTop: '-16px' }}>
                        <div className="ui-title-bar__navigation">
                            <div className="ui-breadcrumbs">
                                <Link to="/suppliers" className={classes.a}>
                                    <i className="fas fa-chevron-left"
                                        style={{
                                            fill: '#637381',
                                            width: '20px',
                                            height: '20px',
                                            position: 'relative',
                                            top: '0px',
                                            left: '-5px',
                                            color: '#637381',
                                        }}/>
                                    <span
                                        className="ui-breadcrumb__item"
                                        style={{
                                            color: '#637381',
                                            fontSize: '15px',
                                            position: 'relative',
                                            left: '-7px',
                                        }}>
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
                                {' '}
                                {`${supplier.name}`}
                            </h1>
                        </div>
                    </div>
                </header>
                {this.renderPersonalInfo(supplier, classes)}
                {this.renderListReceipt(receipts, classes)}
            </div>
        );
    }

}

export default withStyles(styles)(SupplierInfo);
