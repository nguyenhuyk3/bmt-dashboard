import { all } from "redux-saga/effects";

import authenticationSaga from "./authenticationSaga";
import filmProfessionalSaga from "./filmProfessionalSaga";
import filmSaga from "./filmSaga";
import cinemaSaga from "./cinemaSaga";
import auditoriumSaga from "./auditoriumSaga";
import showtimeSaga from "./showtimeSaga";
import showtimeSeatSaga from "./showtimeSeatSaga";

export default function* rootSaga() {
    yield all([
        authenticationSaga(),
        filmProfessionalSaga(),
        filmSaga(),
        cinemaSaga(),
        auditoriumSaga(),
        showtimeSaga(),
        showtimeSeatSaga(),
    ]);
}
