import { call, put, takeLatest } from "redux-saga/effects";

import {
    getAllCinemasRequest, getAllCinemasSuccess,
    performCinemaRequestFailure
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

export function* watchGetAllCinemas() {
    yield takeLatest(getAllCinemasRequest.type, handleGetAllCinemas);
}


