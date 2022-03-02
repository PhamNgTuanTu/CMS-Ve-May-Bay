import {
  LAY_DS_DAI_LY, 
  LAY_DS_DAI_LY_FAIL,
  LAY_DS_DAI_LY_SUCCESS,
  THEM_DAI_LY,
  THEM_DAI_LY_MESAGE,
  THEM_DAI_LY_FAIL,
  DAI_LY_CAP_NHAT,
  CAP_NHAT_DAI_LY_MESAGE,
  CAP_NHAT_DAI_LY_FAIL,
  XOA_DAI_LY,
  XOA_DAI_LY_FAIL,
  XOA_DAI_LY_MESAGE,
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
  daiLyCapNhat:{}
}

const DaiLy = (state = INIT_STATE, action) => {
  switch (action.type) {
    case LAY_DS_DAI_LY:
      return {
        ...state,
        params: action.payload,
      }
    case LAY_DS_DAI_LY_SUCCESS:
      return {
        ...state,
        content:       action.payload.content,
        has_next:      action.payload.has_next,
        has_prev:      action.payload.has_prev,
        page:          action.payload.page,
        total_pages:   action.payload.total_pages,
        total_records: action.payload.total_records,
      }
    case LAY_DS_DAI_LY_FAIL:
      return {
        ...state,
        error: action.payload,
      }
    case THEM_DAI_LY_MESAGE:
      return {
        ...state,
        resApiActionForm: action.payload,
      }

    case THEM_DAI_LY_FAIL:
      return {
        ...state,
        resApiActionForm: action.payload,
      }

    case DAI_LY_CAP_NHAT:
      return {
        ...state,
        daiLyCapNhat: action.payload,
        resApiActionForm: {},
      }
  
    case CAP_NHAT_DAI_LY_MESAGE:
      return {
        ...state,
        resApiActionForm: action.payload,
      }

    case CAP_NHAT_DAI_LY_FAIL:
      return {
        ...state,
        resApiActionForm: action.payload,
      }
   
    case XOA_DAI_LY_MESAGE:
      return {
        ...state,
        resApiActionForm: action.payload
      }

    case XOA_DAI_LY_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    default:
      return state
  }
}

export default DaiLy
