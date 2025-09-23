import { all } from "redux-saga/effects";

import watchLogin from "./authenticationSaga";
import watchFetchFilmProfessionals from "./filmProfessionalSaga";
import {
    watchAddFilm,
    watchGetAllFilms,
    watchGetFilmById,
    watchGetFilms,
    watchUpdateFilmById,
} from "./filmSaga.js";
import {
    watchGetAllCinemas
} from "./cinemaSaga.js"
import {
    watchGetAuditoriumsByCinemaId
} from "./auditoriumSaga.js"
import watchShowtime from "./showtimeSaga.js";

export default function* rootSaga() {
    yield all([
        watchLogin(),

        watchFetchFilmProfessionals(),

        watchAddFilm(),
        watchGetAllFilms(),
        watchGetFilms(),
        watchGetFilmById(),
        watchUpdateFilmById(),

        watchGetAllCinemas(),

        watchGetAuditoriumsByCinemaId(),

        watchShowtime(),
    ]);
}