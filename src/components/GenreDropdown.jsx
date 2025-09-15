import { useState, useRef, useEffect } from 'react';
import { GENRE_NAMES, getGenreColor } from "../utils/mappers/index";

export default function GenreDropdown({ selectedGenre, setSelectedGenre }) {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const dropdownRef = useRef(null);

    // Lọc thể loại theo tìm kiếm
    const availableGenres = Object.entries(GENRE_NAMES).filter(([name]) =>
        name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSelectGenre = (genreKey) => {
        setSelectedGenre(genreKey);
        setSearchTerm('');
        setIsOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
                setSearchTerm('');
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Lấy tên hiển thị của thể loại đã chọn
    const displayValue = selectedGenre ? GENRE_NAMES[selectedGenre] : 'Tất cả thể loại';

    return (
        <div className="relative" ref={dropdownRef}>
            <div
                className="flex items-center justify-between px-3 py-2 bg-white border border-gray-300 rounded-lg cursor-pointer hover:border-gray-400 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500"
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className="flex items-center flex-1">
                    {/* Luôn luôn hiển thị vùng cho chấm tròn để giữ layout ổn định */}
                    <div className="flex-shrink-0 w-3 h-3 mr-3">
                        {selectedGenre && (
                            <div className={`w-full h-full rounded-full ${getGenreColor(selectedGenre)}`}></div>
                        )}
                    </div>
                    <input
                        type="text"
                        placeholder={displayValue}
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            if (!isOpen) setIsOpen(true);
                        }}
                        className="flex-1 bg-transparent outline-none cursor-text"
                    />
                </div>
                <svg
                    className={`w-4 h-4 transition-transform flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </div>

            {/* Dropdown Options */}
            {isOpen && (
                <div className={`absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg ${availableGenres.length > 6 ? 'max-h-60 overflow-y-auto' : ''
                    }`}>
                    {/* Option "Tất cả thể loại" */}
                    <div
                        className="flex items-center px-3 py-2 transition-colors cursor-pointer hover:bg-gray-50 first:rounded-t-md"
                        onClick={() => handleSelectGenre('')}
                    >
                        <div className="flex-shrink-0 w-3 h-3 mr-3"></div>
                        <span className="text-sm text-gray-900">Tất cả thể loại</span>
                    </div>
                    {availableGenres.length > 0 ? (
                        availableGenres.map(([key, name]) => (
                            <div
                                key={key}
                                className="flex items-center px-3 py-2 transition-colors cursor-pointer hover:bg-gray-50 last:rounded-b-md"
                                onClick={() => handleSelectGenre(key)}
                            >
                                <div className="flex items-center">
                                    <div className={`w-3 h-3 rounded-full mr-3 flex-shrink-0 ${getGenreColor(key)}`}></div>
                                    <span className="text-sm text-gray-900">{name}</span>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="px-3 py-2 text-sm text-gray-500 rounded-md">
                            <div className="flex-shrink-0 w-3 h-3 mr-3"></div>
                            {searchTerm ? `Không tìm thấy "${searchTerm}"` : "Không có thể loại nào"}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}