import { useState, useEffect, useRef } from "react";
import { Clock, Calendar, ChevronDown, Play } from "lucide-react";

import { timeToMinutes } from "../../../utils/convertors/time";
import { GENRE_NAMES, getGenreColor } from "../../../utils/mappers/index";

const FilmSelector = ({ films, value, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null); // ref cho dropdown
    const selectedMovie = films.find(movie => movie.id === value);
    const handleSelect = (filmId) => {
        onChange(filmId);
        setIsOpen(false);
    };

    // Đóng dropdown khi click ra ngoài
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="max-w-4xl mx-auto">
            {/* Custom Movie Selector */}
            <div className="p-6 bg-white border border-gray-100 shadow-lg rounded-2xl">
                <h2 className="flex items-center mb-6 text-2xl font-semibold text-gray-800">
                    🎭 Chọn Phim
                </h2>
                <div className="relative" ref={dropdownRef}>
                    <label htmlFor="selectFilm" className="block mb-3 text-sm font-medium text-gray-700 hover:cursor-pointer">
                        Tên phim
                    </label>
                    {/* Custom Dropdown Button */}
                    <button
                        id="selectFilm"
                        type="button"
                        onClick={() => setIsOpen(!isOpen)}
                        className="w-full p-4 transition-all duration-200 bg-white border-2 border-gray-200 shadow-sm rounded-xl hover:border-blue-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    >
                        {selectedMovie ? (
                            <div className="flex items-center space-x-4">
                                <div className="relative">
                                    <img
                                        src={selectedMovie.poster}
                                        alt={selectedMovie.title}
                                        className="object-cover w-12 h-16 rounded-lg shadow-md"
                                    />
                                </div>
                                <div className="flex-1 text-left">
                                    <h3 className="text-lg font-semibold text-gray-900">
                                        {selectedMovie.title}
                                    </h3>
                                    <div className="flex items-center mt-1 space-x-4 text-sm text-gray-600">
                                        <span className="flex items-center space-x-1">
                                            <Clock className="w-4 h-4" />
                                            <span>{timeToMinutes(selectedMovie.duration)}</span>
                                        </span>
                                        <span className="flex items-center space-x-1">
                                            <Calendar className="w-4 h-4" />
                                            <span>{selectedMovie.releaseDate}</span>
                                        </span>
                                    </div>
                                </div>
                                <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                            </div>
                        ) : (
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3 text-gray-500">
                                    <div className="flex items-center justify-center w-12 h-16 bg-gray-200 rounded-lg">
                                        🎬
                                    </div>
                                    <span>Chọn phim...</span>
                                </div>
                                <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                            </div>
                        )}
                    </button>
                    {/* Dropdown Menu */}
                    {isOpen && (
                        <div className="absolute left-0 right-0 z-50 mt-2 overflow-y-auto duration-300 bg-white border border-gray-200 shadow-xl top-full rounded-xl max-h-96 animate-in fade-in slide-in-from-top-2">
                            <div className="p-2">
                                {films.map((film) => (
                                    <button
                                        key={film.id}
                                        type="button"
                                        onClick={() => handleSelect(film.id)}
                                        className={`w-full p-4 text-left hover:bg-gray-50 rounded-lg transition-all duration-200 focus:outline-none focus:bg-blue-50 group 
                                            ${film.id === value ? 'bg-blue-50 ring-2 ring-blue-200' : ''
                                            }`}
                                    >
                                        <div className="flex items-start space-x-4">
                                            <div className="relative flex-shrink-0">
                                                <img
                                                    src={film.posterUrl}
                                                    alt={film.title}
                                                    className="object-cover w-16 h-20 transition-shadow duration-200 rounded-lg shadow-md group-hover:shadow-lg"
                                                />
                                                {film.id === value && (
                                                    <div className="absolute inset-0 flex items-center justify-center bg-blue-500 rounded-lg bg-opacity-20">
                                                        <Play className="w-6 h-6 text-blue-600 fill-current" />
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h3 className="mb-1 text-lg font-semibold text-gray-900 truncate">
                                                    {film.title}
                                                </h3>
                                                <p className="mb-2 text-sm text-gray-600 line-clamp-2">
                                                    {film.description}
                                                </p>
                                                <div className="flex items-center space-x-4 text-xs text-gray-500">
                                                    <div className="flex flex-wrap gap-2">
                                                        {film.genres.map((genre, index) => (
                                                            <span
                                                                key={index}
                                                                className={
                                                                    `px-2 py-1 text-xs font-medium rounded-full ${getGenreColor(genre)}`
                                                                }
                                                            >
                                                                {GENRE_NAMES[genre] || genre}
                                                            </span>
                                                        ))}
                                                    </div>
                                                    <span className="flex items-center space-x-1">
                                                        <Clock className="w-3 h-3" />
                                                        <span>{timeToMinutes(film.duration)}</span>
                                                    </span>
                                                </div>
                                            </div>
                                            {film.id === value && (
                                                <div className="flex-shrink-0">
                                                    <div className="flex items-center justify-center w-6 h-6 bg-blue-500 rounded-full">
                                                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                        </svg>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
            {/* Hiển thị phim đã chọn */}
            {selectedMovie && (
                <div className="p-6 mt-8 text-white bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl">
                    <h3 className="mb-4 text-xl font-semibold">🎯 Phim đã chọn</h3>
                    <div className="flex items-center space-x-4">
                        <img
                            src={selectedMovie.poster}
                            alt={selectedMovie.title}
                            className="object-cover w-20 rounded-lg shadow-lg h-28"
                        />
                        <div>
                            <h4 className="mb-2 text-2xl font-bold">{selectedMovie.title}</h4>
                            <div className="flex items-center space-x-4 text-sm opacity-90">
                                <span className="flex items-center space-x-1">
                                    <Clock className="w-4 h-4" />
                                    <span>{timeToMinutes(selectedMovie.duration)}</span>
                                </span>
                                <span>{selectedMovie.genre}</span>
                            </div>
                            <p className="mt-2 text-sm opacity-80">{selectedMovie.description}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FilmSelector;
