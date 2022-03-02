import { call, put, takeEvery } from "redux-saga/effects"
import moment from "moment";
// Crypto Redux States
import { 
  LAY_DS_SAN_BAY,  
  THEM_SAN_BAY, 
  THEM_SAN_BAY_FAIL,
  LAY_SAN_BAY_CAP_NHAT,
  SAN_BAY_CAP_NHAT,
  CHAP_NHAN_CAP_NHAT_SAN_BAY,
  CAP_NHAT_SAN_BAY_MESAGE,
  XOA_SAN_BAY,
  XOA_SAN_BAY_MESAGE
} from "./actionTypes"
import { 
  layDSSanBaySuccess, layDSSanBayFail, 
  themSanBaySuccess, themSanBayFail,
  layThongTinCapNhatSanBay, sanBayCapNhat,
  capNhatSanBaySuccess, capNhatSanBayFail,
  xoaSanBaySuccess, xoaSanBayFail
} from "./actions"

//Include Both Helper File with needed methods
import { 
  getSanBay, postThemMoiSanBay, 
  putCapNhatSanBay, deleteXoaSanBay, 
  getSanBayCapNhat 
} from "helpers/backend_helper"

function* layDSSanBay({ payload: params }) {
  try {
    const response = yield call(getSanBay, params);
    // console.log(params)
    // console.log(response)
    yield put(layDSSanBaySuccess(response.data));
  } catch (error) {
    yield put(layDSSanBayFail(error))
  }
}

function* themSanBay({ payload: params }) {
  try {
    const response = yield call(postThemMoiSanBay, params);
    if(response.code) {
      //code = 400 
      //fakeid để biết response trả về mới => cập nhật store thông báo...  
      var fakeid =  moment(new Date()).format("YYYY-MM-DD hh mm ss");
      yield put(themSanBaySuccess(response.code, response.message, fakeid));
    } else {
      var data = response.data;
      yield put(themSanBaySuccess(response.status, response.message, data.id));
    }
  } catch (error) {
    console.log(error);
  }
}

function* capNhatSanBay({ payload: params }) {
  try {
    const response = yield call(putCapNhatSanBay, params);
    var fakeid =  moment(new Date()).format("YYYY-MM-DD hh mm ss");
    response.status ==="success" ? response.status = 200 : response.status = 400
    yield put(capNhatSanBaySuccess(response.status, response.message, fakeid));
  } catch (error) {
    console.log(error);
  }
}

function* layThongTinSanBayCapNhat({ payload: params }) {
  try {
    const response = yield call(getSanBayCapNhat, params);
    if(response.code === 200) {
      var data = response.data;
      var thongTin = {
        'id': data.id,
        'ten': data.ten,
        'ten_tat': data.ten_tat,
        'quoc_gia_id': data.quoc_gia_id,
        'khu_vuc_id': data.khu_vuc_id,
        'tinh_id': data.tinh_id, 
      }
      //console.log(thongTin)
      yield put(sanBayCapNhat(thongTin));
    } else {
      yield put(capNhatSanBayFail(response.code, response.message));
    }
  } catch (error) {
    console.log(error);
  }
}

function* xoaSanBay({ payload: params }) {
  try {
    const response = yield call(deleteXoaSanBay, params);
    var fakeid =  moment(new Date()).format("YYYY-MM-DD hh mm ss");
    yield put(xoaSanBaySuccess(response.code, response.message, fakeid));
  } catch (error) {
    console.log(error);
  }
}

function* SanBaySaga() {
  yield takeEvery(LAY_DS_SAN_BAY, layDSSanBay)
  yield takeEvery(THEM_SAN_BAY, themSanBay)
  yield takeEvery(LAY_SAN_BAY_CAP_NHAT, layThongTinSanBayCapNhat)
  yield takeEvery(CHAP_NHAN_CAP_NHAT_SAN_BAY, capNhatSanBay)
  yield takeEvery(XOA_SAN_BAY, xoaSanBay)
}

export default SanBaySaga
