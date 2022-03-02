import TaskActionTypes from './actionTypes';

const INIT_STATE = {
  chartData: [],
  orders: [],
  loading: false,
}

const Dashboard = (state = INIT_STATE, action) => {
  switch (action.type) {
    case TaskActionTypes.GET_CHARTS_DATA:
    case TaskActionTypes.GET_ORDERS:
      return {
        ...state,
        loading: true,
      }

    case TaskActionTypes.GET_CHARTS_DATA_SUCCESS:
      return {
        ...state,
        chartData: action.payload,
        loading: false,
      }

    case TaskActionTypes.GET_ORDERS_SUCCESS:
      return {
        ...state,
        orders: action.payload,
        loading: false,
      }


    case TaskActionTypes.GET_CHARTS_DATA_FAIL:
    case TaskActionTypes.GET_ORDERS_FAIL:

      return {
        ...state,
        loading: false,
      }

    default:
      return state
  }
}

export default Dashboard
