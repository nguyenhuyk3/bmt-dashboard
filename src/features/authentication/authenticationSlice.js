import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    role: null,
    tokens: null,
    loading: false,
    error: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        loginSuccess: (state, action) => {
            state.loading = false;
            state.tokens = {
                accessToken: action.payload.accessToken,
                refreshToken: action.payload.refreshToken,
                tokenType: action.payload.tokenType,
            }
            state.role = action.payload.role;
        },
        loginFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        logout: (state) => {
            state.role = null;
            state.tokens = null;
            state.loading = false;
            state.error = null;
        },
    }
})

export const { loginRequest, loginSuccess, loginFailure, logout } = authSlice.actions;

export default authSlice.reducer;