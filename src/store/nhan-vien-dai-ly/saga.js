import { call, put, takeEvery } from "redux-saga/effects"
import moment from "moment";
// Crypto Redux States
import { 
  LAY_DS_NHAN_VIEN_DL,  
  THEM_NHAN_VIEN_DL, 
  THEM_NHAN_VIEN_DL_FAIL,
  LAY_NHAN_VIEN_DL_CAP_NHAT,
  NHAN_VIEN_DL_CAP_NHAT,
  CHAP_NHAN_CAP_NHAT_NHAN_VIEN_DL,
  CAP_NHAT_NHAN_VIEN_DL_MESAGE,
  XOA_NHAN_VIEN_DL,
  XOA_NHAN_VIEN_DL_MESAGE
} from "./actionTypes"
import { 
  layDSNhanVienDLSuccess, layDSNhanVienDLFail, 
  themNhanVienDLSuccess, themNhanVienDLFail,
  layThongTinCapNhatNhanVienDL, nhanVienDLCapNhat,
  capNhatNhanVienDLSuccess, capNhatNhanVienDLFail,
  xoaNhanVienDLSuccess, xoaNhanVienDLFail
} from "./actions"

//Include Both Helper File with needed methods
import { 
  getNhanVienDL, postThemMoiNhanVienDL, 
  putCapNhatNhanVienDL, deleteXoaNhanVienDL, 
  getNhanVienDLCapNhat 
} from "helpers/backend_helper"

function* layDSNhanVienDL({ payload: params }) {
  try {
    const response = yield call(getNhanVienDL, params);
    yield put(layDSNhanVienDLSuccess(response.data));
  } catch (error) {
    yield put(layDSNhanVienDLFail(error))
  }
}

function* themNhanVienDL({ payload: params }) {
  try {
    const response = yield call(postThemMoiNhanVienDL, params);
    if(response.code) {
      //code = 400 
      //fakeid để biết response trả về mới => cập nhật store thông báo...  
      var fakeid =  moment(new Date()).format("YYYY-MM-DD hh mm ss");
      yield put(themNhanVienDLSuccess(response.code, response.message, fakeid));
    } else {
      var data = response.data;
      yield put(themNhanVienDLSuccess(response.status, response.message, data.id));
    }
  } catch (error) {
    console.log(error);
  }
}

function* capNhatNhanVienDL({ payload: params }) {
  try {
    const response = yield call(putCapNhatNhanVienDL, params);
    var fakeid =  moment(new Date()).format("YYYY-MM-DD hh mm ss");
    response.status ==="success" ? response.status = 200 : response.status = 400
    yield put(capNhatNhanVienDLSuccess(response.status, response.message, fakeid));
  } catch (error) {
    console.log(error);
  }
}

function* layThongTinNhanVienDLCapNhat({ payload: params }) {
  try {
    const response = yield call(getNhanVienDLCapNhat, params);
    if(response.code === 200) {
      var data = response.data;
      var thongTin = {
        'id': data.id,
        'ten_dang_nhap': data.ten_dang_nhap,
        'ho_ten': data.ho_ten,
        'email': data.email,
        'dien_thoai': data.dien_thoai,
        'loai_nhan_vien_id': data.loai_nhan_vien["id"],
        'dai_ly_id': data.dai_ly_id,  
        'trang_thai': data.trang_thai === true ? 1 : 0,
        'vai_tro_dai_ly_id' : data.vai_tro_dai_ly.id,
        'only_trang_thai': 0
      }
      //console.log(nhanVienDLCapNhat(thongTin))
      yield put(nhanVienDLCapNhat(thongTin));
    } else {
      yield put(capNhatNhanVienDLFail(response.code, response.message));
    }
  } catch (error) {
    console.log(error);
  }
}

function* xoaNhanVienDL({ payload: params }) {
  try {
    const response = yield call(deleteXoaNhanVienDL, params);
    var fakeid =  moment(new Date()).format("YYYY-MM-DD hh mm ss");
    yield put(xoaNhanVienDLSuccess(response.code, response.message, fakeid));
  } catch (error) {
    console.log(error);
  }
}

function* NhanVienDLSaga() {
  yield takeEvery(LAY_DS_NHAN_VIEN_DL, layDSNhanVienDL)
  yield takeEvery(THEM_NHAN_VIEN_DL, themNhanVienDL)
  yield takeEvery(LAY_NHAN_VIEN_DL_CAP_NHAT, layThongTinNhanVienDLCapNhat)
  yield takeEvery(CHAP_NHAN_CAP_NHAT_NHAN_VIEN_DL, capNhatNhanVienDL)
  yield takeEvery(XOA_NHAN_VIEN_DL, xoaNhanVienDL)
}

export default NhanVienDLSaga
