import {
  LAY_DS_NHAN_VIEN,
  LAY_DS_NHAN_VIEN_FAIL,
  LAY_DS_NHAN_VIEN_SUCCESS,
  THEM_NHAN_VIEN,
  THEM_NHAN_VIEN_MESAGE,
  THEM_NHAN_VIEN_FAIL,
  LAY_NHAN_VIEN_CAP_NHAT,
  NHAN_VIEN_CAP_NHAT,
  CHAP_NHAN_CAP_NHAT_NHAN_VIEN,
  CAP_NHAT_NHAN_VIEN_MESAGE,
  CAP_NHAT_NHAN_VIEN_FAIL,
  XOA_NHAN_VIEN,
  XOA_NHAN_VIEN_MESAGE,
  XOA_NHAN_VIEN_FAIL,
  XEM_CTIET_NHAN_VIEN,
  XEM_CTIET_NHAN_VIEN_FAIL,
  XEM_CTIET_NHAN_VIENL_SUCCESS,
} from "./actionTypes"

export const layDSNhanVien = (params) => ({
  type: LAY_DS_NHAN_VIEN,
  payload: params,
})

export const layDSNhanVienSuccess = responseData => ({
  type: LAY_DS_NHAN_VIEN_SUCCESS,
  payload: responseData,
})

export const layDSNhanVienFail = thongBaoThatBai => ({
  type: LAY_DS_NHAN_VIEN_FAIL,
  payload: thongBaoThatBai,
})

export const themNhanVien = nhanVien => ({
  type: THEM_NHAN_VIEN,
  payload: nhanVien,
})

export const themNhanVienSuccess = (status, thongBao, id) => ({
  type: THEM_NHAN_VIEN_MESAGE,
  payload: {status: status, message: thongBao, id: id},
})

export const themNhanVienFail = (status, thongBao) => ({
  type: THEM_NHAN_VIEN_FAIL,
  payload:{status: status, message: thongBao},
})

export const layThongTinCapNhat = id => ({
  type: LAY_NHAN_VIEN_CAP_NHAT,
  payload: {id: id},
})

export const nhanVienCapNhat = respone => ({
  type: NHAN_VIEN_CAP_NHAT,
  payload: respone,
})

export const chapNhanCapNhatNhanVien = params => ({
  type: CHAP_NHAN_CAP_NHAT_NHAN_VIEN,
  payload: params,
})

export const capNhatNhanVienSuccess = (status, thongBao, id) => ({
  type: CAP_NHAT_NHAN_VIEN_MESAGE,
  payload: {status: status, message: thongBao, id: id},
})

export const capNhatNhanVienFail = (status, thongBao) => ({
  type: CAP_NHAT_NHAN_VIEN_FAIL,
  payload: {status: status, message: thongBao},
})

export const xoaNhanVien = (params) => ({
  type: XOA_NHAN_VIEN,
  payload: params,
})

export const xoaNhanVienSuccess = (status, thongBao, id) => ({
  type: XOA_NHAN_VIEN_MESAGE,
  payload: {status: status, message: thongBao, id: id},
})

export const xoaNhanVienFail = nhanVien => ({
  type: DELETE_PROJECT_FAIL,
  payload: nhanVien,
})

export const xemChiTietNhanVien = idNhanVien => ({
  type: XEM_CTIET_NHAN_VIEN,
  idNhanVien,
})

export const xemChiTietNhanVienSuccess = nhanVien => ({
  type: XEM_CTIET_NHAN_VIENL_SUCCESS,
  payload: nhanVien,
})

export const xemChiTietNhanVienFail = thongBaoThatBai => ({
  type: XEM_CTIET_NHAN_VIEN_FAIL,
  payload: thongBaoThatBai,
})
