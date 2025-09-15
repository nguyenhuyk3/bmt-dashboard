import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    directors: [],
    actors: [],
    loading: false,
    error: null,
};

const filmProfessionalSlice = createSlice({
    name: "filmProfessional",
    initialState,
    reducers: {
        fetchFilmProfessionals: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchFilmProfessionalsSuccess: (state, action) => {
            state.loading = false;
            state.actors = action.payload.filter((fp) => fp.job === "ACTOR");
            state.directors = action.payload.filter((fp) => fp.job === "DIRECTOR");
        },
        fetchFilmProfessionalsFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const {
    fetchFilmProfessionals,
    fetchFilmProfessionalsSuccess,
    fetchFilmProfessionalsFailure,
} = filmProfessionalSlice.actions;

export default filmProfessionalSlice.reducer;