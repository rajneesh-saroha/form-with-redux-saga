import { FORMDATA } from "../constants/index";

const dataReducer = (state = "", action) => {
  if (action.type == FORMDATA.LOAD_SUCCESS) {
    return action.success;
  }
  return state;
};

export default dataReducer;
