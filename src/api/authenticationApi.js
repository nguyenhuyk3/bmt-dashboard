import axiosClient from "./axiosClient";

const authenticationApi = {
    login: async ({ email, password }) => {
        const response = await axiosClient.post("/auth/login", { email, password });

        return response.data.result;
    }
};

export default authenticationApi;
