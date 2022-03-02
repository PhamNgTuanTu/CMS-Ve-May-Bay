//Include Both Helper File with needed methods
import { getLoaiNhanVien } from "helpers/backend_helper";
import { all, call, put, takeLatest } from "redux-saga/effects";
// Crypto Redux States
import { layDSLoaiNhanVienFail, layDSLoaiNhanVienSuccess } from "./actions";
import TaskActionTypes from './actionTypes';


function* layDSLoaiNhanVien({ payload: params }) {
  try {
    const response = yield call(getLoaiNhanVien);
    yield put(layDSLoaiNhanVienSuccess(response.data));
  } catch (error) {
    yield put(layDSLoaiNhanVienFail(error))
  }
}

export function* getData() {
  yield takeLatest(TaskActionTypes.LAY_DS_LOAI_NHAN_VIEN, layDSLoaiNhanVien);
}


function* LoaiNhanVienSaga() {
  yield all([
    call(getData),
  ]);
}

export default LoaiNhanVienSaga