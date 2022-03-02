import {
  LAY_DS_SAN_BAY, 
  LAY_DS_SAN_BAY_FAIL,
  LAY_DS_SAN_BAY_SUCCESS,
  THEM_SAN_BAY,
  THEM_SAN_BAY_MESAGE,
  THEM_SAN_BAY_FAIL,
  SAN_BAY_CAP_NHAT,
  CAP_NHAT_SAN_BAY_MESAGE,
  CAP_NHAT_SAN_BAY_FAIL,
  XOA_SAN_BAY,
  XOA_SAN_BAY_FAIL,
  XOA_SAN_BAY_MESAGE,
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
  sanBayCapNhat:{}
}

const SanBay = (state = INIT_STATE, action) => {
  switch (action.type) {
    case LAY_DS_SAN_BAY:
      return {
        ...state,
        params: action.payload,
      }
    case LAY_DS_SAN_BAY_SUCCESS:
      return {
        ...state,
        content:       action.payload.content,
        has_next:      action.payload.has_next,
        has_prev:      action.payload.has_prev,
        page:          action.payload.page,
        total_pages:   action.payload.total_pages,
        total_records: action.payload.total_records,
      }
    case LAY_DS_SAN_BAY_FAIL:
      return {
        ...state,
        error: action.payload,
      }
    case THEM_SAN_BAY_MESAGE:
      return {
        ...state,
        resApiActionForm: action.payload,
      }

    case THEM_SAN_BAY_FAIL:
      return {
        ...state,
        resApiActionForm: action.payload,
      }

    case SAN_BAY_CAP_NHAT:
      return {
        ...state,
        sanBayCapNhat: action.payload,
        resApiActionForm: {},
      }
  
    case CAP_NHAT_SAN_BAY_MESAGE:
      return {
        ...state,
        resApiActionForm: action.payload,
      }

    case CAP_NHAT_SAN_BAY_FAIL:
      return {
        ...state,
        resApiActionForm: action.payload,
      }
   
    case XOA_SAN_BAY_MESAGE:
      return {
        ...state,
        resApiActionForm: action.payload
      }

    case XOA_SAN_BAY_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    default:
      return state
  }
}

export default SanBay
