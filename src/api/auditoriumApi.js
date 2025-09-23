import axiosClient from "./axiosClient";

const auditoriumApi = {
    getAllAuditoriumsByCinemaId: async (cinemaId, accessToken) => {
        const response = await axiosClient.get(
            `/auditorium/get-all-by-cinema-id/${cinemaId}`,
            {
                headers: {
                    "Authorization": `Bearer ${accessToken}`,
                },
            }
        );

        return response.data.result;
    },
};

export default auditoriumApi;
