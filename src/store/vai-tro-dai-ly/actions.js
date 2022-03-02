import TaskActionTypes from './actionTypes';

export const layDSVaiTroDaiLy = (params) => ({
    type: TaskActionTypes.LAY_DS_VAI_TRO_DAI_LY,
    payload: params,
  })
  
  export const layDSVaiTroDaiLySuccess = responseData => ({
    type: TaskActionTypes.LAY_DS_VAI_TRO_DAI_LY_SUCCESS,
    payload: responseData,
  })
  
  export const layDSVaiTroDaiLyFail = thongBaoThatBai => ({
    type: TaskActionTypes.LAY_DS_VAI_TRO_DAI_LY_FAIL,
    payload: thongBaoThatBai,
  })