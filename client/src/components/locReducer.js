import * as types from "./ActionTypes";

const initialState = {
  locId: null,
  fetching: false,
  failed: false,
  results: []
};

export function locReducer(state = initialState, action) {
  switch (action.type) {
    case types.CLEAR_LOC:
      return {
        ...initialState
      };
      break;
    case types.SET_LOCATION:
      return {
        ...state,
        locId: action.locId
      };
      break;
    case types.REQUEST_FROM_LOC:
      return {
        ...state,
        fetching: true,
        failed: false
      };
      break;
    case types.REQUEST_FROM_LOC_SUCCESS:
      return {
        ...state,
        fetching: false,
        failed: false,
        results: action.results.result
      };
      break;
    case types.REQUEST_FROM_LOC_FAILURE:
      return {
        ...state,
        fetching: false,
        failed: true
      };
      break;
    default:
      return state;
  }
}
