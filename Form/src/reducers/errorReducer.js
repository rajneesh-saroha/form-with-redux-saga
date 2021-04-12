import { FORMDATA } from "../constants/index";

const errorReducer = (state = "", action) => {
  if (action.type == FORMDATA.LOAD_FAIL) {
    return action.error;
  }
  if (action.type == FORMDATA.LOAD_SUCCESS) {
    return "";
  }
  if (action.type == FORMDATA.LOAD) {
    return "";
  }
  return state;
};

export default errorReducer;
