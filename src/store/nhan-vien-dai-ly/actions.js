import {
  LAY_DS_NHAN_VIEN_DL,
  LAY_DS_NHAN_VIEN_DL_FAIL,
  LAY_DS_NHAN_VIEN_DL_SUCCESS,
  THEM_NHAN_VIEN_DL,
  THEM_NHAN_VIEN_DL_MESAGE,
  THEM_NHAN_VIEN_DL_FAIL,
  LAY_NHAN_VIEN_DL_CAP_NHAT,
  NHAN_VIEN_DL_CAP_NHAT,
  CHAP_NHAN_CAP_NHAT_NHAN_VIEN_DL,
  CAP_NHAT_NHAN_VIEN_DL_MESAGE,
  CAP_NHAT_NHAN_VIEN_DL_FAIL,
  XOA_NHAN_VIEN_DL,
  XOA_NHAN_VIEN_DL_MESAGE,
  XOA_NHAN_VIEN_DL_FAIL,
  XEM_CTIET_NHAN_VIEN_DL,
  XEM_CTIET_NHAN_VIEN_DL_FAIL,
  XEM_CTIET_NHAN_VIEN_SUCCESS,
} from "./actionTypes"

export const layDSNhanVienDL = (params) => ({
  type: LAY_DS_NHAN_VIEN_DL,
  payload: params,
})

export const layDSNhanVienDLSuccess = responseData => ({
  type: LAY_DS_NHAN_VIEN_DL_SUCCESS,
  payload: responseData,
})

export const layDSNhanVienDLFail = thongBaoThatBai => ({
  type: LAY_DS_NHAN_VIEN_DL_FAIL,
  payload: thongBaoThatBai,
})

export const themNhanVienDL = nhanVienDL => ({
  type: THEM_NHAN_VIEN_DL,
  payload: nhanVienDL,
})

export const themNhanVienDLSuccess = (status, thongBao, id) => ({
  type: THEM_NHAN_VIEN_DL_MESAGE,
  payload: {status: status, message: thongBao, id: id},
})

export const themNhanVienDLFail = (status, thongBao) => ({
  type: THEM_NHAN_VIEN_DL_FAIL,
  payload:{status: status, message: thongBao},
})

export const layThongTinCapNhatNhanVienDL = id => ({
  type: LAY_NHAN_VIEN_DL_CAP_NHAT,
  payload: {id: id},
})

export const nhanVienDLCapNhat = respone => ({
  type: NHAN_VIEN_DL_CAP_NHAT,
  payload: respone,
})

export const chapNhanCapNhatNhanVienDL = params => ({
  type: CHAP_NHAN_CAP_NHAT_NHAN_VIEN_DL,
  payload: params,
})

export const capNhatNhanVienDLSuccess = (status, thongBao, id) => ({
  type: CAP_NHAT_NHAN_VIEN_DL_MESAGE,
  payload: {status: status, message: thongBao, id: id},
})

export const capNhatNhanVienDLFail = (status, thongBao) => ({
  type: CAP_NHAT_NHAN_VIEN_DL_FAIL,
  payload: {status: status, message: thongBao},
})

export const xoaNhanVienDL = (params) => ({
  type: XOA_NHAN_VIEN_DL,
  payload: params,
})

export const xoaNhanVienDLSuccess = (status, thongBao, id) => ({
  type: XOA_NHAN_VIEN_DL_MESAGE,
  payload: {status: status, message: thongBao, id: id},
})

export const xoaNhanVienDLFail = nhanVienDL => ({
  type: DELETE_PROJECT_FAIL,
  payload: nhanVienDL,
})

export const xemChiTietNhanVienDL = idNhanVienDL => ({
  type: XEM_CTIET_NHAN_VIEN_DL,
  idNhanVienDL,
})

export const xemChiTietNhanVienDLSuccess = nhanVienDL => ({
  type: XEM_CTIET_NHAN_VIEN_DL_SUCCESS,
  payload: nhanVienDL,
})

export const xemChiTietNhanVienDLFail = thongBaoThatBai => ({
  type: XEM_CTIET_NHAN_VIEN_DL_FAIL,
  payload: thongBaoThatBai,
})
