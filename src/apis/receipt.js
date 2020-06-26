import axiosService from '../commons/axoisService';
import qs from 'query-string';
import { API_ENDPOINT_RECEIPT } from '../constants';
const url = 'admin';
export const getListReceipt = (page, limit) => {
  // let queryParam = '';

  // console.log('pa', params);
  // if (Object.keys(params).length > 0) {
  //   queryParam = `?${qs.stringify(params)}`;
  // }
  const pages = page;
  const sizes = limit;
  return axiosService.get(
    `${API_ENDPOINT_RECEIPT}/${url}/receipts?page=${pages}&limit=${sizes}`,
  );
};
export const addReceipt = (data) => {
  return axiosService.post(
    `${API_ENDPOINT_RECEIPT}/${url}/receipts/create`,
    data,
  );
};

export const updateProduct = (data) => {
  return axiosService.put(
    `${API_ENDPOINT_RECEIPT}/${url}/update/product`,
    data,
  );
};
export const deleteReceipt = (id) => {
  return axiosService.delete(`${API_ENDPOINT_RECEIPT}/${url}/receipts/${id}`);
};
export const getListSupplier = (page, name) => {
  return axiosService.get(
    `${API_ENDPOINT_RECEIPT}/admin/receipts/api/suppliers?page=${page}&name=${name}`,
  );
};
export const getListVariant = (page, name) => {
  return axiosService.get(
    `${API_ENDPOINT_RECEIPT}/admin/receipts/api/products?page=${page}&name=${name}`,
  );
};
export const getOneReceipt = (id) => {
  return axiosService.get(`${API_ENDPOINT_RECEIPT}/${url}/receipts/${id}`);
};
export const updatePayment = (data) => {
  return axiosService.post(
    `${API_ENDPOINT_RECEIPT}/${url}/receipts/create/payment`,
    data,
  );
};
export const updateStatus = (data) => {
  return axiosService.put(
    `${API_ENDPOINT_RECEIPT}/${url}/receipts/update/status`,
    data,
  );
};
export const searchReceipt = (page, limit, code) => {
  const pages = page;
  const sizes = limit;
  return axiosService.get(
    `${API_ENDPOINT_RECEIPT}/${url}/receipts/haha?page=${pages}&limit=${sizes}&code=${code}`,
  );
};
export const searchReceiptAll = (page, limit, data) => {
  const pages = page;
  const sizes = limit;
  const { code, status, statuspayment, supplierName } = data;
  return axiosService.get(
    `${API_ENDPOINT_RECEIPT}/${url}/receipts/search?page=${pages}&limit=${sizes}&code=${code}&status=${status}&statuspayment=${statuspayment}&supplierName=${supplierName}`,
  );
};
export const updateReceipt = (data) => {
  return axiosService.put(`${API_ENDPOINT_RECEIPT}/${url}/receipts/edit`, data);
};
export const updateTagReceipt = (data) => {
  return axiosService.put(
    `${API_ENDPOINT_RECEIPT}/${url}/receipts/update`,
    data,
  );
};
export const addSupplier = (data) => {
  return axiosService.post(
    `${API_ENDPOINT_RECEIPT}/${url}/receipts/create/supplier`,
    data,
  );
};
