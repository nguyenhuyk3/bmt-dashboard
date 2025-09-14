import { call, put, takeLatest } from "redux-saga/effects";
import { toast } from "react-toastify";

import { addMovieRequest, addMovieSuccess, addMovieFailure } from "../slices/index";
import { filmApi } from "../../api/index";

function* handleAddFilm(action) {
    try {
        const accessToken = localStorage.getItem(import.meta.env.VITE_ACCESS_TOKEN);
        const response = yield call(filmApi.addFilm, action.payload, accessToken);

        yield put(addMovieSuccess(response));

        toast.success("Thêm phim thành công!!");
    } catch (e) {
        yield put(addMovieFailure(e.message));

        toast.error("Thêm phim thất bại!!");
    }
}

export default function* watchAddFilm() {
    yield takeLatest(addMovieRequest.type, handleAddFilm);
}
