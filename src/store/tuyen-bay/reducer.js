import {
  LAY_DS_TUYEN_BAY, 
  LAY_DS_TUYEN_BAY_FAIL,
  LAY_DS_TUYEN_BAY_SUCCESS,
  THEM_TUYEN_BAY,
  THEM_TUYEN_BAY_MESAGE,
  THEM_TUYEN_BAY_FAIL,
  TUYEN_BAY_CAP_NHAT,
  CAP_NHAT_TUYEN_BAY_MESAGE,
  CAP_NHAT_TUYEN_BAY_FAIL,
  XOA_TUYEN_BAY,
  XOA_TUYEN_BAY_FAIL,
  XOA_TUYEN_BAY_MESAGE,
} from "./actionTypes"

const INIT_STATE = {
  content: [],
  has_next: false,
  has_prev: false,
  page: 1,
  total_pages:0,
  total_records:0,
  error: "",
  resApiActionForm:{},
  tuyenBayCapNhat:{}
}

const TuyenBay = (state = INIT_STATE, action) => {
  switch (action.type) {
    case LAY_DS_TUYEN_BAY:
      return {
        ...state,
        params: action.payload,
      }
    case LAY_DS_TUYEN_BAY_SUCCESS:
      return {
        ...state,
        content:       action.payload.content,
        has_next:      action.payload.has_next,
        has_prev:      action.payload.has_prev,
        page:          action.payload.page,
        total_pages:   action.payload.total_pages,
        total_records: action.payload.total_records,
      }
    case LAY_DS_TUYEN_BAY_FAIL:
      return {
        ...state,
        error: action.payload,
      }
    case THEM_TUYEN_BAY_MESAGE:
      return {
        ...state,
        resApiActionForm: action.payload,
      }

    case THEM_TUYEN_BAY_FAIL:
      return {
        ...state,
        resApiActionForm: action.payload,
      }

    case TUYEN_BAY_CAP_NHAT:
      return {
        ...state,
        tuyenBayCapNhat: action.payload,
        resApiActionForm: {},
      }
  
    case CAP_NHAT_TUYEN_BAY_MESAGE:
      return {
        ...state,
        resApiActionForm: action.payload,
      }

    case CAP_NHAT_TUYEN_BAY_FAIL:
      return {
        ...state,
        resApiActionForm: action.payload,
      }
   
    case XOA_TUYEN_BAY_MESAGE:
      return {
        ...state,
        resApiActionForm: action.payload
      }

    case XOA_TUYEN_BAY_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    default:
      return state
  }
}

export default TuyenBay
