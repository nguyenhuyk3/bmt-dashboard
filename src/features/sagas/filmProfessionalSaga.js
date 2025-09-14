import { call, put, takeLatest } from "redux-saga/effects";

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
export default function* watchFetchFilmProfessionals() {
    yield takeLatest(fetchFilmProfessionals.type, handleFetchFilmProfessionals);
}
