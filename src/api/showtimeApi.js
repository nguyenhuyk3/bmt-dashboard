import axiosClient from "./axiosClient";

const showtimeApi = {
    getLastestShowtimeByAuditoriumIdAndByShowDate: async ({ auditoriumId, showDate }, accessToken) => {
        const response = await axiosClient.get("/showtime/lastest", {
            params: {
                auditoriumId,
                showDate,
            },
            headers: {
                "Authorization": `Bearer ${accessToken}`,
            },
        });

        return response.data.result;
    },
    addShowtime: async (request, accessToken) => {
        const response = await axiosClient.post(
            "/showtime",
            request,
            {
                headers: {
                    "Authorization": `Bearer ${accessToken}`,
                },
            }
        );

        return response.data.result;
    }
};

export default showtimeApi;
