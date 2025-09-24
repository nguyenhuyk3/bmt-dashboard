import LoginPage from "../pages/login/page";
import ProtectedRoute from "../components/ProtectedRoute";
import MainLayout from "../layouts/MainLayout";
import AddFilmPage from "../pages/film/addFilmPage/page";
import FilmDashboard from "../pages/film/filmDashboard/filmDashboard";
import EditFilmPage from "../pages/film/editFilmpage/page";
import AddShowtimePage from "../pages/showtime/addShowtimePage/page";
import ReleaseShowtimePage from "../pages/showtime/releaseShowtimePage/page";

export const LOGIN = "/login";
export const DEFAULT = "/";
export const FILM_ADD = "film/add";
export const FILL_EDIT = "film/edit/:id";
export const SHOWTIME_ADD = "showtime/add";
export const SHOWTIME_RELEASE = "showtime/release"

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
            }
        ],
    },
];

export default ROUTES;
