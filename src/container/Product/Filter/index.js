import {
    withStyles,
    Button,
    TableCell,
} from '@material-ui/core';
import {
   
    InputGroup,
    Input,
    Label,
  } from 'reactstrap';
import SearchIcon from '@material-ui/icons/Search';
import React, { useState, useEffect } from 'react';
import styles from './styles';

import {
    InputGroupText,
} from 'reactstrap';


function Filter({ classes, onFilter }) {

    const initialFilterProduct = {
        name: null,
        producer: null,
        skuCode: null,
        status: null,
    }

    const [filterProduct, setFilterProduct] = useState(initialFilterProduct)

    const onChangeFilterProduct = (e) => {
        setFilterProduct({ ...filterProduct, [e.target.name]: e.target.value })
    }

    const onClickFilter = (e) => {
        e.preventDefault()
        onFilter(
            filterProduct.name,
            filterProduct.skuCode,
            filterProduct.status,
            filterProduct.producer);
    }

    return (
        <div className="mb-4">
            <div className={classes.row}>
            <div style={{ float: '' }}>
                <div style={{ height: 57 }}>
                    <div className={classes.cell} style={{ marginBottom: '-20px' }}>
                        <InputGroup
                            style={{
                                marginLeft: '16px',
                                width: '180px',
                                float: 'left',
                                marginTop: '16px',
                            }}>
                            <Input
                                placeholder="Nhập mã sản phẩm..."
                                style={{
                                    fontFamily:
                                        '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif',
                                    fontSize: '16px',
                                    fontWeight: '400',
                                    height: 38,
                                }}
                                onChange={onChangeFilterProduct}
                                name="skuCode"
                            />
                        </InputGroup>
                        <div style={{}}>
                            <TableCell className={classes.cell} >
                                <Input
                                    placeholder="Nhập tên sản phẩm..."
                                    style={{
                                        fontFamily:
                                            '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif',
                                        fontSize: '16px',
                                        fontWeight: '400',
                                        height: 38,
                                    }}
                                    onChange={onChangeFilterProduct}
                                    name="name"
                                    
                                />
                            </TableCell>
                            <TableCell
                                style={{ textAlign: 'center' }}
                                className={classes.cell}
                            >
                                <input type="text" name="producer" onChange={onChangeFilterProduct}
                        className="form-control"
                        placeholder="Nhập thương hiệu..."
                        style={{ width: '170px' }} />
                            </TableCell>
                            <TableCell className={classes.cell}>
                                <div style={{ display: 'flex' }}>
                                <select className="form-control" name="status" onChange={onChangeFilterProduct}>
                        <option value={0}>Tất cả</option>
                        <option value={1}>Đang giao dịch</option>
                        <option value={-1}>Ngừng giao dịch</option>
                    </select>
                                    <InputGroupText
                                        style={{ marginLeft: 29 }}
                                        onClick={onClickFilter}
                                    >
                                        <SearchIcon className={classes.icon} />
                                        <span
                                            style={{
                                                fontFamily:
                                                    '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif',
                                                fontSize: '14px',
                                                fontWeight: '400',
                                                textTransform: 'none',
                                            }}
                                        >
                                            Tìm kiếm
              </span>
                                    </InputGroupText>
                                </div>
                            </TableCell>
                            <TableCell className={classes.cell}>
                            </TableCell>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        </div>

        
    )
}


export default withStyles(styles)(Filter)