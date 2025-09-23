import { createSlice } from "@reduxjs/toolkit";

const initialState = {
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
        performShowtimeRequestFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const {
    getLatestShowtimeByAuditoriumIdAndByShowDateRequest,
    getLatestShowtimeByAuditoriumIdAndByShowDateSuccess,
    addShowtimeRequest, addShowtimeSuccess,
    performShowtimeRequestFailure,
} = showtimeSlice.actions;

export default showtimeSlice.reducer;
