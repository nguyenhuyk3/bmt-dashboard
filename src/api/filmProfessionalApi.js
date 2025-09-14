import axiosClient from "./axiosClient";

const filmProfessionalApi = {
    getAll: async () => {
        const response = await axiosClient.get("/film-professionals",);

        return response.data.result;
    }
};

export default filmProfessionalApi;
