import React from "react"
import { Redirect } from "react-router-dom"

// Authentication related pages
import Login from "../pages/Authentication/Login"
import Logout from "../pages/Authentication/Logout"
import QuenMatKhau from "../pages/Authentication/quen-mat-khau"
import CapNhatMatKhauMoi from "../pages/Authentication/cap-nhat-mat-khau-moi"

// Dashboard
import Dashboard from "../pages/Dashboard/index"

// Cms Nhân viên
import NhanVien from "../pages/nhan-vien/danh-sach"
import FormThemSua from "pages/nhan-vien/Form-Them-Sua"
// Cms Đặt chỗ
import TimKiemDatCho from "../pages/dat-cho/danh-sach"

// Cms Đại lý
import DaiLy from "../pages/dai-ly/danh-sach"
import FormThemSuaDaiLy from "../pages/dai-ly/Form-Them-Sua";

// Cms Nhân viên đại lý
import NhanVienDaiLy from "../pages/nhan-vien-dai-ly/danh-sach"
import FormThemSuaNVDaiLy from "pages/nhan-vien-dai-ly/Form-Them-Sua"


// Cms Hãng bay
import HangBay from "../pages/hang-bay/danh-sach"

//Cms tuyến bay
import TuyenBay from "../pages/tuyen-bay/danh-sach"

//Cms Sân bay
import SanBay from "../pages/san-bay/danh-sach"


const userRoutes = [
  { path: "/", component: Dashboard },

  //Quản lý Nhân viên
  { path: "/nhan-vien", component: NhanVien },
  { path: "/nhan-vien/them-moi", component: FormThemSua },
  { path: "/nhan-vien/cap-nhat/:id", component: FormThemSua },

  //Quản lý đặt chỗ
  { path: "/dat-cho", component: TimKiemDatCho },

  //Quản lý đại lý
  { path: "/dai-ly", component: DaiLy },
  { path: "/dai-ly/them-moi", component: FormThemSuaDaiLy },
  { path: "/dai-ly/cap-nhat/:id", component: FormThemSuaDaiLy },


  //Quản lý nhân viên đại lý
  { path: "/dai-ly/nhan-vien", component: NhanVienDaiLy },
  { path: "/dai-ly/nhan-vien/them-moi", component: FormThemSuaNVDaiLy },
  { path: "/dai-ly/nhan-vien/cap-nhat/:id", component: FormThemSuaNVDaiLy },

  //Quản lý hãng bay
  { path: "/hang-bay", component: HangBay },

  //Quản lý tuyến bay
  { path: "/tuyen-bay", component: TuyenBay },

  //Quản lý sân bay
  { path: "/san-bay", component: SanBay },

  // this route should be at the end of all other routes
  { path: "/", exact: true, component: () => <Redirect to="/" /> },
]

const authRoutes = [
  { path: "/logout", component: Logout },
  { path: "/dang-nhap", component: Login },
  { path: "/quen-mat-khau", component: QuenMatKhau },
  { path: "/cap-nhat-mat-khau-moi", component: CapNhatMatKhauMoi },
]

export { userRoutes, authRoutes }