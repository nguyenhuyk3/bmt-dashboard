import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
    const accessToken = localStorage.getItem(import.meta.env.VITE_ACCESS_TOKEN);

    if (!accessToken) {
        return <Navigate to="/login" replace />;
    }

    return children;
}