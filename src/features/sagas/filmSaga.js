import { call, put, takeLatest } from "redux-saga/effects";
import { addMovieRequest, addMovieSuccess, addMovieFailure } from "./movieSlice";
import { filmApi } from "../../api/index";

function* handleAddFilm(action) {
    try {
        const response = yield call(filmApi.addFilm, action.payload);

        yield put(addMovieSuccess(response));
    } catch {
        yield put(addMovieFailure("Thêm phim thất bại!!"));
    }
}

export default function* movieSaga() {
    yield takeLatest(addMovieRequest.type, handleAddFilm);
}
