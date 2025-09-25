import { Link } from "react-router-dom";
import { useState } from "react";
import { ChevronDownIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import Logo from "../assets/react.svg";
import { DEFAULT, FILM_ADD, SHOWTIME_ADD, SHOWTIME_RELEASE } from "../utils/routes";

export default function Sidebar() {
    const [openFilmOptions, setOpenFilmoptions] = useState(false);
    const [openShowtimeOptions, setOpenShowtimeOptions] = useState(false);

    return (
        <div className="flex flex-col w-64 h-screen text-white bg-gray-800">
            {/* Logo */}
            <div className="flex justify-center p-4 border-b border-gray-700">
                <img src={Logo} alt="Logo" className="h-16" />
            </div>
            {/* Menu */}
            <nav className="flex-1 p-4 space-y-2">
                <Link to={DEFAULT} className="block p-2 rounded hover:bg-gray-700"> Quản lí phim </Link>
                <>
                    <button onClick={() => setOpenFilmoptions(!openFilmOptions)}
                        className="flex items-center justify-between w-full p-2 rounded hover:bg-gray-700" >
                        <span className="font-semibold">
                            Phim
                        </span>
                        {openFilmOptions ?
                            (<ChevronDownIcon className="w-4 h-4" />) :
                            (<ChevronRightIcon className="w-4 h-4" />)}
                    </button>
                    {/* Submenu */}
                    {
                        openFilmOptions && (
                            <div className="mt-1 ml-4 space-y-1">
                                <Link to={FILM_ADD}
                                    className="block p-2 text-sm rounded hover:bg-gray-700" > Thêm phim </Link>
                            </div>
                        )
                    }
                </>
                <>
                    <button onClick={() => setOpenShowtimeOptions(!openShowtimeOptions)}
                        className="flex items-center justify-between w-full p-2 rounded hover:bg-gray-700" >
                        <span className="font-semibold">
                            Suất chiếu
                        </span>
                        {openShowtimeOptions ?
                            (<ChevronDownIcon className="w-4 h-4" />) :
                            (<ChevronRightIcon className="w-4 h-4" />)}
                    </button>
                    {/* Submenu */}
                    {
                        openShowtimeOptions && (
                            <div className="mt-1 ml-4 space-y-1">
                                <Link to={SHOWTIME_ADD}
                                    className="block p-2 text-sm rounded hover:bg-gray-700" >
                                    Thêm suất chiếu
                                </Link>
                                <Link to={SHOWTIME_RELEASE}
                                    className="block p-2 text-sm rounded hover:bg-gray-700" >
                                    Thêm suất chiếu
                                </Link>
                            </div>

                        )
                    }
                </>
            </nav>
        </div>);
}