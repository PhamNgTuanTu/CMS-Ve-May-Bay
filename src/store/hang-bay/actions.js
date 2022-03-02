import {
  LAY_DS_HANG_BAY,
  LAY_DS_HANG_BAY_FAIL,
  LAY_DS_HANG_BAY_SUCCESS,
  THEM_HANG_BAY,
  THEM_HANG_BAY_MESAGE,
  THEM_HANG_BAY_FAIL,
  LAY_HANG_BAY_CAP_NHAT,
  HANG_BAY_CAP_NHAT,
  CHAP_NHAN_CAP_NHAT_HANG_BAY,
  CAP_NHAT_HANG_BAY_MESAGE,
  CAP_NHAT_HANG_BAY_FAIL,
  XOA_HANG_BAY,
  XOA_HANG_BAY_MESAGE,
  XOA_HANG_BAY_FAIL,
  XEM_CTIET_HANG_BAY,
  XEM_CTIET_HANG_BAY_FAIL,
  XEM_CTIET_HANG_BAY_SUCCESS,
} from "./actionTypes"

export const layDSHangBay = (params) => ({
  type: LAY_DS_HANG_BAY,
  payload: params,
})

export const layDSHangBaySuccess = responseData => ({
  type: LAY_DS_HANG_BAY_SUCCESS,
  payload: responseData,
})

export const layDSHangBayFail = thongBaoThatBai => ({
  type: LAY_DS_HANG_BAY_FAIL,
  payload: thongBaoThatBai,
})

export const themHangBay = hangBay => ({
  type: THEM_HANG_BAY,
  payload: hangBay,
})

export const themHangBaySuccess = (status, thongBao, id) => ({
  type: THEM_HANG_BAY_MESAGE,
  payload: {status: status, message: thongBao, id: id},
})

export const themHangBayFail = (status, thongBao) => ({
  type: THEM_HANG_BAY_FAIL,
  payload:{status: status, message: thongBao},
})

export const layThongTinCapNhatHangBay = id => ({
  type: LAY_HANG_BAY_CAP_NHAT,
  payload: {id: id},
})

export const hangBayCapNhat = respone => ({
  type: HANG_BAY_CAP_NHAT,
  payload: respone,
})

export const chapNhanCapNhatHangBay = params => ({
  type: CHAP_NHAN_CAP_NHAT_HANG_BAY,
  payload: params,
})

export const capNhatHangBaySuccess = (status, thongBao, id) => ({
  type: CAP_NHAT_HANG_BAY_MESAGE,
  payload: {status: status, message: thongBao, id: id},
})

export const capNhatHangBayFail = (status, thongBao) => ({
  type: CAP_NHAT_HANG_BAY_FAIL,
  payload: {status: status, message: thongBao},
})

export const xoaHangBay = (params) => ({
  type: XOA_HANG_BAY,
  payload: params,
})

export const xoaHangBaySuccess = (status, thongBao, id) => ({
  type: XOA_HANG_BAY_MESAGE,
  payload: {status: status, message: thongBao, id: id},
})

export const xoaHangBayFail = hangBay => ({
  type: DELETE_PROJECT_FAIL,
  payload: hangBay,
})

export const xemChiTietHangBay = idHangBay => ({
  type: XEM_CTIET_HANG_BAY,
  idHangBay,
})

export const xemChiTietHangBaySuccess = hangBay => ({
  type: XEM_CTIET_HANG_BAY_SUCCESS,
  payload: hangBay,
})

export const xemChiTietHangBayFail = thongBaoThatBai => ({
  type: XEM_CTIET_HANG_BAY_FAIL,
  payload: thongBaoThatBai,
})
