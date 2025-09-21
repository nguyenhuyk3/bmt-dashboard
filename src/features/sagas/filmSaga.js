import { call, put, takeLatest } from "redux-saga/effects";
import { toast } from "react-toastify";

import {
    addFilmRequest, addFilmSuccess,
    getFilmByIdSuccess, getFilmByIdRequest,
    getAllFilmsRequest, getAllFilmsSuccess,
    performRequestFailure,
    updateFilmByIdSuccess,
    updateFilmByIdRequest,
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

function* handleGetFilmById(action) {
    try {
        const accessToken = localStorage.getItem(import.meta.env.VITE_ACCESS_TOKEN);
        const response = yield call(filmApi.getFilmById, action.payload, accessToken)

        yield put(getFilmByIdSuccess(response));
    } catch (e) {
        yield put(performRequestFailure(e.message));
    }
}

function* handleUpdateFilmById(action) {
    try {
        const accessToken = localStorage.getItem(import.meta.env.VITE_ACCESS_TOKEN);
        const response = yield call(filmApi.updateFilmlById, action.payload.formData, accessToken)

        yield put(updateFilmByIdSuccess(response));

        if (action.payload.onSuccess) {
            action.payload.onSuccess();
        }

        toast.success("Cập nhập phim thành công!!");
    } catch (e) {
        yield put(performRequestFailure(e.message));

        toast.error("Cập nhật thất bại!!");
    }
}

export function* watchAddFilm() {
    yield takeLatest(addFilmRequest.type, handleAddFilm);
}

export function* watchGetAllFilms() {
    yield takeLatest(getAllFilmsRequest.type, handleGetAllFilms);
}

export function* watchGetFilmById() {
    yield takeLatest(getFilmByIdRequest.type, handleGetFilmById);
}

export function* watchUpdateFilmById() {
    yield takeLatest(updateFilmByIdRequest.type, handleUpdateFilmById);
}


