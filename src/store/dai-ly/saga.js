import { call, put, takeEvery } from "redux-saga/effects"
import moment from "moment";
// Crypto Redux States
import { 
  LAY_DS_DAI_LY,  
  THEM_DAI_LY, 
  THEM_DAI_LY_FAIL,
  LAY_DAI_LY_CAP_NHAT,
  DAI_LY_CAP_NHAT,
  CHAP_NHAN_CAP_NHAT_DAI_LY,
  CAP_NHAT_DAI_LY_MESAGE,
  XOA_DAI_LY,
  XOA_DAI_LY_MESAGE
} from "./actionTypes"
import { 
  layDSDaiLySuccess, layDSDaiLyFail, 
  themDaiLySuccess, themDaiLyFail,
  layThongTinCapNhatDaiLy, daiLyCapNhat,
  capNhatDaiLySuccess, capNhatDaiLyFail,
  xoaDaiLySuccess, xoaDaiLyFail
} from "./actions"

//Include Both Helper File with needed methods
import { 
  getDaiLy, postThemMoiDaiLy, 
  putCapNhatDaiLy, deleteXoaDaiLy, 
  getDaiLyCapNhat 
} from "helpers/backend_helper"

function* layDSDaiLy({ payload: params }) {
  try {
    const response = yield call(getDaiLy, params);
    yield put(layDSDaiLySuccess(response.data));
  } catch (error) {
    yield put(layDSDaiLyFail(error))
  }
}

function* themDaiLy({ payload: params }) {
  try {
    const response = yield call(postThemMoiDaiLy, params);
    if(response.code) {
      //code = 400 
      //fakeid để biết response trả về mới => cập nhật store thông báo...  
      var fakeid =  moment(new Date()).format("YYYY-MM-DD hh mm ss");
      yield put(themDaiLySuccess(response.code, response.message, fakeid));
    } else {
      var data = response.data;
      yield put(themDaiLySuccess(response.status, response.message, data.id));
    }
  } catch (error) {
    console.log(error);
  }
}

function* capNhatDaiLy({ payload: params }) {
  try {
    const response = yield call(putCapNhatDaiLy, params);
    var fakeid =  moment(new Date()).format("YYYY-MM-DD hh mm ss");
    response.status ==="success" ? response.status = 200 : response.status = 400
    yield put(capNhatDaiLySuccess(response.status, response.message, fakeid));
  } catch (error) {
    console.log(error);
  }
}

function* layThongTinDaiLyCapNhat({ payload: params }) {
  try {
    const response = yield call(getDaiLyCapNhat, params);
    if(response.code === 200) {
      var data = response.data;
      var thongTin = {
        'id': data.id,
        'ten': data.ten,
        'ma_dai_ly': data.ma_dai_ly,
        'ten_dang_nhap': data.nhan_vien_dai_ly["ten_dang_nhap"],
        'ten_nguoi_dai_dien': data.nhan_vien_dai_ly["ho_ten"],
        'dien_thoai': data.nhan_vien_dai_ly["dien_thoai"], 
        'email': data.nhan_vien_dai_ly.["email"]
      }
      //console.log(thongTin)
      yield put(daiLyCapNhat(thongTin));
    } else {
      yield put(capNhatDaiLyFail(response.code, response.message));
    }
  } catch (error) {
    console.log(error);
  }
}

function* xoaDaiLy({ payload: params }) {
  try {
    const response = yield call(deleteXoaDaiLy, params);
    var fakeid =  moment(new Date()).format("YYYY-MM-DD hh mm ss");
    yield put(xoaDaiLySuccess(response.code, response.message, fakeid));
  } catch (error) {
    console.log(error);
  }
}

function* DaiLySaga() {
  yield takeEvery(LAY_DS_DAI_LY, layDSDaiLy)
  yield takeEvery(THEM_DAI_LY, themDaiLy)
  yield takeEvery(LAY_DAI_LY_CAP_NHAT, layThongTinDaiLyCapNhat)
  yield takeEvery(CHAP_NHAN_CAP_NHAT_DAI_LY, capNhatDaiLy)
  yield takeEvery(XOA_DAI_LY, xoaDaiLy)
}

export default DaiLySaga
