import { push } from 'connected-react-router';
import { call, delay, fork, put, take, takeEvery } from 'redux-saga/effects';
import {
    addSupplierFailed,
    addSupplierSuccess,
    fetchListSupplierFailed,
    fetchListSupplierSuccess,
    fetchOneSupplierSuccess,
    fetchOneSupplierFailed,
    fetchTotalItem,
    updateSupplierSuccess,
    updateSupplierFailed,
    deleteSupplierSuccess,
    deleteSupplierFailed,
    searchSupplierSuccess,
    searchSupplierFailed,
} from '../action/supplier';
import { hideLoading, showLoading } from '../action/ui';
import {
    addSupplier,
    getListSupplier,
    getOneSupplier,
    getAllListSupplier,
    getListSupplierByPageSize,
    getTotalItem,
    updateSupplier,
    deleteSupplier,
    searchSupplier,
} from '../apis/supplier';
import { STATUS_CODE } from '../constants';
import * as supplierTypes from '../constants/supplier';
import { toastError, toastSuccess } from '../helpers/toastHelper';

// export function* WatchFetchListAllSupplierAction() {
//     //debugger
//     while (true) {
//         const action = yield take(supplierTypes.FETCH_SUPPLIER);
//         // yield put(showLoading());
//         //const { page, limit } = action.payload;
//         const resp = yield call(getAllListSupplier);
//         //debugger
//         const { status, data } = resp;
//         if (status === STATUS_CODE.SUCCES) {
//             yield put(fetchListSupplierSuccess(data));
//         } else {
//             yield put(fetchListSupplierFailed(data));
//         }
//         yield delay(500);
//         //  yield put(hideLoading());
//     }
// }

export function* addSupplierSaga({ payload }) {
    const supplier = payload.data;
    yield put(showLoading());
    try {
        debugger
        const resp = yield call(addSupplier, supplier);
        //debugger
        const { data, status } = resp;
        if (status === STATUS_CODE.SUCCES) {
            console.log(data);
            const state = { supplier: data };
            yield put(push(`/suppliers/${data.id}`, state));
            yield put(addSupplierSuccess(data));
        }
        else {
            yield put(addSupplierFailed(data));
        }
    } catch (error) {
        const err = error.response.data;
        yield put(addSupplierFailed(err));
        //debugger
        //console.log(error);
    }
    yield put(hideLoading());
}

export function* WatchFetchListSupplierByPageSizeAction() {
    while (true) {
        const action = yield take(supplierTypes.FETCH_SUPPLIER_BY_PAGE_SIZE);
        //debugger
        const { page, size } = action.payload;
        try {
            const resp = yield call(getListSupplierByPageSize, page, size);
            //debugger
            const { status, data } = resp;
            if (status === STATUS_CODE.SUCCES) {
                yield put(fetchListSupplierSuccess(data));
            } else {
                yield put(fetchListSupplierFailed(data));
            }
        } catch (error) {
            const err = error.response.data;
            //toastError(err);
            yield put(fetchListSupplierFailed(err));

        }
        yield delay(500);
        //  yield put(hideLoading());
    }
}

export function* WatchFetchTotalItemAction() {
    while (true) {
        const action = yield take(supplierTypes.FETCH_TOTAL_ITEM);
        const resp = yield call(getTotalItem);
        const { status, data } = resp;
        if (status === STATUS_CODE.SUCCES) {
            yield put(fetchTotalItem(data));
        }
        else {
            yield put(fetchTotalItem(0));
        }
        yield delay(500);
    }
}

export function* updateSupplierSaga({ payload }) {
    const { id, supplier } = payload;
    yield put(showLoading());
    try {
        const resp = yield call(updateSupplier, id, supplier);
        const { status, data } = resp;
        if (status === STATUS_CODE.SUCCES) {
            const state = { supplier: data };
            yield put(push(`/suppliers/${data.id}`, state));
            yield put(updateSupplierSuccess(data));
        }
        else {
            yield put(updateSupplierFailed(data))
        }
    } catch (error) {
        const err = error.response.data;
        yield put(updateSupplierFailed(err));
    }
    yield put(hideLoading());
}

export function* deleteSupplierSaga({ payload }) {
    const { id } = payload;
    //yield put(showLoading());
    try {
        const resp = yield call(deleteSupplier, id);
        const { status, data } = resp;
        debugger
        if (status === STATUS_CODE.SUCCES) {

            yield put(deleteSupplierSuccess(data));
        }
        else {
            yield put(deleteSupplierFailed(data))
        }
    } catch (error) {
        const err = error.response.data;
        yield put(deleteSupplierFailed(err));
    }
    //yield put(hideLoading());
}

/*** */
export function* searchSupplierSaga({ payload }) {
    const { searchCode, searchName, searchStatus, page, size, } = payload;
    yield put(showLoading());
    try {
        const resp = yield call(searchSupplier, searchCode, searchName, searchStatus, page, size);
        const { status, data } = resp;
        if (status == STATUS_CODE.SUCCES) {
            debugger
            yield put(searchSupplierSuccess(data));
        }
    } catch (error) {
        debugger
        const err = error.response.data;
        yield put(searchSupplierFailed(err));
    }
    yield put(hideLoading());
}
// ***************************************************
// function* WatchFetchOneReceiptAction() {
//   while (true) {
//     const action = yield take(receiptTypes.FETCH_RECEIPT_ONE);
//     // yield put(showLoading());
//     const { id } = action.payload;
//     const resp = yield call(getOneReceipt, id);
//     const { status, data } = resp;
//     if (status === STATUS_CODE.SUCCES) {
//       yield put(fetchOneReceiptSuccess(data));
//     } else {
//       yield put(fetchOneReceiptFailed(data));
//     }
//     yield delay(500);
//     //  yield put(hideLoading());
//   }
// }
// // ***************************************************

// function* WatchFetchListSupplierAction() {
//   while (true) {
//     const action = yield take(receiptTypes.FETCH_SUPPLIER);
//     const { page } = action.payload;
//     const resp = yield call(getListSupplier, page);
//     const { status, data } = resp;
//     if (status === STATUS_CODE.SUCCES) {
//       yield put(fetchListSupplierSuccess(data));
//     } else {
//       yield put(fetchListSupplierFailed(data));
//     }
//     yield delay(500);
//   }
// }
// // ***************************************************
// function* WatchFetchListVariantAction() {
//   while (true) {
//     const action = yield take(receiptTypes.FETCH_VARIANT);
//     const { page } = action.payload;
//     const resp = yield call(getListVariant, page);
//     const { status, data } = resp;
//     if (status === STATUS_CODE.SUCCES) {
//       yield put(fetchListVariantSuccess(data));
//     } else {
//       yield put(fetchListVariantFailed(data));
//     }
//     yield delay(500);
//   }
// }
// // ***************************************************
// function* addReceiptSaga({ payload }) {
//   const dataAdd = payload.data;
//   yield put(showLoading());
//   const resp = yield call(addReceipt, dataAdd);
//   const { data, status } = resp;
//   if (status === STATUS_CODE.SUCCES) {
//     console.log('data', data);
//     yield put(addReceiptSuccess(data));
//     yield put(push(`/receipt-info/${data}`));
//   } else {
//     yield put(addReceiptFailed(data));
//   }
//   yield put(hideLoading());
// }
