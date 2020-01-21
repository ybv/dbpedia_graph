import * as types from "./ActionTypes";

const initialState = {
    searchText: '',
    fetching: false,
    failed: false,
    results: []
};

export function searchReducer(state = initialState, action) {
  switch (action.type) {
    case types.CHANGE_SEARCH_TEXT:
        return {
          ...state,
          searchText: action.text,
        };
        break;
    case types.REQUEST_SEARCH_ENTITY:
        return {
            ...state,
            fetching: true,
            failed: false,
        };
        break;
    case types.REQUEST_SEARCH_ENTITY_SUCCESS:
        return {
            ...state,
            fetching: false,
            failed: false,
            results: action.results.result
        }
        break;
    case types.REQUEST_SEARCH_ENTITY_FAILURE:
          return {
            ...state,
            fetching: false,
            failed: true,
        }
        break;
    default:
      return state;
  }
}
