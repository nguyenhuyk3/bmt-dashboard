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
    }
}

export default filmApi;