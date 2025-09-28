import { NavLink } from "react-router-dom";
import { useState } from "react";
import { ChevronDownIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import Logo from "../assets/react.svg";
import { DEFAULT, FILM_ADD, SHOWTIME_ADD, SHOWTIME_RELEASE, SHOWTIME_SEAT_DISPLAY } from "../utils/routes";

export default function Sidebar() {
    const [openFilmOptions, setOpenFilmoptions] = useState(false);
    const [openShowtimeOptions, setOpenShowtimeOptions] = useState(false);
    const [openShowtimeSeatOptions, setOpenShowtimeSeatOptions] = useState(false);

    return (
        <div className="flex flex-col w-64 h-screen text-white bg-gray-800">
            {/* Logo */}
            <div className="flex justify-center p-4 border-b border-gray-700">
                <img src={Logo} alt="Logo" className="h-16" />
            </div>
            {/* Menu */}
            <nav className="flex-1 p-4 space-y-2">
                <NavLink
                    to={DEFAULT}
                    className={({ isActive }) =>
                        `block p-2 rounded hover:bg-gray-700 font-semibold
                        ${isActive ? "bg-gray-700 font-bold" : ""}`
                    }
                >
                    Quản lí phim
                </NavLink>
                <>
                    <button
                        onClick={() => setOpenFilmoptions(!openFilmOptions)}
                        className="flex items-center justify-between w-full p-2 rounded hover:bg-gray-700"
                    >
                        <span className="font-semibold">Phim</span>
                        {openFilmOptions ? (
                            <ChevronDownIcon className="w-4 h-4" />
                        ) : (
                            <ChevronRightIcon className="w-4 h-4" />
                        )}
                    </button>
                    {/* Submenu */}
                    {openFilmOptions && (
                        <div className="mt-1 ml-4 space-y-1">
                            <NavLink
                                to={FILM_ADD}
                                className={({ isActive }) =>
                                    `block p-2 text-sm rounded hover:bg-gray-700 
                                    ${isActive ? "bg-gray-700 font-bold" : ""}`
                                }
                            >
                                Thêm phim
                            </NavLink>
                        </div>
                    )}
                </>
                <>
                    <button
                        onClick={() => setOpenShowtimeOptions(!openShowtimeOptions)}
                        className="flex items-center justify-between w-full p-2 rounded hover:bg-gray-700"
                    >
                        <span className="font-semibold">Suất chiếu</span>
                        {openShowtimeOptions ? (
                            <ChevronDownIcon className="w-4 h-4" />
                        ) : (
                            <ChevronRightIcon className="w-4 h-4" />
                        )}
                    </button>
                    {/* Submenu */}
                    {openShowtimeOptions && (
                        <div className="mt-1 ml-4 space-y-1">
                            <NavLink
                                to={SHOWTIME_ADD}
                                className={({ isActive }) =>
                                    `block p-2 text-sm rounded hover:bg-gray-700 
                                    ${isActive ? "bg-gray-700 font-bold" : ""}`
                                }
                            >
                                Thêm suất chiếu
                            </NavLink>
                            <NavLink
                                to={SHOWTIME_RELEASE}
                                className={({ isActive }) =>
                                    `block p-2 text-sm rounded hover:bg-gray-700 
                                    ${isActive ? "bg-gray-700 font-bold" : ""}`
                                }
                            >
                                Công bố suất chiếu
                            </NavLink>
                        </div>
                    )}
                </>
                <>
                    <button
                        onClick={() => setOpenShowtimeSeatOptions(!openFilmOptions)}
                        className="flex items-center justify-between w-full p-2 rounded hover:bg-gray-700"
                    >
                        <span className="font-semibold">Ghế ngồi</span>
                        {openShowtimeSeatOptions ? (
                            <ChevronDownIcon className="w-4 h-4" />
                        ) : (
                            <ChevronRightIcon className="w-4 h-4" />
                        )}
                    </button>
                    {/* Submenu */}
                    {openShowtimeSeatOptions && (
                        <div className="mt-1 ml-4 space-y-1">
                            <NavLink
                                to={SHOWTIME_SEAT_DISPLAY}
                                className={({ isActive }) =>
                                    `block p-2 text-sm rounded hover:bg-gray-700 
                                    ${isActive ? "bg-gray-700 font-bold" : ""}`
                                }
                            >
                                Hiển thị ghế ngồi
                            </NavLink>
                        </div>
                    )}
                </>
            </nav>
        </div>
    );
}
