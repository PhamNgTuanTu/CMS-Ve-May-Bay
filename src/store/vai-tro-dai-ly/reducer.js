import TaskActionTypes from './actionTypes';

const INIT_STATE = {
  content: [],
  loading: false,
}

const VaiTroDaiLy = (state = INIT_STATE, action) => {
  switch (action.type) {
    case TaskActionTypes.LAY_DS_VAI_TRO_DAI_LY:
      return {
        ...state,
        loading: true,
      }

    case TaskActionTypes.LAY_DS_VAI_TRO_DAI_LY_SUCCESS:
      return {
        ...state,
        content: action.payload.content,
        loading: false,
      }


    case TaskActionTypes.LAY_DS_VAI_TRO_DAI_LY_FAIL:
      return {
        ...state,
        loading: false,
      }

    default:
      return state
  }
}

export default VaiTroDaiLy
