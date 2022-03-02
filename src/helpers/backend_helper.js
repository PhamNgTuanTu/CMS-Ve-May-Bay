import { del, get, getWithParams, post, put, postImg } from "./api_helper"
import * as url from "./url_helper"

// Chức năng resquest post đăng nhập
const postDangNhap = data => post(url.POST_DANGNHAP, data)

// Chức năng resquest post send mail - quên mật khẩu
const postQuenMatKhau = data => post(url.POST_QUEN_MAT_KHAU, data)
const putMatKhauMoi = data => put(url.PUT_MAT_KHAU_MOI, data)

// Chức năng nhân viên
const getNhanVien = data => getWithParams(url.GET_NHAN_VIEN, { params: data })
const getNhanVienCapNhat = params => getWithParams(url.GET_NHAN_VIEN_CAP_NHAT + "/" + params.id)
const postThemMoiNhanVien = data => post(url.POST_THEM_MOI_NHAN_VIEN, data)
const putCapNhatNhanVien = data => put(url.PUT_CAP_NHAT_NHAN_VIEN + "/" + data.params.id, data.body)
const deleteXoaNhanVien = data => del(url.DELETE_XOA_NHAT_NHAN_VIEN + "/" + data.params.id, { data: data.body })

// Chức năng đặt chỗ 
const getDatCho = data => getWithParams(url.GET_DAT_CHO, { params: data })

// Chức năng đại lý
const getDaiLy = data => getWithParams(url.GET_DAI_LY, { params: data })
const getDaiLyCapNhat = params => getWithParams(url.GET_DAI_LY_CAP_NHAT + "/" + params.id)
const postThemMoiDaiLy = data => post(url.POST_THEM_MOI_DAI_LY, data)
const putCapNhatDaiLy = data => put(url.PUT_CAP_NHAT_DAI_LY + "/" + data.params.id, data.body)
const deleteXoaDaiLy = data => del(url.DELETE_XOA_DAI_LY + "/" + data.params.id, { data: data.body })

// Chức năng nhân viên đại lý
const getNhanVienDL = data => getWithParams(url.GET_NHAN_VIEN_DL, { params: data })
const getNhanVienDLCapNhat = params => getWithParams(url.GET_NHAN_VIEN_DL_CAP_NHAT + "/" + params.id)
const postThemMoiNhanVienDL = data => post(url.POST_THEM_MOI_NHAN_VIEN_DL, data)
const putCapNhatNhanVienDL = data => put(url.PUT_CAP_NHAT_NHAN_VIEN_DL + "/" + data.params.id, data.body)
const deleteXoaNhanVienDL = data => del(url.DELETE_XOA_NHAN_VIEN_DL + "/" + data.params.id, { data: data.body })

// Chức năng hãng bay
const getHangBay = data => getWithParams(url.GET_HANG_BAY, { params: data })
const getHangBayCapNhat = params => getWithParams(url.GET_HANG_BAY_CAP_NHAT + "/" + params.id)
const postThemMoiHangBay = data => post(url.POST_THEM_MOI_HANG_BAY, data)
const putCapNhatHangBay = data => put(url.PUT_CAP_NHAT_HANG_BAY + "/" + data.params.id, data.body)
const deleteXoaHangBay = data => del(url.DELETE_XOA_HANG_BAY + "/" + data.params.id, { data: data.body })
// thêm logo
const postThemMoiLogo = data => postImg(url.POST_LOGO, data)

// Chức năng tuyến bay
const getTuyenBay = data => getWithParams(url.GET_TUYEN_BAY, { params: data })
const getTuyenBayCapNhat = params => getWithParams(url.GET_TUYEN_BAY_CAP_NHAT + "/" + params.id)
const postThemMoiTuyenBay = data => post(url.POST_THEM_MOI_TUYEN_BAY, data)
const putCapNhatTuyenBay = data => put(url.PUT_CAP_NHAT_TUYEN_BAY + "/" + data.params.id, data.body)
const deleteXoaTuyenBay = data => del(url.DELETE_XOA_TUYEN_BAY + "/" + data.params.id, { data: data.body })

// Chức năng sân bay
const getSanBay = data => getWithParams(url.GET_SAN_BAY, { params: data })
const getSanBayCapNhat = params => getWithParams(url.GET_SAN_BAY_CAP_NHAT + "/" + params.id)
const postThemMoiSanBay = data => post(url.POST_THEM_MOI_SAN_BAY, data)
const putCapNhatSanBay = data => put(url.PUT_CAP_NHAT_SAN_BAY + "/" + data.params.id, data.body)
const deleteXoaSanBay = data => del(url.DELETE_XOA_SAN_BAY + "/" + data.params.id, { data: data.body })

//lấy danh sách vai trò
const getVaiTro = () => getWithParams(url.GET_VAI_TRO)

//lấy danh sách vai trò
const getVaiTroDaiLy = () => getWithParams(url.GET_VAI_TRO_DAI_LY)

//lấy danh sách loại nhân viên
const getLoaiNhanVien = () => getWithParams(url.GET_LOAI_NHAN_VIEN)

//lấy danh sách tỉnh, khu vực, quốc gia
const getTinh = data => getWithParams(url.GET_TINH, { params: data })
const getKhuVuc = () => getWithParams(url.GET_KHU_VUC)
const getQuocGia = () => getWithParams(url.GET_QUOC_GIA)

// get dashboard charts data
export const getWeeklyData = () => get(url.GET_WEEKLY_DATA)
export const getYearlyData = () => get(url.GET_YEARLY_DATA)
export const getMonthlyData = () => get(url.GET_MONTHLY_DATA)


// Gets the logged in user data from local session
const getLoggedInUser = () => {
  const user = localStorage.getItem("user")
  if (user) return JSON.parse(user)
  return null
}

//is user is logged in
const isUserAuthenticated = () => {
  return getLoggedInUser() !== null
}

export {
  getLoggedInUser,
  isUserAuthenticated,
  postDangNhap,
  postQuenMatKhau,
  putMatKhauMoi,
  getNhanVien,
  postThemMoiNhanVien,
  putCapNhatNhanVien,
  deleteXoaNhanVien,
  getNhanVienCapNhat,
  getDatCho,
  getDaiLy,
  postThemMoiDaiLy,
  putCapNhatDaiLy,
  deleteXoaDaiLy,
  getDaiLyCapNhat,
  getNhanVienDL,
  postThemMoiNhanVienDL,
  putCapNhatNhanVienDL,
  deleteXoaNhanVienDL,
  getNhanVienDLCapNhat,
  getHangBay,
  postThemMoiHangBay,
  putCapNhatHangBay,
  deleteXoaHangBay,
  getHangBayCapNhat,
  getTuyenBay,
  postThemMoiTuyenBay,
  putCapNhatTuyenBay,
  deleteXoaTuyenBay,
  getTuyenBayCapNhat,
  getSanBay,
  getSanBayCapNhat,
  postThemMoiSanBay,
  putCapNhatSanBay,
  deleteXoaSanBay,
  getVaiTro,
  getVaiTroDaiLy,
  getLoaiNhanVien,
  getTinh,
  getKhuVuc,
  getQuocGia,
  postThemMoiLogo,
}

