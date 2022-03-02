import { call, put, takeEvery } from "redux-saga/effects"
import moment from "moment";
// Crypto Redux States
import { 
  LAY_DS_HANG_BAY,  
  THEM_HANG_BAY, 
  THEM_HANG_BAY_FAIL,
  LAY_HANG_BAY_CAP_NHAT,
  HANG_BAY_CAP_NHAT,
  CHAP_NHAN_CAP_NHAT_HANG_BAY,
  CAP_NHAT_HANG_BAY_MESAGE,
  XOA_HANG_BAY,
  XOA_HANG_BAY_MESAGE
} from "./actionTypes"
import { 
  layDSHangBaySuccess, layDSHangBayFail, 
  themHangBaySuccess, themHangBayFail,
  layThongTinCapNhatHangBay, hangBayCapNhat,
  capNhatHangBaySuccess, capNhatHangBayFail,
  xoaHangBaySuccess, xoaHangBayFail
} from "./actions"

//Include Both Helper File with needed methods
import { 
  getHangBay, postThemMoiHangBay, 
  putCapNhatHangBay, deleteXoaHangBay, 
  getHangBayCapNhat 
} from "helpers/backend_helper"

function* layDSHangBay({ payload: params }) {
  try {
    const response = yield call(getHangBay, params);
    yield put(layDSHangBaySuccess(response.data));
  } catch (error) {
    yield put(layDSHangBayFail(error))
  }
}

function* themHangBay({ payload: params }) {
  try {
    const response = yield call(postThemMoiHangBay, params);
    if(response.code) {
      //code = 400 
      //fakeid để biết response trả về mới => cập nhật store thông báo...  
      var fakeid =  moment(new Date()).format("YYYY-MM-DD hh mm ss");
      yield put(themHangBaySuccess(response.code, response.message, fakeid));
    } else {
      var data = response.data;
      yield put(themHangBaySuccess(response.status, response.message, data.id));
    }
  } catch (error) {
    console.log(error);
  }
}

function* capNhatHangBay({ payload: params }) {
  try {
    const response = yield call(putCapNhatHangBay, params);
    var fakeid =  moment(new Date()).format("YYYY-MM-DD hh mm ss");
    response.status ==="success" ? response.status = 200 : response.status = 400
    yield put(capNhatHangBaySuccess(response.status, response.message, fakeid));
  } catch (error) {
    console.log(error);
  }
}

function* layThongTinHangBayCapNhat({ payload: params }) {
  try {
    const response = yield call(getHangBayCapNhat, params);
    if(response.code === 200) {
      var data = response.data;
      var thongTin = {
        'id': data.id,
        'ten': data.ten,
        'ma_dai_ly': data.ma_dai_ly,
        'ten_dang_nhap': data.nhan_vien_dai_ly["ten_dang_nhap"],
        'ten_nguoi_dai_dien': data.nhan_vien_dai_ly["ho_ten"],
        'dien_thoai': data.nhan_vien_dai_ly["dien_thoai"], 
        'email': data.nhan_vien_dai_ly["email"]
      }
      //console.log(thongTin)
      yield put(hangBayCapNhat(thongTin));
    } else {
      yield put(capNhatHangBayFail(response.code, response.message));
    }
  } catch (error) {
    console.log(error);
  }
}

function* xoaHangBay({ payload: params }) {
  try {
    const response = yield call(deleteXoaHangBay, params);
    var fakeid =  moment(new Date()).format("YYYY-MM-DD hh mm ss");
    yield put(xoaHangBaySuccess(response.code, response.message, fakeid));
  } catch (error) {
    console.log(error);
  }
}

function* HangBaySaga() {
  yield takeEvery(LAY_DS_HANG_BAY, layDSHangBay)
  yield takeEvery(THEM_HANG_BAY, themHangBay)
  yield takeEvery(LAY_HANG_BAY_CAP_NHAT, layThongTinHangBayCapNhat)
  yield takeEvery(CHAP_NHAN_CAP_NHAT_HANG_BAY, capNhatHangBay)
  yield takeEvery(XOA_HANG_BAY, xoaHangBay)
}

export default HangBaySaga
