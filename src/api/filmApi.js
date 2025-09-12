import axiosClient from "./axiosClient";

const filmApi = {
    addFilm: async (request) => {
        const response = await axiosClient.post("/film/add", request);

        return response.data.result;
    }
}

export default filmApi;