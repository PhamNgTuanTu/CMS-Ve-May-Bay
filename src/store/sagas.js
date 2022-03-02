import { all, fork } from "redux-saga/effects"

//public
import AuthSaga from "./auth/login/saga"
import LayoutSaga from "./layout/saga"

//đang làm
import QuenMatKhauSaga from "./auth/quen-mat-khau/saga"
import NhanVienSaga from "./nhan-vien/saga";
import DatChoSaga from "./tim-kiem-dat-cho/saga"
import DaiLySaga from "./dai-ly/saga";
import NhanVienDLSaga from "./nhan-vien-dai-ly/saga";
import HangBaySaga from "./hang-bay/saga";
import TuyenBaySaga from "./tuyen-bay/saga";
import SanBaySaga from "./san-bay/saga";
import VaiTroSaga from "./vai-tro/saga";
import VaiTroDaiLySaga from "./vai-tro-dai-ly/saga";
import LoaiNhanVienSaga from "./loai-nhan-vien/saga";
import ViTriSaga from "./vi-tri/saga";
import DashBoardSaga from "./trang-chu/saga";


export default function* rootSaga() {
  yield all([
    //public
    fork(AuthSaga),
    fork(LayoutSaga),
    //đang làm
    fork(QuenMatKhauSaga),
    fork(NhanVienSaga),
    fork(DatChoSaga),
    fork(DaiLySaga),
    fork(NhanVienDLSaga),
    fork(HangBaySaga),
    fork(TuyenBaySaga),
    fork(SanBaySaga),
    fork(VaiTroSaga),
    fork(VaiTroDaiLySaga),
    fork(LoaiNhanVienSaga),
    fork(ViTriSaga),
    fork(DashBoardSaga),
  ])
}