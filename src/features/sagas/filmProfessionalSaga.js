import { call, put, takeLatest, all } from "redux-saga/effects";

import { filmProfessionalApi } from "../../api/index";
import {
    fetchFilmProfessionals,
    fetchFilmProfessionalsSuccess,
    fetchFilmProfessionalsFailure,
} from "../slices/index";

// Saga worker
function* handleFetchFilmProfessionals() {
    try {
        const response = yield call(filmProfessionalApi.getAll);

        yield put(fetchFilmProfessionalsSuccess(response));
    } catch (e) {
        yield put(fetchFilmProfessionalsFailure(e.message));
    }
}

// Saga watcher
export default function* filmProfessionalSaga() {
    yield all([
        takeLatest(fetchFilmProfessionals.type, handleFetchFilmProfessionals),
    ]);
}
