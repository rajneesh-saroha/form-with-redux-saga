import { call, put, takeEvery } from "redux-saga/effects";
import sendData from "./sendData";
import { setError, setSuccess } from "./actions/index";
import { FORMDATA } from "./constants/index";
import { store } from "./App";
function* workerSaga(action) {
  console.log(action.payload);
  const response = yield call(sendData);
  console.log(response.status);
  if (response.status == 200) {
    yield put(setSuccess(response.status));
    alert(
      "Data succesfully received to backend through redux-saga middleware !!"
    );
    console.log(store.getState());
  } else {
    yield put(setError(response.json().msg));
    alert("Data not added");
  }
}

export default function* rootSaga() {
  yield takeEvery(FORMDATA.LOAD, workerSaga);
}
