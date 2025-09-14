import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    movies: [],
    loading: false,
    error: null,
};

const filmSlice = createSlice({
    name: "film",
    initialState,
    reducers: {
        addMovieRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        addMovieSuccess: (state) => {
            state.loading = false;
        },
        addMovieFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const { addMovieRequest, addMovieSuccess, addMovieFailure } =
    filmSlice.actions;

export default filmSlice.reducer;