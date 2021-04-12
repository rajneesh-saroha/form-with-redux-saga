import { FORMDATA } from "../constants/index";

const loadData = () => ({
  type: FORMDATA.LOAD,
});
const setSuccess = (success) => ({
  type: FORMDATA.LOAD_SUCCESS,
  success,
});
const setError = (error) => ({
  type: FORMDATA.LOAD_FAIL,
  error,
});
export { loadData, setSuccess, setError };
