import { call, put, takeLatest } from "redux-saga/effects";
import { toast } from "react-toastify";

import {
    addFilmRequest, addFilmSuccess,
    getAllFilmsRequest, getAllFilmsSuccess,
    performRequestFailure
} from "../slices/index";
import { filmApi } from "../../api/index";

function* handleAddFilm(action) {
    try {
        const accessToken = localStorage.getItem(import.meta.env.VITE_ACCESS_TOKEN);
        const response = yield call(filmApi.addFilm, action.payload, accessToken);

        yield put(addFilmSuccess(response));

        toast.success("Thêm phim thành công!!");
    } catch (e) {
        yield put(performRequestFailure(e.message));

        toast.error("Thêm phim thất bại!!");
    }
}

function* handleGetAllFilms(action) {
    try {
        const accessToken = localStorage.getItem(import.meta.env.VITE_ACCESS_TOKEN);
        const response = yield call(filmApi.getAllFilms, action.payload, accessToken)
        
        yield put(getAllFilmsSuccess(response));
    } catch (e) {
        yield put(performRequestFailure(e.message));
    }
}

export function* watchAddFilm() {
    yield takeLatest(addFilmRequest.type, handleAddFilm);
}

export function* watchGetAllFilms() {
    yield takeLatest(getAllFilmsRequest.type, handleGetAllFilms);

}


