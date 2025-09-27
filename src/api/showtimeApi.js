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
            "/showtime/add",
            request,
            {
                headers: {
                    "Authorization": `Bearer ${accessToken}`,
                },
            }
        );

        return response.data.result;
    },
    findShowtimesByAuditoriumIdAndShowDate: async (auditoriumId, showDate, accessToken) => {
        const response = await axiosClient.get(
            `/showtime/find-showtimes-by-auditorium-id-and-by-showdate`,
            {
                headers: {
                    "Authorization": `Bearer ${accessToken}`,
                },
                params: {
                    auditoriumId,
                    showDate,
                },
            }
        );

        return response.data.result;
    },
    releaseShowtime: async (request, accessToken) => {
        const response = await axiosClient.post(
            "/showtime/release",
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
