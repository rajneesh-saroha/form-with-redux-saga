import dataReducer from "./dataReducer";
import loadingReducer from "./loadingReducer";
import errorReducer from "./errorReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  isLoading: loadingReducer,
  success: dataReducer,
  error: errorReducer,
});

export default rootReducer;
