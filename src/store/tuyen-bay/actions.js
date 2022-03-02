import {
  LAY_DS_TUYEN_BAY,
  LAY_DS_TUYEN_BAY_FAIL,
  LAY_DS_TUYEN_BAY_SUCCESS,
  THEM_TUYEN_BAY,
  THEM_TUYEN_BAY_MESAGE,
  THEM_TUYEN_BAY_FAIL,
  LAY_TUYEN_BAY_CAP_NHAT,
  TUYEN_BAY_CAP_NHAT,
  CHAP_NHAN_CAP_NHAT_TUYEN_BAY,
  CAP_NHAT_TUYEN_BAY_MESAGE,
  CAP_NHAT_TUYEN_BAY_FAIL,
  XOA_TUYEN_BAY,
  XOA_TUYEN_BAY_MESAGE,
  XOA_TUYEN_BAY_FAIL,
  XEM_CTIET_TUYEN_BAY,
  XEM_CTIET_TUYEN_BAY_FAIL,
  XEM_CTIET_TUYEN_BAY_SUCCESS,
} from "./actionTypes"

export const layDSTuyenBay = (params) => ({
  type: LAY_DS_TUYEN_BAY,
  payload: params,
})

export const layDSTuyenBaySuccess = responseData => ({
  type: LAY_DS_TUYEN_BAY_SUCCESS,
  payload: responseData,
})

export const layDSTuyenBayFail = thongBaoThatBai => ({
  type: LAY_DS_TUYEN_BAY_FAIL,
  payload: thongBaoThatBai,
})

export const themTuyenBay = tuyenBay => ({
  type: THEM_TUYEN_BAY,
  payload: tuyenBay,
})

export const themTuyenBaySuccess = (status, thongBao, id) => ({
  type: THEM_TUYEN_BAY_MESAGE,
  payload: {status: status, message: thongBao, id: id},
})

export const themTuyenBayFail = (status, thongBao) => ({
  type: THEM_TUYEN_BAY_FAIL,
  payload:{status: status, message: thongBao},
})

export const layThongTinCapNhatTuyenBay = id => ({
  type: LAY_TUYEN_BAY_CAP_NHAT,
  payload: {id: id},
})

export const TuyenBayCapNhat = respone => ({
  type: TUYEN_BAY_CAP_NHAT,
  payload: respone,
})

export const chapNhanCapNhatTuyenBay = params => ({
  type: CHAP_NHAN_CAP_NHAT_TUYEN_BAY,
  payload: params,
})

export const capNhatTuyenBaySuccess = (status, thongBao, id) => ({
  type: CAP_NHAT_TUYEN_BAY_MESAGE,
  payload: {status: status, message: thongBao, id: id},
})

export const capNhatTuyenBayFail = (status, thongBao) => ({
  type: CAP_NHAT_TUYEN_BAY_FAIL,
  payload: {status: status, message: thongBao},
})

export const xoaTuyenBay = (params) => ({
  type: XOA_TUYEN_BAY,
  payload: params,
})

export const xoaTuyenBaySuccess = (status, thongBao, id) => ({
  type: XOA_TUYEN_BAY_MESAGE,
  payload: {status: status, message: thongBao, id: id},
})

export const xoaTuyenBayFail = tuyenBay => ({
  type: DELETE_PROJECT_FAIL,
  payload: tuyenBay,
})

export const xemChiTietTuyenBay = idTuyenBay => ({
  type: XEM_CTIET_TUYEN_BAY,
  idTuyenBay,
})

export const xemChiTietTuyenBaySuccess = tuyenBay => ({
  type: XEM_CTIET_TUYEN_BAY_SUCCESS,
  payload: tuyenBay,
})

export const xemChiTietTuyenBayFail = thongBaoThatBai => ({
  type: XEM_CTIET_TUYEN_BAY_FAIL,
  payload: thongBaoThatBai,
})
