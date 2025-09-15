import { all } from "redux-saga/effects";

import watchLogin from "./authenticationSaga";
import watchFetchFilmProfessionals from "./filmProfessionalSaga";
import { watchAddFilm, watchGetAllFilms } from "./filmSaga.js";

export default function* rootSaga() {
    yield all([
        watchLogin(),
        watchFetchFilmProfessionals(),
        watchAddFilm(),
        watchGetAllFilms(),
    ]);
}