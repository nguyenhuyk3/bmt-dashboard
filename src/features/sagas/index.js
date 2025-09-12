import { all } from "redux-saga/effects";

import watchLogin from "./authenticationSaga";

export default function* rootSaga() {
    yield all([watchLogin()]);
}