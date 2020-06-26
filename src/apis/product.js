import http from './common';

const getListProduct = (pageCurrent, size) => {
  return http.get(`/products?page=${pageCurrent}&size=${size}`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

const getListProductFilter = (filter, pageCurrent, size) => {
  let url = `/products?`;

  if(filter.name != '' && filter.name != null )
    url += `name=${filter.name}&`

  if(filter.skuCode != '' && filter.skuCode != null)
    url += `skuCode=${filter.skuCode}&`

  if(filter.producer != '' && filter.producer != null)
    url += `producer=${filter.producer}&`

  if(filter.status == 0){
    console.log("what up:___ status = 0")
    return http.get(
      url + `page=${pageCurrent}&size=${size}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  }
  else{
    let status = filter.status == 1 ? true : false
    return http.get(
      url + `status=${status}&page=${pageCurrent}&size=${size}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  }
  
};

const getOneProduct = (productId) => {
  return http.get(`products/${productId}`);
};

const changeStatusProduct = (productId, status) => {
  return http.put(`products/${productId}/status/${status}`);
};

const deleteProduct = (productId) => {
  return http.delete(`products/${productId}`);
};


const postProduct = (data) => {
  return http.post(`products/`, data, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

const updateProduct = (idProduct, data) => {
  return http.put(`products/${idProduct}`, data, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export default {
  getListProduct,
  getOneProduct,
  changeStatusProduct,
  deleteProduct,
  postProduct,
  updateProduct,
  getListProductFilter,
};
