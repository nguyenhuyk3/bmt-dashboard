import { call, put, takeLatest } from "redux-saga/effects";

import showtimeSeatApi from "../../api/showtimeSeatApi";
import {
    getShowtimeSeatsByShowtimeIdRequest,
    getShowtimeSeatsByShowtimeIdSuccess,
    performShowtimeSeatRequestFailure,
} from "../slices/index";

function* fetchShowtimeSeatsSaga(action) {
    try {
        const accessToken = localStorage.getItem(import.meta.env.VITE_ACCESS_TOKEN);
        const response = yield call(
            showtimeSeatApi.getShowtimeSeatsByShowtimeId,
            action.payload,
            accessToken
        );

        yield put(getShowtimeSeatsByShowtimeIdSuccess({
            seats: response?.[0]?.seats || [],
            metadata: response?.[0]?.metadata || {}
        }));
    } catch (error) {
        yield put(performShowtimeSeatRequestFailure(error.message));
    }
}

export default function* showtimeSeatSaga() {
    yield takeLatest(getShowtimeSeatsByShowtimeIdRequest.type, fetchShowtimeSeatsSaga);
}
