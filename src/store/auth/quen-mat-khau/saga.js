import { takeEvery, fork, put, all, call } from "redux-saga/effects"
import { XAC_NHAN_QUEN_MAT_KHAU, XAC_NHAN_MAT_KHAU_MOI } from "./actionTypes"
import { 
  xacNhanQuenMatKhauSuccess, xacNhanQuenMatKhauError, 
  xacNhanMatKhauMoiSuccess, xacNhanMatKhauMoiError
 } from "./actions"
import moment from "moment";

import {
  postQuenMatKhau,
  putMatKhauMoi
} from "../../../helpers/backend_helper"

function* QuenMatKhau({ payload: params }) {
  try {
    const response = yield call(postQuenMatKhau, params)
    var fakeid =  moment(new Date()).format("YYYY-MM-DD hh mm ss");
    yield put(xacNhanQuenMatKhauSuccess(response.code, response.message, fakeid))
  } catch (error) {
    yield put(xacNhanQuenMatKhauError(error))
  }
}

function* MatKhauMoi({ payload: params }) {
  try {
    const response = yield call(putMatKhauMoi, params)
    var fakeid =  moment(new Date()).format("YYYY-MM-DD hh mm ss");
    yield put(xacNhanMatKhauMoiSuccess(response.code, response.message, fakeid))
  } catch (error) {
    yield put(xacNhanMatKhauMoiError(error))
  }
}

export function* watchQuenMatKhau() {
  yield takeEvery(XAC_NHAN_QUEN_MAT_KHAU, QuenMatKhau)
  yield takeEvery(XAC_NHAN_MAT_KHAU_MOI, MatKhauMoi)
}

function* QuenMatKhauSaga() {
  yield all([fork(watchQuenMatKhau)])
}

export default QuenMatKhauSaga
