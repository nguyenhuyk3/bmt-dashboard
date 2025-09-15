import LoginPage from "../pages/login/page";
import ProtectedRoute from "../components/ProtectedRoute";
import MainLayout from "../layouts/MainLayout";
import AddFilmPage from "../pages/film/addFilmPage/page";
import FilmDashboard from "../pages/film/filmDashboard/filmDashboard";

export const LOGIN = "/login";
export const DEFAULT = "/";
export const FILM_ADD = "film/add"

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
        ],
    },
];

export default ROUTES;
