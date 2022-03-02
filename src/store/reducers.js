import { combineReducers } from "redux"

// Front
import Layout from "./layout/reducer"

// Authentication
import Login from "./auth/login/reducer"
import QuenMatKhau from "./auth/quen-mat-khau/reducer"

//Cms
import NhanVien from "./nhan-vien/reducer"
import DaiLy from "./dai-ly/reducer"
import DanhSachDatCho from './tim-kiem-dat-cho/reducer'
import NhanVienDL from "./nhan-vien-dai-ly/reducer"
import HangBay from "./hang-bay/reducer"
import TuyenBay from "./tuyen-bay/reducer"
import SanBay from "./san-bay/reducer"
import VaiTro from "./vai-tro/reducer"
import VaiTroDaiLy from "./vai-tro-dai-ly/reducer"
import LoaiNhanVien from "./loai-nhan-vien/reducer"
import ViTri from "./vi-tri/reducer"
import DashBoard from "./trang-chu/reducer"


const rootReducer = combineReducers({
  // public
  Layout,
  Login,
  QuenMatKhau,
  NhanVien,
  DaiLy,
  DanhSachDatCho,
  NhanVienDL,
  HangBay,
  TuyenBay,
  SanBay,
  VaiTro,
  VaiTroDaiLy,
  LoaiNhanVien,
  ViTri,
  DashBoard,
})

export default rootReducer