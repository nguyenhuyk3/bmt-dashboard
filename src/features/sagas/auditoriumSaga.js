import { call, put, takeLatest, all } from "redux-saga/effects";
import {
    getAllAuditoriumsByCinemaIdRequest,
    getAllAuditoriumsByCinemaIdSuccess,
    performAuditoriumRequestFailure,
} from "../slices/auditoriumSlice";
import { auditoriumApi } from "../../api";

function* handleGetAuditoriumsByCinemaId(action) {
    try {
        const accessToken = localStorage.getItem(import.meta.env.VITE_ACCESS_TOKEN);
        const response = yield call(
            auditoriumApi.getAllAuditoriumsByCinemaId,
            action.payload,
            accessToken
        );

        yield put(getAllAuditoriumsByCinemaIdSuccess(response));
    } catch (e) {
        yield put(performAuditoriumRequestFailure(e.message));
    }
}

export default function* auditoriumSaga() {
    yield all([
        takeLatest(
            getAllAuditoriumsByCinemaIdRequest.type,
            handleGetAuditoriumsByCinemaId
        ),
    ]);
}
