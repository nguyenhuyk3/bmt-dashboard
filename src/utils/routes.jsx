import LoginPage from "../pages/login/page";
import ProtectedRoute from "../components/ProtectedRoute";
import MainLayout from "../layouts/MainLayout";
import AddFilmPage from "../pages/film/addFilmPage/page";
import FilmDashboard from "../pages/film/filmDashboard/filmDashboard";
import EditFilmPage from "../pages/film/editFilmpage/page";
import AddShowtimePage from "../pages/showtime/addShowtimePage/page";
import ReleaseShowtimePage from "../pages/showtime/releaseShowtimePage/page";
import DisplayShowtimeSeatPage from "../pages/showtimeSeat/displayShowtimeSeat/page";

export const LOGIN = "/login";
export const DEFAULT = "/";
export const FILM_ADD = "film/add";
export const FILL_EDIT = "film/edit/:id";
export const SHOWTIME_ADD = "showtime/add";
export const SHOWTIME_RELEASE = "showtime/release";
export const SHOWTIME_SEAT_DISPLAY = "showtime-seat/display";

const ROUTES = [
    {
        path: LOGIN,
        element: <LoginPage />,
    },
    {
        path: DEFAULT,
        element: (
            <ProtectedRoute>
                <MainLayout />
            </ProtectedRoute>
        ),
        children: [
            {
                index: true,
                element: <FilmDashboard />,
            },
            {
                path: FILM_ADD,
                element: <AddFilmPage />,
            },
            {
                path: FILL_EDIT,
                element: <EditFilmPage />
            },
            {
                path: SHOWTIME_ADD,
                element: <AddShowtimePage />
            },
            {
                path: SHOWTIME_RELEASE,
                element: <ReleaseShowtimePage />
            },
            {
                path: SHOWTIME_SEAT_DISPLAY,
                element: <DisplayShowtimeSeatPage />
            }
        ],
    },
];

export default ROUTES;
