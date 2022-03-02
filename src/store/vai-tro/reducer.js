import TaskActionTypes from './actionTypes';

const INIT_STATE = {
  content: [],
  loading: false,
}

const VaiTro = (state = INIT_STATE, action) => {
  switch (action.type) {
    case TaskActionTypes.LAY_DS_VAI_TRO:
      return {
        ...state,
        loading: true,
      }

    case TaskActionTypes.LAY_DS_VAI_TRO_SUCCESS:
      return {
        ...state,
        content: action.payload.content,
        loading: false,
      }


    case TaskActionTypes.LAY_DS_VAI_TRO_FAIL:
      return {
        ...state,
        loading: false,
      }

    default:
      return state
  }
}

export default VaiTro
