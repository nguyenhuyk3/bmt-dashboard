import { call, put, takeLatest, all } from "redux-saga/effects";

import {
    getAllCinemasRequest,
    getAllCinemasSuccess,
    performCinemaRequestFailure,
} from "../slices/index";
import { cinemaApi } from "../../api/index";

function* handleGetAllCinemas() {
    try {
        const accessToken = localStorage.getItem(import.meta.env.VITE_ACCESS_TOKEN);
        const response = yield call(cinemaApi.getAllCinemas, accessToken);

        yield put(getAllCinemasSuccess(response));
    } catch (e) {
        yield put(performCinemaRequestFailure(e.message));
    }
}

export default function* cinemaSaga() {
    yield all([
        takeLatest(getAllCinemasRequest.type, handleGetAllCinemas),
    ]);
}
