import { FORMDATA } from "../constants/index";

const loadingReducer = (state = false, action) => {
  if (action.type == FORMDATA.LOAD) {
    return true;
  }
  if (action.type == FORMDATA.LOAD_FAIL) {
    return false;
  }
  if (action.type == FORMDATA.LOAD_SUCCESS) {
    return false;
  }

  return state;
};
export default loadingReducer;
