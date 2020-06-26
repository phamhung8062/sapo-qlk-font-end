/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable prefer-destructuring */
/* eslint-disable prefer-const */
/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-unused-state */
import { withStyles, Box, Button, Paper, styled, Collapse, IconButton } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

import React, { useState, useEffect } from 'react';
import styles from './styles';
import ProductAPI from '../../../apis/product';
import Pagination from 'react-js-pagination';
import Filter from '../Filter/index'
import { Link } from 'react-router-dom';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
} from 'reactstrap';
import ProductList from './ProductList';
function ListProducts(props) {
  const { classes } = props;

  const [paging, setPaging] = useState({ currentPage: 1, size: 5, totalItems: null, totalPages: null })
  const [listProduct, setListProduct] = useState([])
  const [filterP, setFilterP] = useState({ name: null, skuCode: null, producer: null, status: 0 })


  useEffect(() => {
    rechieveProductFilter(filterP)
  }, [filterP, paging.currentPage, paging.size])


  const rechieveProductFilter = (filterProduct) => {
    ProductAPI.getListProductFilter(
      filterProduct,
      paging.currentPage,
      paging.size,
    )
      .then((res) => {
        console.log('filter rechieve: ', res.data);
        setListProduct(res.data.products);
        setPaging({
          ...paging,
          totalPages: res.data.totalPages,
          totalItems: res.data.totalItems,
        });
      })
      .catch((err) => {
        console.log(err)
      });
  };

  const handlePageChange = (pageCurrent) => {
    setPaging({ ...paging, currentPage: pageCurrent });
  };

  const onFilter = (name, skuCode, status, producer) => {
    setFilterP({ name: name, skuCode: skuCode, status: status, producer: producer })
  }



  return (
    <div className={classes.root}>
      {/* // Titile */}

      {/* // Loc */}
      <div className={classes.row}>
        <div style={{ marginBottom: '12px' }}>
          <h1
            style={{
              fontSize: '24px',
              lineHeight: '3.4rem',
              fontWeight: '600',
              color: '#212B35',
              fontFamily:
                'apple-system,BlinkMacSystemFont,San Francisco,Segoe UI,Roboto,Helvetica Neue,sans-serif',
            }}
          >
            {' '}
          Danh sách sản phẩm
        </h1>



        </div>
      </div>
      <div style={{ float: 'right', marginTop: '-38px' }}>
        <Button variant="contained" className={classes.button}>
          <Link
            to="/products/create"
            style={{
              textDecoration: 'none',
              color: '#f8f9fa',
              fontFamily:
                '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif',
            }}
          >
            Thêm sản phẩm
          </Link>
        </Button>
      </div>

      {/* list sản phẩm */}
      <div className={classes.content}>

        <Filter onFilter={onFilter} />

        <ProductList products={listProduct} />
      </div>

      {/* phân trang */}
      <div className="d-flex justify-content-between mt-3 align-items-start ">
        <div className="d-flex justify-content-center align-items-center">
          <span className="d-block">Hiển thị tối đa </span>

          <select
            className="form-control form-control-sm ml-3 mr-3"
            style={{ width: 'auto' }} name="size"
            onChange={(e) => { setPaging({ ...paging, size: e.target.value }) }}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={30}>30</option>
          </select>
          <span className="d-block">
            trên tổng số {paging.totalItems} kết quả.
            </span>

        </div>
        <Pagination
          activePage={paging.currentPage}
          itemsCountPerPage={paging.size} // size số bản ghi 1 trang
          totalItemsCount={paging.totalItems} // tổng số bản ghi
          pageRangeDisplayed={5} // số nút hiển thị
          onChange={handlePageChange}
          onClick
          itemClass={'page-item'}
          linkClass={'page-link'}
        />
      </div>
    </div>
  );
}

export default withStyles(styles)(ListProducts);
