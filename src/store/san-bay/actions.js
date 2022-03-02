import {
  LAY_DS_SAN_BAY,
  LAY_DS_SAN_BAY_FAIL,
  LAY_DS_SAN_BAY_SUCCESS,
  THEM_SAN_BAY,
  THEM_SAN_BAY_MESAGE,
  THEM_SAN_BAY_FAIL,
  LAY_SAN_BAY_CAP_NHAT,
  SAN_BAY_CAP_NHAT,
  CHAP_NHAN_CAP_NHAT_SAN_BAY,
  CAP_NHAT_SAN_BAY_MESAGE,
  CAP_NHAT_SAN_BAY_FAIL,
  XOA_SAN_BAY,
  XOA_SAN_BAY_MESAGE,
  XOA_SAN_BAY_FAIL,
  XEM_CTIET_SAN_BAY,
  XEM_CTIET_SAN_BAY_FAIL,
  XEM_CTIET_SAN_BAY_SUCCESS,
} from "./actionTypes"

export const layDSSanBay = (params) => ({
  type: LAY_DS_SAN_BAY,
  payload: params,
})

export const layDSSanBaySuccess = responseData => ({
  type: LAY_DS_SAN_BAY_SUCCESS,
  payload: responseData,
})

export const layDSSanBayFail = thongBaoThatBai => ({
  type: LAY_DS_SAN_BAY_FAIL,
  payload: thongBaoThatBai,
})

export const themSanBay = sanBay => ({
  type: THEM_SAN_BAY,
  payload: sanBay,
})

export const themSanBaySuccess = (status, thongBao, id) => ({
  type: THEM_SAN_BAY_MESAGE,
  payload: {status: status, message: thongBao, id: id},
})

export const themSanBayFail = (status, thongBao) => ({
  type: THEM_SAN_BAY_FAIL,
  payload:{status: status, message: thongBao},
})

export const layThongTinCapNhatSanBay = id => ({
  type: LAY_SAN_BAY_CAP_NHAT,
  payload: {id: id},
})

export const sanBayCapNhat = respone => ({
  type: SAN_BAY_CAP_NHAT,
  payload: respone,
})

export const chapNhanCapNhatSanBay = params => ({
  type: CHAP_NHAN_CAP_NHAT_SAN_BAY,
  payload: params,
})

export const capNhatSanBaySuccess = (status, thongBao, id) => ({
  type: CAP_NHAT_SAN_BAY_MESAGE,
  payload: {status: status, message: thongBao, id: id},
})

export const capNhatSanBayFail = (status, thongBao) => ({
  type: CAP_NHAT_SAN_BAY_FAIL,
  payload: {status: status, message: thongBao},
})

export const xoaSanBay = (params) => ({
  type: XOA_SAN_BAY,
  payload: params,
})

export const xoaSanBaySuccess = (status, thongBao, id) => ({
  type: XOA_SAN_BAY_MESAGE,
  payload: {status: status, message: thongBao, id: id},
})

export const xoaSanBayFail = sanBay => ({
  type: DELETE_PROJECT_FAIL,
  payload: sanBay,
})

export const xemChiTietSanBay = idSanBay => ({
  type: XEM_CTIET_SAN_BAY,
  idSanBay,
})

export const xemChiTietSanBaySuccess = sanBay => ({
  type: XEM_CTIET_SAN_BAY_SUCCESS,
  payload: sanBay,
})

export const xemChiTietSanBayFail = thongBaoThatBai => ({
  type: XEM_CTIET_SAN_BAY_FAIL,
  payload: thongBaoThatBai,
})
