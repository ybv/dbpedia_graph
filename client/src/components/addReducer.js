import * as types from "./ActionTypes";

const initialState = {
  adding: false,
  addSuccess: false,
  addFailure: false,
  failureMsg: ""
};

export function addReducer(state = initialState, action) {
  switch (action.type) {
    case types.CLEAR:
        return {
            ...initialState
        }
        break;
    case types.REQUEST_ADD_TUPLE:
      return {
        ...state,
        adding: true,
        addFailure: false
      };
      break;
    case types.REQUEST_ADD_TUPLE_SUCCESS:
      return {
        ...state,
        adding: false,
        addSuccess: true,
        addFailure: false,
        failureMsg: ""
      };
      break;
    case types.REQUEST_ADD_TUPLE_FAILURE:
      return {
        ...state,
        adding: false,
        addSuccess: false,
        addFailure: true,
        failureMsg: action.msg
      };
      break;
    case types.REQUEST_BULK_ADD_TUPLE:
      return {
        ...state,
        adding: true,
        addFailure: false
      };
      break;
    case types.REQUEST_BULK_ADD_TUPLE_SUCCESS:
      return {
        ...state,
        adding: false,
        addSuccess: true,
        addFailure: false,
        failureMsg: ""
      };
      break;
    case types.REQUEST_BULK_ADD_TUPLE_FAILURE:
      return {
        ...state,
        adding: false,
        addSuccess: false,
        addFailure: true,
        failureMsg: action.msg
      };
      break;
    default:
      return state;
  }
}
