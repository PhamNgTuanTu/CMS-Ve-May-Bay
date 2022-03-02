import { call, put, takeEvery } from "redux-saga/effects"
import moment from "moment";
// Crypto Redux States
import { 
  LAY_DS_NHAN_VIEN,  
  THEM_NHAN_VIEN, 
  THEM_NHAN_VIEN_FAIL,
  LAY_NHAN_VIEN_CAP_NHAT,
  NHAN_VIEN_CAP_NHAT,
  CHAP_NHAN_CAP_NHAT_NHAN_VIEN,
  CAP_NHAT_NHAN_VIEN_MESAGE,
  XOA_NHAN_VIEN,
  XOA_NHAN_VIEN_MESAGE
} from "./actionTypes"
import { 
  layDSNhanVienSuccess, layDSNhanVienFail, 
  themNhanVienSuccess, themNhanVienFail,
  layThongTinCapNhat, nhanVienCapNhat,
  capNhatNhanVienSuccess, capNhatNhanVienFail,
  xoaNhanVienSuccess, xoaNhanVienFail
} from "./actions"

//Include Both Helper File with needed methods
import { 
  getNhanVien, postThemMoiNhanVien, 
  putCapNhatNhanVien, deleteXoaNhanVien, 
  getNhanVienCapNhat 
} from "helpers/backend_helper"

function* layDSNhanVien({ payload: params }) {
  try {
    const response = yield call(getNhanVien, params);
    yield put(layDSNhanVienSuccess(response.data));
  } catch (error) {
    yield put(layDSNhanVienFail(error))
  }
}

function* themNhanVien({ payload: params }) {
  try {
    const response = yield call(postThemMoiNhanVien, params);
    if(response.code) {
      //code = 400 
      //fakeid để biết response trả về mới => cập nhật store thông báo...  
      var fakeid =  moment(new Date()).format("YYYY-MM-DD hh mm ss");
      yield put(themNhanVienSuccess(response.code, response.message, fakeid));
    } else {
      var data = response.data;
      yield put(themNhanVienSuccess(response.status, response.message, data.id));
    }
  } catch (error) {
    console.log(error);
  }
}

function* capNhatNhanVien({ payload: params }) {
  try {
    const response = yield call(putCapNhatNhanVien, params);
    var fakeid =  moment(new Date()).format("YYYY-MM-DD hh mm ss");
    response.status ==="success" ? response.status = 200 : response.status = 400
    yield put(capNhatNhanVienSuccess(response.status, response.message, fakeid));
  } catch (error) {
    console.log(error);
  }
}

function* layThongTinNhanVienCapNhat({ payload: params }) {
  try {
    const response = yield call(getNhanVienCapNhat, params);
    if(response.code === 200) {
      var data = response.data;
      var vaiTro = data.vai_tro;
      var thongTin = {
        'id': data.id,
        'ten_dang_nhap': data.ten_dang_nhap,
        'ho_ten': data.ho_ten,
        'email': data.email,
        'dien_thoai': data.dien_thoai,
        'vai_tro_id': vaiTro.id, 
        'trang_thai': data.trang_thai === true ? 1 : 0,
        'only_trang_thai': 0
      }
      //console.log(thongTin)
      yield put(nhanVienCapNhat(thongTin));
    } else {
      yield put(capNhatNhanVienFail(response.code, response.message));
    }
  } catch (error) {
    console.log(error);
  }
}

function* xoaNhanVien({ payload: params }) {
  try {
    const response = yield call(deleteXoaNhanVien, params);
    var fakeid =  moment(new Date()).format("YYYY-MM-DD hh mm ss");
    yield put(xoaNhanVienSuccess(response.status, response.message, fakeid));
  } catch (error) {
    console.log(error);
  }
}

function* NhanVienSaga() {
  yield takeEvery(LAY_DS_NHAN_VIEN, layDSNhanVien)
  yield takeEvery(THEM_NHAN_VIEN, themNhanVien)
  yield takeEvery(LAY_NHAN_VIEN_CAP_NHAT, layThongTinNhanVienCapNhat)
  yield takeEvery(CHAP_NHAN_CAP_NHAT_NHAN_VIEN, capNhatNhanVien)
  yield takeEvery(XOA_NHAN_VIEN, xoaNhanVien)
}

export default NhanVienSaga
