import { combineReducers } from 'redux'
import { addReducer } from '../components/addReducer';
import { searchReducer } from "../components/searchReducer";
import { randomReducer } from "../components/randomReducer";
import { locReducer } from "../components/locReducer";

export default combineReducers({
  locReducer,
  addReducer,
  searchReducer,
  randomReducer
});
