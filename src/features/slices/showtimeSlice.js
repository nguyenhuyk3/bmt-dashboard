import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    showtimes: [],
    lastestShowtime: "9:00",
    loading: false,
    error: null,
    createdShowtime: null,
};

const showtimeSlice = createSlice({
    name: "showtime",
    initialState,
    reducers: {
        getLatestShowtimeByAuditoriumIdAndByShowDateRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        getLatestShowtimeByAuditoriumIdAndByShowDateSuccess: (state, action) => {
            state.loading = false;
            state.lastestShowtime = action.payload;
        },
        addShowtimeRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        addShowtimeSuccess: (state, action) => {
            state.loading = false;
            state.createdShowtime = action.payload;
        },
        findShowtimesByAuditoriumIdAndShowDateRequest: (state) => {
            state.loading = true;
            state.error = null;
            state.showtimes = [];
        },
        findShowtimesByAuditoriumIdAndShowDateSuccess: (state, action) => {
            state.loading = false;
            state.showtimes = action.payload;
        },
        releaseShowtimeRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        releaseShowtimeSuccess: (state) => {
            state.loading = false;
        },
        findAllReleasedShowtimeByAuditoriumIdRequest: (state) => {
            state.loading = true;
            state.error = null;
            state.showtimes = [];
        },
        findAllReleasedShowtimeByAuditoriumIdSuccess: (state, action) => {
            state.loading = false;
            state.showtimes = action.payload;
        },
        performShowtimeRequestFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const {
    getLatestShowtimeByAuditoriumIdAndByShowDateRequest, getLatestShowtimeByAuditoriumIdAndByShowDateSuccess,
    addShowtimeRequest, addShowtimeSuccess,
    findShowtimesByAuditoriumIdAndShowDateRequest, findShowtimesByAuditoriumIdAndShowDateSuccess,
    releaseShowtimeRequest, releaseShowtimeSuccess,
    findAllReleasedShowtimeByAuditoriumIdRequest, findAllReleasedShowtimeByAuditoriumIdSuccess,
    performShowtimeRequestFailure
} = showtimeSlice.actions;

export default showtimeSlice.reducer;
