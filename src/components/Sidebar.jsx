import { Link } from "react-router-dom";
import { useState } from "react";
import { ChevronDownIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import Logo from "../assets/react.svg";
import { DEFAULT, FILM_ADD } from "../utils/routes";

export default function Sidebar() {
    const [openFilmOptions, setOpenFilmoptions] = useState(false);

    return (
        <div className="flex flex-col w-64 h-screen text-white bg-gray-800">
            {/* Logo */}
            <div className="flex justify-center p-4 border-b border-gray-700">
                <img src={Logo} alt="Logo" className="h-16" />
            </div>
            {/* Menu */}
            <nav className="flex-1 p-4 space-y-2">
                <Link to={DEFAULT} className="block p-2 rounded hover:bg-gray-700"> Dashboard </Link>
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
                                <Link to="/settings/account"
                                    className="block p-2 text-sm rounded hover:bg-gray-700" > Sửa thêm </Link>
                                <Link to="/settings/security"
                                    className="block p-2 text-sm rounded hover:bg-gray-700" > Tất cả phim </Link>
                            </div>
                        )
                    }
                </>
                <Link to="/analytics" className="block p-2 rounded hover:bg-gray-700"> Analytics
                </Link>
            </nav>
        </div>);
}