import * as receiptConstants from '../constants/receipt';
import { toastError, toastSuccess } from '../helpers/toastHelper';
const initalState = {
  listReceipt: [],
  listSuppliers: [],
  listVariant: [],
  totalItem: '',
  errors: '',
  receiptEditting: '',
  receipt: '',
  supplier: '',
};
const reducer = (state = initalState, action) => {
  switch (action.type) {
    case receiptConstants.FETCH_RECEIPT: {
      return {
        ...state,
        listReceipt: [],
      };
    }
    case receiptConstants.FETCH_RECEIPT_SUCCESS: {
      const { data } = action.payload;
      return {
        ...state,
        listReceipt: data.listResult,
        totalItem: data.count,
      };
    }
    case receiptConstants.FETCH_RECEIPT_FAILED: {
      const { error } = action.payload;
      console.log('err', error);
      return {
        ...state,
        listReceipt: [],
        totalItem: '',
      };
    }
    case receiptConstants.FETCH_SUPPLIER: {
      return {
        ...state,
        listSuppliers: [],
      };
    }
    case receiptConstants.FETCH_SUPPLIER_SUCCESS: {
      const { data } = action.payload;
      return {
        ...state,
        listSuppliers: data,
      };
    }
    case receiptConstants.FETCH_SUPPLIER_FAILED: {
      return {
        ...state,
        listSuppliers: [],
      };
    }
    case receiptConstants.FETCH_VARIANT: {
      return {
        ...state,
        listVariant: [],
      };
    }
    case receiptConstants.FETCH_VARIANT_SUCCESS: {
      const { data } = action.payload;
      return {
        ...state,
        listVariant: data,
      };
    }
    case receiptConstants.FETCH_VARIANT_FAILED: {
      return {
        ...state,
        listVariant: [],
      };
    }
    case receiptConstants.ADD_RECEIPT: {
      return {
        ...state,
        receiptEditting: null,
      };
    }
    case receiptConstants.ADD_RECEIPT_SUCCESS: {
      toastSuccess('Thêm mới thành công');
      const { data } = action.payload;
      return {
        ...state,
        receiptEditting: null,
      };
    }
    case receiptConstants.ADD_RECEIPT_FAILED: {
      const { error } = action.payload;
      return {
        ...state,
        receiptEditting: null,
        errors: error,
      };
    }
    case receiptConstants.FETCH_RECEIPT_ONE: {
      return {
        ...state,
        receipt: '',
      };
    }
    case receiptConstants.FETCH_RECEIPT_ONE_SUCCESS: {
      const { data } = action.payload;
      console.log('datare', data);

      return {
        ...state,
        receipt: data,
        receiptEditting: data,
      };
    }
    case receiptConstants.FETCH_RECEIPT_ONE_FAILED: {
      return {
        ...state,
        receipt: '',
        receiptEditting: '',
      };
    }
    case receiptConstants.DELETE_RECEIPT: {
      return {
        ...state,
      };
    }
    case receiptConstants.DELETE_RECEIPT_SUCCESS: {
      const { data } = action.payload;
      toastSuccess('Xóa Thành Công');
      return {
        ...state,
        listReceipt: state.listReceipt.filter((item) => item.id !== data),
      };
    }
    case receiptConstants.DELETE_RECEIPT_FAILED: {
      const { error } = action.payload;
      return {
        ...state,
        errors: error,
      };
    }
    case receiptConstants.UPDATE_PAYMENT: {
      return {
        ...state,
      };
    }
    case receiptConstants.UPDATE_PAYMENT_SUCCESS: {
      return {
        ...state,
      };
    }
    case receiptConstants.UPDATE_PAYMENT_FAILED: {
      const { error } = action.payload;
      return {
        ...state,
        errors: error,
      };
    }
    case receiptConstants.UPDATE_STATUS: {
      return {
        ...state,
      };
    }
    case receiptConstants.UPDATE_STATUS_SUCCESS: {
      return {
        ...state,
      };
    }
    case receiptConstants.UPDATE_STATUS_FAILED: {
      const { error } = action.payload;
      return {
        ...state,
        errors: error,
      };
    }
    case receiptConstants.SEARCH_RECEIPT: {
      return {
        ...state,
      };
    }
    case receiptConstants.SEARCH_RECEIPT_SUCCESS: {
      const { data } = action.payload;
      return {
        ...state,
        listReceipt: data.listResult,
        totalItem: data.count,
      };
    }
    case receiptConstants.SEARCH_RECEIPT_FAILED: {
      const { error } = action.payload;
      return {
        ...state,
        listReceipt: [],
        totalItem: '',
      };
    }
    case receiptConstants.UPDATE_RECEIPT: {
      return {
        ...state,
      };
    }
    case receiptConstants.UPDATE_RECEIPT_SUCCESS: {
      return {
        ...state,
      };
    }
    case receiptConstants.UPDATE_RECEIPT_FAILED: {
      const { error } = action.payload;
      return {
        ...state,
        errors: error,
      };
    }
    case receiptConstants.UPDATE_TAG: {
      return {
        ...state,
      };
    }
    case receiptConstants.UPDATE_TAG_SUCCESS: {
      return {
        ...state,
      };
    }
    case receiptConstants.UPDATE_TAG_FAILED: {
      const { error } = action.payload;
      return {
        ...state,
        errors: error,
      };
    }
    case receiptConstants.ADD_SUPPLIER_RECEIPT: {
      return {
        ...state,
        supplier: '',
      };
    }
    case receiptConstants.ADD_SUPPLIER_RECEIPT_SUCCESS: {
      const { data } = action.payload;
      return {
        ...state,
        supplier: data,
      };
    }
    case receiptConstants.ADD_SUPPLIER_RECEIPT_FAILED: {
      const { error } = action.payload;
      return {
        ...state,
        supplier: '',
        errors: error,
      };
    }
    default:
      return state;
  }
};
export default reducer;
