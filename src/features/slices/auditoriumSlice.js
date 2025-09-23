import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    auditoriums: [],
    loading: false,
    error: null,
};

const auditoriumSlice = createSlice({
    name: "auditorium",
    initialState,
    reducers: {
        getAllAuditoriumsByCinemaIdRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        getAllAuditoriumsByCinemaIdSuccess: (state, action) => {
            state.loading = false;
            state.error = null;
            state.auditoriums = action.payload;
        },
        performAuditoriumRequestFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const {
    getAllAuditoriumsByCinemaIdRequest, getAllAuditoriumsByCinemaIdSuccess,
    performAuditoriumRequestFailure,
} = auditoriumSlice.actions;

export default auditoriumSlice.reducer;
