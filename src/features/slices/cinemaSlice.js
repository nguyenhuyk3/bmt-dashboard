import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cinemas: [],
    loading: false,
    error: null
};

const cinemaSlice = createSlice({
    name: "cinema",
    initialState,
    reducers: {
        getAllCinemasRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        getAllCinemasSuccess: (state, action) => {
            state.loading = false;
            state.error = null;

            state.cinemas = action.payload;
        },
        performCinemaRequestFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    }
});

export const {
    getAllCinemasRequest,
    getAllCinemasSuccess,
    performCinemaRequestFailure
} = cinemaSlice.actions;

export default cinemaSlice.reducer;