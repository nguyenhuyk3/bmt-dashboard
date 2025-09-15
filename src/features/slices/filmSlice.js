import { createSlice } from "@reduxjs/toolkit";
import { SIZE_OF_PAGINATION } from "../../utils/constants";

const initialState = {
    films: [],
    totalFilms: 0,
    totalPages: 0,
    currentPage: 0,
    // Số lượng phim có trong 1 trang
    pageSize: SIZE_OF_PAGINATION,
    loading: false,
    error: null,
    isFirst: true,
    isLast: true,
};

const filmSlice = createSlice({
    name: "film",
    initialState,
    reducers: {
        addFilmRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        addFilmSuccess: (state) => {
            state.loading = false;
        },
        getAllFilmsRequest: (state, action) => {
            state.loading = true;
            state.error = null;

            if (action.payload?.page !== undefined) {
                state.currentPage = action.payload.page;
            }
        },
        getAllFilmsSuccess: (state, action) => {
            state.loading = false;
            state.error = null;

            const { payload } = action;

            console.log(action);

            state.films = payload.content;
            // Số lượng phim có trong db
            state.totalFilms = payload.totalElements;
            // Số lượng trang được trả về từ api
            state.totalPages = payload.totalPages;
            // Trang hiện tại
            state.currentPage = payload.number;
            state.isFirst = payload.first;
            state.isLast = payload.last;
        },
        performRequestFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload;
        },
    },
});

export const {
    addFilmRequest, addFilmSuccess,
    getAllFilmsRequest, getAllFilmsSuccess,
    performRequestFailure,
    setCurrentPage } = filmSlice.actions;

export default filmSlice.reducer;