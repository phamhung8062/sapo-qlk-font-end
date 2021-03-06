import { push } from 'connected-react-router';
import {
  call,
  delay,
  fork,
  put,
  take,
  takeEvery,
  takeLatest,
} from 'redux-saga/effects';
import { loginFailed, loginSuccess } from '../action/auth';
import { hideModal } from '../action/modal';
import {
  addReceiptFailed,
  addReceiptSuccess,
  deleteReceiptFailed,
  deleteReceiptSuccess,
  fetchListReceiptFailed,
  fetchListReceiptSuccess,
  fetchListSupplierFailed,
  fetchListSupplierSuccess,
  fetchListVariantFailed,
  fetchListVariantSuccess,
  fetchOneReceiptFailed,
  fetchOneReceiptSuccess,
  updatePaymentFailed,
  updatePaymentSuccess,
  updateStatusFailed,
  updateStatusSuccess,
  searchReceiptSuccess,
  searchReceiptFailed,
  editReceiptSuccess,
  editReceiptFailed,
  addSupplierSuccess,
  addSupplierFailed,
} from '../action/receipt';
import { hideLoading, showLoading } from '../action/ui';
import { login } from '../apis/auth';
import {
  addReceipt,
  deleteReceipt,
  getListReceipt,
  getListSupplier,
  getListVariant,
  getOneReceipt,
  updatePayment,
  updateStatus,
  searchReceipt,
  searchReceiptAll,
  updateReceipt,
  updateTagReceipt,
  addSupplier,
} from '../apis/receipt';
import axiosService from '../commons/axoisService';
import { AUTHORIZATION_KEY, STATUS_CODE } from '../constants/index';
import * as authTypes from '../constants/auth';
import * as receiptTypes from '../constants/receipt';
import * as supplierTypes from '../constants/supplier';
import * as supplierSaga from './supplier';
import { toastError } from '../helpers/toastHelper';

// B1:thực thi action fetchListTask
// B2:Gọi API
// B3: Kiểm tra STATUS_CODE
//   Nếu thành công trả về ....
//   Nếu thất bại
// B4:Thực thi các công việc tiếp theo
// Fork(): sử dụng cơ chế non - blocking call trên function
// Call(): Gọi function. Nếu nó return về một promise, tạm dừng saga cho đến khi promise được giải quyết
// Take(): tạm dừng cho đến khi nhận được action
// Put(): Dùng để dispatch một action
// takeEvery(): Theo dõi một action nào đó thay đổi thì gọi một saga nào đó
// akeLastest() : Có nghĩa là nếu chúng ta thực hiện một loạt các actions, nó sẽ chỉ thực thi và trả lại kết quả của của actions cuối cùng
// yield(): Có nghĩa là chạy tuần tự khi nào trả ra kết quả mới thực thi tiếp

// *************************************************************************
function* processLogin({ payload }) {
  const { userName, passWord } = payload;
  yield put(showLoading());
  try {
    const resp = yield call(login, {
      userName,
      passWord,
    });
    const { data, status } = resp;
    if (status === STATUS_CODE.SUCCES) {
      yield put(loginSuccess(data));
      const { token } = data;
      axiosService.setHeader('Authorization', `Bearer ${token}`);
      axiosService.setHeader('Content-Type', `application/json`);
      localStorage.setItem(AUTHORIZATION_KEY, token);
      localStorage.setItem('userName', userName);
      yield put(push(authTypes.REDIRECT_AFTER_LOGIN_SUCCESS));
    } else {
      yield put(loginFailed(data));
    }
  } catch (error) {
    toastError('Đăng nhập không thành công!');
    console.log('lõi dang nhap', error);
    // const err = _get(error, 'response.data', {});
    // yield put(loginFailed(error));
  } finally {
    yield put(hideLoading());
  }
}
// ***************************************************
function* WatchFetchListReceiptAction() {
  while (true) {
    try {
      console.log('đâ');
      debugger;
      const action = yield take(receiptTypes.FETCH_RECEIPT);
      // yield put(showLoading());
      const { page, limit } = action.payload;
      const resp = yield call(getListReceipt, page, limit);
      console.log('lỗi', resp);
      const { status, data } = resp;

      if (status === STATUS_CODE.SUCCES) {
        yield put(fetchListReceiptSuccess(data));
      }
      if (status === 403) {
        console.log('lỗi', data);
        yield put(fetchListReceiptFailed(data));
      }
      yield delay(300);
    } catch (error) {
      debugger;
      toastError('Đăng nhập không thành công!');
      console.log('lõi dang nhap', error);
      // const err = _get(error, 'response.data', {});
      // yield put(loginFailed(error));
    }
  }
}
// ***************************************************
function* WatchFetchOneReceiptAction() {
  while (true) {
    const action = yield take(receiptTypes.FETCH_RECEIPT_ONE);
    const { id } = action.payload;
    const resp = yield call(getOneReceipt, id);
    const { status, data } = resp;
    if (status === STATUS_CODE.SUCCES) {
      console.log('dataa', data);
      yield put(fetchOneReceiptSuccess(data));
    } else {
      yield put(fetchOneReceiptFailed(data));
    }
    yield delay(300);
  }
}
// ***************************************************
function* WatchFetchListSupplier() {
  while (true) {
    const action = yield take(receiptTypes.FETCH_SUPPLIER);
    const { page, name } = action.payload;
    const resp = yield call(getListSupplier, page, name);
    const { status, data } = resp;
    if (status === STATUS_CODE.SUCCES) {
      yield put(fetchListSupplierSuccess(data));
    } else {
      yield put(fetchListSupplierFailed(data));
    }
    // yield delay(500);
  }
}
// ***************************************************
function* WatchFetchListVariantAction() {
  while (true) {
    const action = yield take(receiptTypes.FETCH_VARIANT);
    const { page, name } = action.payload;
    const resp = yield call(getListVariant, page, name);
    const { status, data } = resp;
    if (status === STATUS_CODE.SUCCES) {
      yield put(fetchListVariantSuccess(data));
    } else {
      yield put(fetchListVariantFailed(data));
    }
    // yield delay(500);
  }
}
// ***************************************************
function* addReceiptSaga({ payload }) {
  const dataAdd = payload.data;
  yield put(showLoading());
  const resp = yield call(addReceipt, dataAdd);
  const { data, status } = resp;
  if (status === STATUS_CODE.SUCCES) {
    console.log('data', data);
    yield put(addReceiptSuccess(data));
    yield put(push(`/receipts/info/${data}`));
  } else {
    yield put(addReceiptFailed(data));
  }
  yield put(hideLoading());
}
// ***************************************************
function* deleteReceiptSaga({ payload }) {
  const { id } = payload;
  // yield put(showLoading());
  const resp = yield call(deleteReceipt, id);
  const { data, status: statuscode } = resp;
  if (statuscode === STATUS_CODE.SUCCES) {
    yield put(hideModal());
    yield put(deleteReceiptSuccess(id));
  } else {
    yield put(deleteReceiptFailed(data));
  }
}
// ***************************************************
function* updatePaymentSaga({ payload }) {
  const dataUpadate = payload.data;
  const resp = yield call(updatePayment, dataUpadate);
  const { data, status: statuscode } = resp;
  console.log('datatrara', data);
  if (statuscode === STATUS_CODE.SUCCES) {
    //  yield put(updatePaymentSuccess(data));
    yield delay(800);
    window.location.replace(`/receipts/info/${dataUpadate.receiptId}`);
  } else {
    yield put(updatePaymentFailed(data));
  }
  yield put(hideLoading());
}
// ***************************************************
function* updateStatusSaga({ payload }) {
  const dataUpadate = payload.data;
  const resp = yield call(updateStatus, dataUpadate);
  const { data, status: statuscode } = resp;
  if (statuscode === STATUS_CODE.SUCCES) {
    yield put(updateStatusSuccess(data));
    yield delay(800);
    window.location.replace(`/receipts/info/${dataUpadate.id}`);
  } else {
    yield put(updateStatusFailed(data));
  }
}
// ***************************************************
function* searchReceiptSaga({ payload }) {
  try {
    console.log('payloaf', payload);
    const { page, limit } = payload;
    const datasearch = payload.data;
    console.log('payloaf', datasearch);
    const resp = yield call(searchReceiptAll, page, limit, datasearch);
    console.log('lỗi', resp);
    const { status, data } = resp;

    if (status === STATUS_CODE.SUCCES) {
      yield put(searchReceiptSuccess(data));
    }
    if (status === STATUS_CODE.AU) {
      console.log('lỗi', data);
      yield put(searchReceiptFailed(data));
    }
    yield delay(300);
  } catch (error) {
    toastError('Bạn không có quyền! Vui lòng đăng nhập lại !');
    yield delay(1500);
    window.location.replace(`/login`);
  }

  // yield put(hideLoading());
}
// ***************************************************
function* updateReceiptSaga({ payload }) {
  const dataUpadate = payload.data;
  const resp = yield call(updateReceipt, dataUpadate);
  const { data, status: statuscode } = resp;
  if (statuscode === STATUS_CODE.SUCCES) {
    yield put(editReceiptSuccess(data));
    yield delay(800);
    window.location.replace(`/receipts/info/${dataUpadate.id}`);
  } else {
    yield put(editReceiptFailed(data));
  }
}
// ***************************************************
function* updateTagReceiptSaga({ payload }) {
  const dataUpadate = payload.data;
  console.log('dataupdate', dataUpadate);
  const resp = yield call(updateTagReceipt, dataUpadate);
  const { data, status: statuscode } = resp;
  if (statuscode === STATUS_CODE.SUCCES) {
    yield put(updateStatusSuccess(data));
    yield delay(800);
    window.location.replace(`/receipts/info/${dataUpadate.id}`);
  } else {
    yield put(updateStatusSuccess(data));
  }
}
// ***************************************************
function* addSupplierReceiptSaga({ payload }) {
  const dataAdd = payload.data;
  console.log('datasuppplierdsd', dataAdd);
  const resp = yield call(addSupplier, dataAdd);
  const { data, status } = resp;
  if (status === STATUS_CODE.SUCCES) {
    yield put(addSupplierSuccess(data));
  } else {
    yield put(addSupplierFailed(data));
  }
}
function* rootSaga() {
  // yield fork(WatchFetchListReceiptAction);
  yield fork(WatchFetchOneReceiptAction);
  yield fork(WatchFetchListSupplier);
  //yield fork(supplierSaga.WatchFetchListAllSupplierAction);
  yield fork(WatchFetchListVariantAction);
  yield fork(supplierSaga.WatchFetchListSupplierByPageSizeAction);
  yield fork(supplierSaga.WatchFetchTotalItemAction);
  // *************************
  yield takeEvery(supplierTypes.ADD_SUPPLIER, supplierSaga.addSupplierSaga);
  yield takeEvery(
    supplierTypes.UPDATE_SUPPLIER,
    supplierSaga.updateSupplierSaga,
  );
  yield takeEvery(
    supplierTypes.DELETE_SUPPLIER,
    supplierSaga.deleteSupplierSaga,
  );
  yield takeEvery(supplierTypes.SEARCH_SUPPLIER, supplierSaga.searchSupplierSaga);

  yield takeEvery(receiptTypes.ADD_RECEIPT, addReceiptSaga);
  yield takeLatest(receiptTypes.DELETE_RECEIPT, deleteReceiptSaga);
  yield takeLatest(receiptTypes.UPDATE_PAYMENT, updatePaymentSaga);
  yield takeLatest(receiptTypes.UPDATE_STATUS, updateStatusSaga);
  yield takeEvery(receiptTypes.SEARCH_RECEIPT, searchReceiptSaga);
  yield takeEvery(receiptTypes.UPDATE_RECEIPT, updateReceiptSaga);
  yield takeEvery(receiptTypes.UPDATE_TAG, updateTagReceiptSaga);
  yield takeEvery(receiptTypes.ADD_SUPPLIER_RECEIPT, addSupplierReceiptSaga);
  yield takeLatest(authTypes.LOGIN, processLogin);
}
export default rootSaga;
