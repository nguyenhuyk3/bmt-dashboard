import Sidebar from "../components/SideBar";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
    return (
        <div className="flex">
            {/* Sidebar */}
            <Sidebar />

            {/* Nội dung thay đổi */}
            <div className="flex-1 min-h-screen p-6 bg-gray-100">
                <Outlet />
            </div>
        </div>
    );
}
