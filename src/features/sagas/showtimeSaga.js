import { call, put, takeLatest } from "redux-saga/effects";
import { toast } from "react-toastify";

import {
    getLatestShowtimeByAuditoriumIdAndByShowDateRequest,
    getLatestShowtimeByAuditoriumIdAndByShowDateSuccess,
    addShowtimeRequest, addShowtimeSuccess,
    performShowtimeRequestFailure
} from "../slices/showtimeSlice";
import { showtimeApi } from "../../api/index";
import { formatToHHmm } from "../../utils/convertors/time";

function* handleGetLastestShowtimeByAuditoriumIdAndByShowDate(action) {
    try {
        const accessToken = localStorage.getItem(import.meta.env.VITE_ACCESS_TOKEN);

        // action.payload = { auditoriumId, showDate }
        const response = yield call(showtimeApi.getLastestShowtimeByAuditoriumIdAndByShowDate, action.payload, accessToken);

        console.log(formatToHHmm(response));

        yield put(getLatestShowtimeByAuditoriumIdAndByShowDateSuccess(formatToHHmm(response)));
    } catch (error) {
        yield put(performShowtimeRequestFailure(error.message));
    }
}

function* handleAddShowtime(action) {
    try {
        const accessToken = localStorage.getItem(import.meta.env.VITE_ACCESS_TOKEN);
        const response = yield call(showtimeApi.addShowtime, action.payload, accessToken);

        toast.success("Thêm suất chiếu thành công!!");

        yield put(addShowtimeSuccess(response));

        setTimeout(() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }, 1500);
    } catch (error) {
        if (error.response?.status === 400) {
            toast.error("Suất chiếu vượt quá 00:00, không thể thêm mới!!");
        } else {
            toast.error("Thêm suất chiếu thất bại!!");
        }

        yield put(performShowtimeRequestFailure(error.message));
    }
}

export default function* showtimeSaga() {
    yield takeLatest(
        getLatestShowtimeByAuditoriumIdAndByShowDateRequest.type,
        handleGetLastestShowtimeByAuditoriumIdAndByShowDate
    );
    yield takeLatest(addShowtimeRequest.type, handleAddShowtime);
}