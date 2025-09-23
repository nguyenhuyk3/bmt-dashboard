import axiosClient from "./axiosClient";

const cinemaApi = {
    getAllCinemas: async (accessToken) => {
        const response = await axiosClient.get("/cinema/get-all", {
            headers: {
                "Authorization": `Bearer ${accessToken}`,
            },
        });

        return response.data.result;
    }
}

export default cinemaApi;