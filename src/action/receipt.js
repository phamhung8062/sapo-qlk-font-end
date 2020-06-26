import * as receiptConstants from '../constants/receipt';
export const fetchListReceipt = (page, limit) => {
  return {
    type: receiptConstants.FETCH_RECEIPT,
    payload: {
      page,
      limit,
    },
  };
};
export const fetchListReceiptSuccess = (data) => {
  return {
    type: receiptConstants.FETCH_RECEIPT_SUCCESS,
    payload: {
      data,
    },
  };
};
export const fetchListReceiptFailed = (error) => {
  return {
    type: receiptConstants.FILTER_RECEIPT_FAILED,
    payload: {
      error,
    },
  };
};
export const fetchListSupplier = (page, name) => {
  return {
    type: receiptConstants.FETCH_SUPPLIER,
    payload: {
      page,
      name,
    },
  };
};
export const fetchListSupplierSuccess = (data) => {
  return {
    type: receiptConstants.FETCH_SUPPLIER_SUCCESS,
    payload: {
      data,
    },
  };
};
export const fetchListSupplierFailed = (error) => {
  return {
    type: receiptConstants.FETCH_SUPPLIER_FAILED,
    payload: {
      error,
    },
  };
};
export const fetchListVariant = (page, name) => {
  return {
    type: receiptConstants.FETCH_VARIANT,
    payload: {
      page,
      name,
    },
  };
};
export const fetchListVariantSuccess = (data) => {
  return {
    type: receiptConstants.FETCH_VARIANT_SUCCESS,
    payload: {
      data,
    },
  };
};
export const fetchListVariantFailed = (error) => {
  return {
    type: receiptConstants.FETCH_VARIANT_FAILED,
    payload: {
      error,
    },
  };
};
export const addReceipt = (data) => {
  return {
    type: receiptConstants.ADD_RECEIPT,
    payload: {
      data,
    },
  };
};
export const addReceiptSuccess = (data) => {
  return {
    type: receiptConstants.ADD_RECEIPT_SUCCESS,
    payload: {
      data,
    },
  };
};
export const addReceiptFailed = (error) => {
  return {
    type: receiptConstants.ADD_RECEIPT_FAILED,
    payload: {
      error,
    },
  };
};
export const fetchOneReceipt = (id) => {
  return {
    type: receiptConstants.FETCH_RECEIPT_ONE,
    payload: {
      id,
    },
  };
};
export const fetchOneReceiptSuccess = (data) => {
  return {
    type: receiptConstants.FETCH_RECEIPT_ONE_SUCCESS,
    payload: {
      data,
    },
  };
};
export const fetchOneReceiptFailed = (error) => {
  return {
    type: receiptConstants.FETCH_RECEIPT_ONE_FAILED,
    payload: {
      error,
    },
  };
};
export const deleteReceipt = (id) => {
  return {
    type: receiptConstants.DELETE_RECEIPT,
    payload: {
      id,
    },
  };
};
export const deleteReceiptSuccess = (data) => {
  return {
    type: receiptConstants.DELETE_RECEIPT_SUCCESS,
    payload: {
      data,
    },
  };
};
export const deleteReceiptFailed = (error) => {
  return {
    type: receiptConstants.DELETE_RECEIPT_FAILED,
    payload: {
      error,
    },
  };
};
export const updatePayment = (data) => {
  return {
    type: receiptConstants.UPDATE_PAYMENT,
    payload: {
      data,
    },
  };
};
export const updatePaymentSuccess = (data) => {
  return {
    type: receiptConstants.UPDATE_PAYMENT_SUCCESS,
    payload: {
      data,
    },
  };
};
export const updatePaymentFailed = (error) => {
  return {
    type: receiptConstants.UPDATE_RECEIPT_FAILED,
    payload: {
      error,
    },
  };
};
export const updateStatus = (data) => {
  return {
    type: receiptConstants.UPDATE_STATUS,
    payload: {
      data,
    },
  };
};
export const updateStatusSuccess = (data) => {
  return {
    type: receiptConstants.UPDATE_STATUS_SUCCESS,
    payload: {
      data,
    },
  };
};
export const updateStatusFailed = (error) => {
  return {
    type: receiptConstants.UPDATE_STATUS_FAILED,
    payload: {
      error,
    },
  };
};
export const searchReceipt = (page, limit, data) => {
  return {
    type: receiptConstants.SEARCH_RECEIPT,
    payload: {
      page,
      limit,
      data,
    },
  };
};
export const searchReceiptSuccess = (data) => {
  return {
    type: receiptConstants.SEARCH_RECEIPT_SUCCESS,
    payload: {
      data,
    },
  };
};
export const searchReceiptFailed = (error) => {
  return {
    type: receiptConstants.SEARCH_RECEIPT_FAILED,
    payload: {
      error,
    },
  };
};
export const editReceipt = (data) => {
  return {
    type: receiptConstants.UPDATE_RECEIPT,
    payload: {
      data,
    },
  };
};
export const editReceiptSuccess = (data) => {
  return {
    type: receiptConstants.UPDATE_RECEIPT_SUCCESS,
    payload: {
      data,
    },
  };
};
export const editReceiptFailed = (error) => {
  return {
    type: receiptConstants.UPDATE_RECEIPT_FAILED,
    payload: {
      error,
    },
  };
};
export const updateTag = (data) => {
  return {
    type: receiptConstants.UPDATE_TAG,
    payload: {
      data,
    },
  };
};
export const updateTagSuccess = (data) => {
  return {
    type: receiptConstants.UPDATE_TAG_SUCCESS,
    payload: {
      data,
    },
  };
};
export const updateTagFailed = (error) => {
  return {
    type: receiptConstants.UPDATE_TAG_FAILED,
    payload: {
      error,
    },
  };
};
export const addSupplier = (data) => {
  return {
    type: receiptConstants.ADD_SUPPLIER_RECEIPT,
    payload: {
      data,
    },
  };
};
export const addSupplierSuccess = (data) => {
  return {
    type: receiptConstants.ADD_SUPPLIER_RECEIPT_SUCCESS,
    payload: {
      data,
    },
  };
};
export const addSupplierFailed = (error) => {
  return {
    type: receiptConstants.ADD_SUPPLIER_RECEIPT_FAILED,
    payload: {
      error,
    },
  };
};
