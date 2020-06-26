import * as supplierConstants from '../constants/supplier';
import { toastError } from '../helpers/toastHelper';
// export const fetchListSupplier = (page, size) => {
//     return {
//         type: supplierConstants.FETCH_SUPPLIER,
//         payload: {
//             page,
//             size,
//         },
//     };
// };
export const fetchTotalItem = (data) => {
    return {
        type: supplierConstants.FETCH_TOTAL_ITEM,
        payload: {
            data,
        }
    }
}

export const fetchListSupplierSuccess = (data) => {
    return {
        type: supplierConstants.FETCH_SUPPLIER_SUCCESS,
        payload: {
            data,
        },
    };
};
export const fetchListSupplierFailed = (error) => {
    return {
        type: supplierConstants.FETCH_SUPPLIER_FAILED,
        payload: {
            error,
        },
    };
};

export const fetchAllListSupplier = (data) => {
    //debugger
    return {
        type: supplierConstants.FETCH_SUPPLIER,
        payload: {
            data,
        },
    };
};

export const fetchListSupplierByPageSize = (page, size) => {
    //debugger
    return {
        type: supplierConstants.FETCH_SUPPLIER_BY_PAGE_SIZE,
        payload: {
            page,
            size,
        },
    };
};

export const addSupplier = (data) => {
    return {
        type: supplierConstants.ADD_SUPPLIER,
        payload: {
            data,
        },
    };
};
export const addSupplierSuccess = (data) => {
    return {
        type: supplierConstants.ADD_SUPPLIER_SUCCESS,
        payload: {
            data,
        },
    };
};
export const addSupplierFailed = (error) => {
    return {
        type: supplierConstants.ADD_SUPPLIER_FAILED,
        payload: {
            error,
        },
    };
};

export const updateSupplier = (supplier, id) => {
    return {
        type: supplierConstants.UPDATE_SUPPLIER,
        payload: {
            supplier,
            id,
        }
    };
};

export const updateSupplierSuccess = (supplier) => {
    return {
        type: supplierConstants.UPDATE_SUPPLIER_SUCCESS,
        payload: {
            supplier,
        }
    };
}

export const updateSupplierFailed = (error) => {
    return {
        type: supplierConstants.UPDATE_SUPPLIER_FAILED,
        payload: {
            error,
        }
    };
}

export const fetchOneSupplier = (id) => {
    return {
        type: supplierConstants.FETCH_SUPPLIER_ONE,
        payload: {
            id,
        },
    };
};
export const fetchOneSupplierSuccess = (data) => {
    return {
        type: supplierConstants.FETCH_SUPPLIER_ONE_SUCCESS,
        payload: {
            data,
        },
    };
};
export const fetchOneSupplierFailed = (error) => {
    return {
        type: supplierConstants.FETCH_SUPPLIER_ONE_FAILED,
        payload: {
            error,
        },
    };
};

export const deleteSupplier = (id) => {
    return {
        type: supplierConstants.DELETE_SUPPLIER,
        payload: {
            id,
        },
    };
};
export const deleteSupplierSuccess = (data) => {
    return {
        type: supplierConstants.DELETE_SUPPLIER_SUCCESS,
        payload: {
            data,
        },
    };
};
export const deleteSupplierFailed = (error) => {
    return {
        type: supplierConstants.DELETE_SUPPLIER_FAILED,
        payload: {
            error,
        },
    };
};

export const searchSupplier = (searchCode, searchName, searchStatus, page, size) => {
    return {
        type: supplierConstants.SEARCH_SUPPLIER,
        payload: {
            searchCode, searchName, searchStatus, page, size,
        },
    };
};

export const searchSupplierSuccess = (data) => {
    return {
        type: supplierConstants.SEARCH_SUPPLIER_SUCCESS,
        payload: {
            data
        },
    };
};

export const searchSupplierFailed = (error) => {
    return {
        type: supplierConstants.SEARCH_SUPPLIER_FAILED,
        payload: {
            error,
        },
    };
};
