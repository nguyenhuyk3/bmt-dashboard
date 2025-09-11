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

export default function GenreSelect({ selectedGenres, setSelectedGenres, required }) {
    const handleChange = (e) => {
        const value = e.target.value;

        if (value && !selectedGenres.includes(value)) {
            setSelectedGenres([...selectedGenres, value]);
        }
        e.target.value = "";
    };

    const removeGenre = (genre) => {
        setSelectedGenres(selectedGenres.filter((g) => g !== genre));
    };

    return (
        <>
            <label className="block mb-2 text-sm font-medium text-gray-700">
                Thể loại  {required && <span className="text-red-500">*</span>}
            </label>
            <select
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            >
                <option value="">Chọn thể loại...</option>
                {Object.entries(genreNames).map(([value, label]) => (
                    <option key={value} value={value}>
                        {label}
                    </option>
                ))}
            </select>

            <div className="flex flex-wrap gap-2 mt-3">
                {selectedGenres.map((genre) => (
                    <span
                        key={genre}
                        className="inline-flex items-center px-3 py-1 text-xs font-medium text-blue-800 bg-blue-100 rounded-full"
                    >
                        {genreNames[genre]}
                        <button
                            type="button"
                            className="ml-2 text-blue-600 hover:text-blue-800"
                            onClick={() => removeGenre(genre)}
                        >
                            ✕
                        </button>
                    </span>
                ))}
            </div>
        </>
    );
}
