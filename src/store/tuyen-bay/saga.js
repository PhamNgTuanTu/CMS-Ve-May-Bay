//Include Both Helper File with needed methods
import {
  getTuyenBay, getTuyenBayCapNhat, postThemMoiTuyenBay,
  putCapNhatTuyenBay, deleteXoaTuyenBay
} from "helpers/backend_helper";
import moment from "moment";
import { call, put, takeEvery } from "redux-saga/effects";
import {
  capNhatTuyenBayFail, capNhatTuyenBaySuccess,
  layDSTuyenBayFail, layDSTuyenBaySuccess,
  TuyenBayCapNhat,
  themTuyenBaySuccess, themTuyenBayFail,
  xoaTuyenBaySuccess
} from "./actions";
// Crypto Redux States
import {
  CHAP_NHAN_CAP_NHAT_TUYEN_BAY, LAY_DS_TUYEN_BAY, LAY_TUYEN_BAY_CAP_NHAT, THEM_TUYEN_BAY, XOA_TUYEN_BAY
} from "./actionTypes";


function* layDSTuyenBay({ payload: params }) {
  try {
    const response = yield call(getTuyenBay, params);
    yield put(layDSTuyenBaySuccess(response.data));
  } catch (error) {
    yield put(layDSTuyenBayFail(error))
  }
}

function* themTuyenBay({ payload: params }) {
  try {
    const response = yield call(postThemMoiTuyenBay, params);
    if (response.code) {
      //code = 400 
      //fakeid để biết response trả về mới => cập nhật store thông báo...  
      var fakeid = moment(new Date()).format("YYYY-MM-DD hh mm ss");
      yield put(themTuyenBaySuccess(response.code, response.message, fakeid));
    } else {
      var data = response.data;
      yield put(themTuyenBaySuccess(response.status, response.message, data.id));
    }
  } catch (error) {
    console.log(error);
  }
}

function* capNhatTuyenBay({ payload: params }) {
  try {
    const response = yield call(putCapNhatTuyenBay, params);
    var fakeid = moment(new Date()).format("YYYY-MM-DD hh mm ss");
    response.status === "success" ? response.status = 200 : response.status = 400
    yield put(capNhatTuyenBaySuccess(response.status, response.message, fakeid));
  } catch (error) {
    console.log(error);
  }
}

function* layThongTinTuyenBayCapNhat({ payload: params }) {
  try {
    const response = yield call(getTuyenBayCapNhat, params);
    if (response.code === 200) {
      var data = response.data;
      var thongTin = {
        'id': data.id
        //chưa có api
      }
      //console.log(thongTin)
      yield put(TuyenBayCapNhat(thongTin));
    } else {
      yield put(capNhatTuyenBayFail(response.code, response.message));
    }
  } catch (error) {
    console.log(error);
  }
}

function* xoaTuyenBay({ payload: params }) {
  try {
    const response = yield call(deleteXoaTuyenBay, params);
    var fakeid = moment(new Date()).format("YYYY-MM-DD hh mm ss");
    yield put(xoaTuyenBaySuccess(response.code, response.message, fakeid));
  } catch (error) {
    console.log(error);
  }
}

function* TuyenBaySaga() {
  yield takeEvery(LAY_DS_TUYEN_BAY, layDSTuyenBay)
  yield takeEvery(THEM_TUYEN_BAY, themTuyenBay)
  yield takeEvery(LAY_TUYEN_BAY_CAP_NHAT, layThongTinTuyenBayCapNhat)
  yield takeEvery(CHAP_NHAN_CAP_NHAT_TUYEN_BAY, capNhatTuyenBay)
  yield takeEvery(XOA_TUYEN_BAY, xoaTuyenBay)
}

export default TuyenBaySaga
