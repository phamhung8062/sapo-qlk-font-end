import * as supplierConstants from '../constants/supplier';
import { toastError, toastSuccess } from '../helpers/toastHelper';
const initalState = {
    listsupplier: [],
    listSupplier: [],
    totalItem: 0,
    supplier: {}
};
const reducer = (state = initalState, action) => {
    //debugger
    switch (action.type) {
        case supplierConstants.FETCH_SUPPLIER: {
            return {
                ...state,
                listSupplier: [],
            };
        }
        case supplierConstants.FETCH_SUPPLIER_SUCCESS: {
            const { data } = action.payload;
            return {
                ...state,
                listSupplier: data,
            };
        }
        case supplierConstants.FETCH_SUPPLIER_FAILED: {
            const { error } = action.payload;
            toastError(error);
            return {
                ...state,
                listSupplier: [],
            };
        }

        case supplierConstants.FETCH_TOTAL_ITEM: {
            const { data } = action.payload;
            return {
                ...state,
                totalItem: data,
            }
        }

        case supplierConstants.ADD_SUPPLIER: {
            return {
                ...state,
                supplierEditting: null,
            };
        }
        case supplierConstants.ADD_SUPPLIER_SUCCESS: {
            toastSuccess('Thêm mới thành công');
            const { data } = action.payload;
            return {
                ...state,
                supplier: data,
                // listSupplier: [state.listSupplier].concat(data),
            };
        }
        case supplierConstants.ADD_SUPPLIER_FAILED: {
            const { error } = action.payload;
            toastError(error);
            return {
                ...state,
                errors: error,
            };
        }

        case supplierConstants.UPDATE_SUPPLIER_SUCCESS: {
            const { supplier } = action.payload;
            toastSuccess('Cập nhật thành công ' + supplier.name);
            return {
                ...state,
                supplier: supplier,
            };
        }

        case supplierConstants.UPDATE_SUPPLIER_FAILED: {
            const { error } = action.payload;
            toastError(error);
            return {
                ...state,
                error: error,
            }
        }

        case supplierConstants.FETCH_SUPPLIER_ONE: {
            return {
                ...state,
                supplier: '',
            };
        }
        case supplierConstants.FETCH_SUPPLIER_ONE_SUCCESS: {
            const { data } = action.payload;
            return {
                ...state,
                supplier: data,
            };
        }
        case supplierConstants.FETCH_SUPPLIER_ONE_FAILED: {
            return {
                ...state,
                supplier: '',
            };
        }

        case supplierConstants.DELETE_SUPPLIER: {
            return {
                ...state,
            };
        }
        case supplierConstants.DELETE_SUPPLIER_SUCCESS: {
            const { data } = action.payload;
            toastSuccess('Xóa Thành Công');
            return {
                ...state,
                totalItem: data,
            };
        }
        case supplierConstants.DELETE_SUPPLIER_FAILED: {
            const { error } = action.payload;
            toastError(error);
            return {
                ...state,
                errors: error,
            };
        }

        /********* */
        case supplierConstants.SEARCH_SUPPLIER_SUCCESS: {
            const { data } = action.payload;
            return {
                ...state,
                totalItem: data.count,
                listSupplier: data.listResult,
            }
        }

        case supplierConstants.SEARCH_SUPPLIER_FAILED: {
            const { error } = action.payload;
            toastError(error);
            return {
                ...state,
                error,
            }
        }

        default:
            return state;
    }
};
export default reducer;
