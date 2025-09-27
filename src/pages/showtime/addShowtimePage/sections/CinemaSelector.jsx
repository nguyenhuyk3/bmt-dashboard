import { useState, useEffect, useRef } from 'react';
import { ChevronDown, Users } from 'lucide-react';

import { getRandomBgColor, getTagColor } from '../../../../utils/randomers/color';

const CinemaSelector = ({ value, onChange, cinemas }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    // Tìm cinema được chọn dựa trên id
    const selectedCinema = cinemas.find(cinema => cinema.id === value);
    const handleSelect = (cinemaId) => {
        onChange(cinemaId);
        setIsOpen(false);
    };

    // Đóng khi click ra ngoài
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Hàm tạo logo từ tên cinema
    const getLogoText = (name) => {
        return name.charAt(0).toUpperCase();
    };

    return (
        <div className="w-full mx-auto" ref={dropdownRef}>
            <div className="p-6 bg-white border border-gray-100 shadow-lg rounded-2xl">
                <h2 className="flex items-center mb-4 text-2xl font-semibold text-gray-800">
                    Chọn Rạp Chiếu
                </h2>
                <div className="relative">
                    <label htmlFor="cinema" className="block mb-3 text-sm font-medium text-gray-700 hover:cursor-pointer">
                        Rạp chiếu phim
                    </label>
                    <button
                        id="cinema"
                        type="button"
                        onClick={() => setIsOpen(!isOpen)}
                        className="w-full p-4 transition-all duration-200 bg-white border-2 border-gray-200 shadow-sm rounded-xl hover:border-blue-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    >
                        {selectedCinema ? (
                            <div className="flex items-center space-x-4">
                                <div className="relative">
                                    <div className={`w-12 h-12 rounded-lg shadow-md flex items-center justify-center text-white text-xl font-bold ${getRandomBgColor(selectedCinema.name)}`}>
                                        {getLogoText(selectedCinema.name)}
                                    </div>
                                </div>
                                <div className="flex-1 text-left">
                                    <h3 className="text-lg font-semibold text-gray-900">
                                        {selectedCinema.name}
                                    </h3>
                                    <div className="flex items-center mt-1 space-x-2 text-sm">
                                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getTagColor(selectedCinema.location)}`}>
                                            {selectedCinema.location}
                                        </span>
                                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getTagColor(selectedCinema.city)}`}>
                                            {selectedCinema.city}
                                        </span>
                                        <span className="flex items-center space-x-1 text-xs text-gray-500">
                                            <Users className="w-4 h-4" />
                                            <span>{selectedCinema.numberOfRooms} phòng</span>
                                        </span>
                                    </div>
                                </div>
                                <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                            </div>
                        ) : (
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3 text-gray-500">
                                    <div className="flex items-center justify-center w-12 h-12 bg-gray-200 rounded-lg">
                                        🏢
                                    </div>
                                    <span>Chọn rạp chiếu...</span>
                                </div>
                                <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                            </div>
                        )}
                    </button>
                    {isOpen && (
                        <div className="absolute left-0 right-0 z-50 mt-2 overflow-y-auto duration-300 bg-white border border-gray-200 shadow-xl top-full rounded-xl max-h-96 animate-in fade-in slide-in-from-top-2">
                            <div className="p-2">
                                {cinemas.map((cinema) => (
                                    <button
                                        key={cinema.id}
                                        type="button"
                                        onClick={() => handleSelect(cinema.id)}
                                        className={`w-full p-4 text-left hover:bg-gray-50 rounded-lg transition-all duration-200 focus:outline-none focus:bg-blue-50 group ${cinema.id === value ? 'bg-blue-50 ring-2 ring-blue-200' : ''
                                            }`}
                                    >
                                        <div className="flex items-start space-x-4">
                                            <div className="relative flex-shrink-0">
                                                <div className={`w-16 h-16 rounded-lg shadow-md flex items-center justify-center text-white text-2xl font-bold transition-shadow duration-200 group-hover:shadow-lg ${getRandomBgColor(cinema.name)}`}>
                                                    {getLogoText(cinema.name)}
                                                </div>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h3 className="mb-1 text-lg font-semibold text-gray-900 truncate">
                                                    {cinema.name}
                                                </h3>
                                                <p className="mb-2 text-sm text-gray-600 line-clamp-2">
                                                    {cinema.location}
                                                </p>
                                                <div className="flex flex-wrap items-center gap-2 text-xs">
                                                    <span className={`px-2 py-1 rounded-full ${getTagColor(cinema.location)}`}>
                                                        {cinema.location}
                                                    </span>
                                                    <span className={`px-2 py-1 rounded-full ${getTagColor(cinema.city)}`}>
                                                        {cinema.city}
                                                    </span>
                                                    <span className="flex items-center space-x-1 text-gray-500">
                                                        <Users className="w-3 h-3" />
                                                        <span>{cinema.numberOfRooms} phòng</span>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CinemaSelector;