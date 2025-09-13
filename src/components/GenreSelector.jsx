import { useState, useRef, useEffect } from 'react';

const genreNames = {
    action: "Hành động",
    comedy: "Hài kịch",
    drama: "Chính kịch",
    horror: "Kinh dị",
    romance: "Lãng mạn",
    thriller: "Ly kỳ",
    "sci-fi": "Khoa học viễn tưởng",
    fantasy: "Giả tưởng",
    animation: "Hoạt hình",
    documentary: "Tài liệu",
    adventure: "Phiêu lưu",
    crime: "Hình sự",
};

function getGenreColor(genre) {
    const colors = {
        action: 'bg-red-500',
        comedy: 'bg-yellow-500',
        drama: 'bg-purple-500',
        horror: 'bg-black',
        romance: 'bg-pink-500',
        thriller: 'bg-orange-500',
        'sci-fi': 'bg-blue-500',
        fantasy: 'bg-indigo-500',
        animation: 'bg-green-500',
        documentary: 'bg-gray-500',
        adventure: 'bg-emerald-500',
        crime: 'bg-red-800',
    };
    
    return colors[genre] || 'bg-gray-400';
}

export default function GenreSelector({ selectedGenres, setSelectedGenres, error }) {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const dropdownRef = useRef(null);
    // Lọc ra những thể loại chưa được chọn và phù hợp với tìm kiếm
    const availableGenres = Object.entries(genreNames).filter(
        ([key, name]) => !selectedGenres.includes(key) &&
            name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const handleSelectGenre = (genreKey) => {
        if (!selectedGenres.includes(genreKey)) {
            setSelectedGenres([...selectedGenres, genreKey]);
        }

        setSearchTerm('');
        setIsOpen(false);
    };
    const removeGenre = (genre) => {
        setSelectedGenres(selectedGenres.filter((g) => g !== genre));
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

    return (
        <div className="relative w-full" ref={dropdownRef}>
            <label
                htmlFor="genreSelector"
                className="block mb-2 text-sm font-medium text-gray-700"
            >
                Thể loại <span className="text-red-500">*</span>
            </label>

            {/* Custom Dropdown */}
            <div className="relative">
                <div
                    className={`
                        w-full px-3 py-2 border-2 rounded-md shadow-sm bg-white
                        flex items-center justify-between
                        ${error
                            ? "border-red-500 focus-within:ring-red-500 focus-within:border-red-500"
                            : "border-gray-300 focus-within:ring-blue-500 focus-within:border-blue-500 hover:border-gray-400"}
                    `}
                >
                    <input
                    id="genreSelector"
                        type="text"
                        placeholder="Tìm kiếm thể loại..."
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);

                            if (!isOpen) setIsOpen(true);
                        }}
                        onFocus={() => setIsOpen(true)}
                        onClick={(e) => {
                            e.stopPropagation();
                            setIsOpen(true);
                        }}
                        className="flex-1 bg-transparent outline-none cursor-text"
                    />
                    <svg
                        className={`w-4 h-4 transition-transform cursor-pointer ${isOpen ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        onClick={(e) => {
                            e.stopPropagation();
                            setIsOpen(!isOpen);
                        }}
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
                {/* Dropdown Options */}
                {isOpen && (
                    <div className={`absolute z-10 w-full mt-1 bg-white border-2 border-gray-300 rounded-md shadow-lg ${
                        availableGenres.length > 6 ? 'max-h-60 overflow-y-auto' : ''
                    }`}>
                        {availableGenres.length > 0 ? (
                            availableGenres.map(([key, name]) => (
                                <div
                                    key={key}
                                    className="flex items-center px-3 py-2 transition-colors cursor-pointer hover:bg-gray-50 first:rounded-t-md last:rounded-b-md"
                                    onClick={() => handleSelectGenre(key)}
                                >
                                    <div className="flex items-center">
                                        <div className={`w-3 h-3 rounded-full mr-3 ${getGenreColor(key)}`}></div>
                                        <span className="text-sm text-gray-900">{name}</span>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="px-3 py-2 text-sm text-gray-500 rounded-md">
                                {searchTerm ? `Không tìm thấy "${searchTerm}"` : "Không có thể loại nào khả dụng"}
                            </div>
                        )}
                    </div>
                )}
            </div>
            {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
            {/* Selected Genres Tags */}
            <div className="flex flex-wrap gap-2 mt-3">
                {selectedGenres.map((genre) => (
                    <span
                        key={genre}
                        className="inline-flex items-center px-3 py-1 text-sm font-medium text-blue-800 transition-colors bg-blue-100 rounded-full hover:bg-blue-200"
                    >
                        <div className={`w-2 h-2 rounded-full mr-2 ${getGenreColor(genre)}`}></div>
                        {genreNames[genre]}
                        <button
                            type="button"
                            className="ml-2 text-blue-600 hover:text-blue-800 hover:bg-blue-300 rounded-full p-0.5 transition-colors"
                            onClick={() => removeGenre(genre)}
                        >
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </span>
                ))}
            </div>
        </div>
    );
}
