import { GenreDropdown,  } from "../../../../components/index";

const FilterSection = ({
    selectedGenre,
    setSelectedGenre,
    // selectedStatus,
    // setSelectedStatus,
    sortBy,
    setSortBy
}) => {
    return (
        <div className="mb-6 bg-white rounded-lg shadow-sm">
            <div className="p-4 border-b border-gray-200">
                <div className="flex flex-wrap items-center gap-4">
                    <GenreDropdown
                        selectedGenre={selectedGenre}
                        setSelectedGenre={setSelectedGenre}
                    />
                    {/* <select
                        value={selectedStatus}
                        onChange={(e) => setSelectedStatus(e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Trạng thái</option>
                        <option value="showing">Đang chiếu</option>
                        <option value="upcoming">Sắp chiếu</option>
                        <option value="ended">Đã kết thúc</option>
                    </select> */}
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Sắp xếp theo</option>
                        <option value="name">Tên phim</option>
                        <option value="date">Ngày phát hành</option>
                        <option value="rating">Đánh giá</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

export default FilterSection;
