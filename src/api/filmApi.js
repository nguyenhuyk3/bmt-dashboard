import axiosClient from "./axiosClient";

const filmApi = {
    addFilm: async (request, accessToken) => {
        const response = await axiosClient.post("/film", request, {
            headers: {
                "Content-Type": "multipart/form-data",
                "Authorization": `Bearer ${accessToken}`,
            },
        });

        return response.data.result;
    },
    getAllFilms: async (request, accessToken) => {
        const response = await axiosClient.get("/film", {
            params: {
                page: request.page,
                size: request.size
            },
            headers: {
                "Authorization": `Bearer ${accessToken}`
            }
        });

        return response.data.result;
    }
}

export default filmApi;