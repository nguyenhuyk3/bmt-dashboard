import axiosClient from "./axiosClient";

const showtimeSeatApi = {
    getShowtimeSeatsByShowtimeId: async (showtimeId, accessToken) => {
        const response = await axiosClient.get(
            "/showtime-seat",
            {
                headers: {
                    "Authorization": `Bearer ${accessToken}`,
                },
                params: {
                    showtimeId
                }
            }
        );

        return response.data.result;
    },
};

export default showtimeSeatApi;
