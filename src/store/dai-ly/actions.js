import {
  LAY_DS_DAI_LY,
  LAY_DS_DAI_LY_FAIL,
  LAY_DS_DAI_LY_SUCCESS,
  THEM_DAI_LY,
  THEM_DAI_LY_MESAGE,
  THEM_DAI_LY_FAIL,
  LAY_DAI_LY_CAP_NHAT,
  DAI_LY_CAP_NHAT,
  CHAP_NHAN_CAP_NHAT_DAI_LY,
  CAP_NHAT_DAI_LY_MESAGE,
  CAP_NHAT_DAI_LY_FAIL,
  XOA_DAI_LY,
  XOA_DAI_LY_MESAGE,
  XOA_DAI_LY_FAIL,
  XEM_CTIET_DAI_LY,
  XEM_CTIET_DAI_LY_FAIL,
  XEM_CTIET_DAI_LY_SUCCESS,
} from "./actionTypes"

export const layDSDaiLy = (params) => ({
  type: LAY_DS_DAI_LY,
  payload: params,
})

export const layDSDaiLySuccess = responseData => ({
  type: LAY_DS_DAI_LY_SUCCESS,
  payload: responseData,
})

export const layDSDaiLyFail = thongBaoThatBai => ({
  type: LAY_DS_DAI_LY_FAIL,
  payload: thongBaoThatBai,
})

export const themDaiLy = daiLy => ({
  type: THEM_DAI_LY,
  payload: daiLy,
})

export const themDaiLySuccess = (status, thongBao, id) => ({
  type: THEM_DAI_LY_MESAGE,
  payload: {status: status, message: thongBao, id: id},
})

export const themDaiLyFail = (status, thongBao) => ({
  type: THEM_DAI_LY_FAIL,
  payload:{status: status, message: thongBao},
})

export const layThongTinCapNhatDaiLy = id => ({
  type: LAY_DAI_LY_CAP_NHAT,
  payload: {id: id},
})

export const daiLyCapNhat = respone => ({
  type: DAI_LY_CAP_NHAT,
  payload: respone,
})

export const chapNhanCapNhatDaiLy = params => ({
  type: CHAP_NHAN_CAP_NHAT_DAI_LY,
  payload: params,
})

export const capNhatDaiLySuccess = (status, thongBao, id) => ({
  type: CAP_NHAT_DAI_LY_MESAGE,
  payload: {status: status, message: thongBao, id: id},
})

export const capNhatDaiLyFail = (status, thongBao) => ({
  type: CAP_NHAT_DAI_LY_FAIL,
  payload: {status: status, message: thongBao},
})

export const xoaDaiLy = (params) => ({
  type: XOA_DAI_LY,
  payload: params,
})

export const xoaDaiLySuccess = (status, thongBao, id) => ({
  type: XOA_DAI_LY_MESAGE,
  payload: {status: status, message: thongBao, id: id},
})

export const xoaDaiLyFail = daiLy => ({
  type: DELETE_PROJECT_FAIL,
  payload: daiLy,
})

export const xemChiTietDaiLy = idDaiLy => ({
  type: XEM_CTIET_DAI_LY,
  idDaiLy,
})

export const xemChiTietDaiLySuccess = daiLy => ({
  type: XEM_CTIET_DAI_LY_SUCCESS,
  payload: daiLy,
})

export const xemChiTietDaiLyFail = thongBaoThatBai => ({
  type: XEM_CTIET_DAI_LY_FAIL,
  payload: thongBaoThatBai,
})
