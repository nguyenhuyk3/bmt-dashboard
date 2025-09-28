import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    seats: [],
    metadata: null,
    loading: false,
    error: null,
};

const showtimeSeatSlice = createSlice({
    name: "showtimeSeat",
    initialState,
    reducers: {
        getShowtimeSeatsByShowtimeIdRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        getShowtimeSeatsByShowtimeIdSuccess: (state, action) => {
            state.loading = false;
            state.seats = action.payload.seats;
            state.metadata = action.payload.metadata;
            state.error = null;
        },
        performShowtimeSeatRequestFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const {
    getShowtimeSeatsByShowtimeIdRequest, getShowtimeSeatsByShowtimeIdSuccess,
    performShowtimeSeatRequestFailure,
} = showtimeSeatSlice.actions;

export default showtimeSeatSlice.reducer;
