import TaskActionTypes from './actionTypes';

export const getChartsData = (params) => ({
    type: TaskActionTypes.GET_CHARTS_DATA,
    payload: params,
  })
  
  export const getChartsDataSuccess = responseData => ({
    type: TaskActionTypes.GET_CHARTS_DATA_SUCCESS,
    payload: responseData,
  })
  
  export const getChartsDataFail = thongBaoThatBai => ({
    type: TaskActionTypes.GET_CHARTS_DATA_FAIL,
    payload: thongBaoThatBai,
  })

  export const getOrders = () => ({
    type: TaskActionTypes.GET_ORDERS,
  })
  
  export const getOrdersSuccess = orders => ({
    type: TaskActionTypes.GET_ORDERS_SUCCESS,
    payload: orders,
  })
  
  export const getOrdersFail = error => ({
    type: TaskActionTypes.GET_ORDERS_FAIL,
    payload: error,
  })