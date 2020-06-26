import axiosService from '../commons/axoisService';
import qs from 'query-string';
import { API_ENDPOINT_SUPPLIER } from '../constants/index';
const url = 'admin';
export const getListSupplierByPageAndSize = (page, limit) => {
  // let queryParam = '';

  // console.log('pa', params);
  // if (Object.keys(params).length > 0) {
  //   queryParam = `?${qs.stringify(params)}`;
  // }
  const pages = page;
  const sizes = limit;
  return axiosService.get(
    `${API_ENDPOINT_SUPPLIER}/suppliers?page=${pages}&pageSize=${sizes}`,
  );
};
export const addSupplier = (data) => {
  return axiosService.post(`${API_ENDPOINT_SUPPLIER}/suppliers`, data);
};
export const updateSupplier = (id, data) => {
  return axiosService.put(`${API_ENDPOINT_SUPPLIER}/suppliers/${id}`, data);
};
export const deleteSupplier = (id) => {
  return axiosService.delete(`${API_ENDPOINT_SUPPLIER}/suppliers/${id}`);
};
export const getAllListSupplier = () => {
  return axiosService.get(`${API_ENDPOINT_SUPPLIER}/suppliers`);
  return axiosService.get(
    `${API_ENDPOINT_SUPPLIER}/suppliers`,
  );
};

export const getListSupplierByPageSize = (page, size) => {
  return axiosService.get(
    `${API_ENDPOINT_SUPPLIER}/suppliers/page/${page}/size/${size}`,
  );
};

export const getTotalItem = () => {
  return axiosService.get(
    `${API_ENDPOINT_SUPPLIER}/suppliers/count`,
  );
};

/**** */
export const searchSupplier = (searchCode, searchName, searchStatus, page, size) => {
  let querry = '';
  if (searchCode != '') {
    querry += `code:${searchCode},`
  }
  if (searchName != '') {
    querry += `name:${searchName},`
  }
  if (searchStatus != '') {
    querry += `status:${searchStatus},`
  }
  //debugger
  querry = querry.slice(0, -1);
  console.log(`${API_ENDPOINT_SUPPLIER}/suppliers/search/${querry}?page=${page}&size=${size}`);
  return axiosService.get(`${API_ENDPOINT_SUPPLIER}/suppliers/search/${querry}?page=${page}&size=${size}`,
  );
}
