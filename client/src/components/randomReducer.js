import * as types from "./ActionTypes";

const initialState = {
  fetching: false,
  failed: false,
  results: []
};

export function randomReducer(state = initialState, action) {
  switch (action.type) {
    case types.REQUEST_RANDOM:
      return {
        ...state,
        fetching: true,
        failed: false
      };
      break;
    case types.REQUEST_RANDOM_SUCCESS:
      return {
        ...state,
        fetching: false,
        failed: false,
        results: action.results.result
      };
      break;
    case types.REQUEST_RANDOM_FAILURE:
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
