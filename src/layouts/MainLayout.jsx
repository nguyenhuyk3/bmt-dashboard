import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
    return (
        <div className="flex">
            {/* Sidebar */}
            <div className="fixed top-0 left-0 w-64 h-screen bg-white shadow">
                <Sidebar />
            </div>
            {/* Nội dung thay đổi */}
            <div className="flex-1 min-h-screen ml-64 overflow-y-auto bg-white">
                <Outlet />
            </div>
        </div>
    );
}
