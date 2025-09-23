import { useState, useEffect } from 'react';
import {
    Film,
    PlayCircle,
    Clock,
    Star,
    Search,
    Menu,
    Eye,
    ChevronLeft,
    ChevronRight
} from 'lucide-react';
import { useDispatch, useSelector } from "react-redux";

import { getFilmsRequest, setCurrentPage } from "../../../features/slices/index";
import { SIZE_OF_PAGINATION } from "../../../utils/constants";
import { GENRE_NAMES, getGenreColor } from '../../../utils/mappers/genre';
import { GenreDropdown, LoadingScreen, ErrorMessage } from "../../../components/index";
import { timeToMinutes } from "../../../utils/convertors/time";
import { Link } from 'react-router-dom';

// Header Component
const DashboardHeader = ({ searchTerm, setSearchTerm }) => {
    return (
        <header className="bg-white border-b border-gray-200 shadow-sm">
            <div className="flex items-center justify-between px-6 py-4">
                <div className="flex items-center">
                    <button className="mr-4 lg:hidden">
                        <Menu className="w-6 h-6" />
                    </button>
                    <h2 className="text-2xl font-semibold text-gray-800">Quản lý phim</h2>
                </div>
                <div className="flex items-center space-x-4">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Tìm kiếm phim..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="py-2 pl-10 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-80"
                        />
                        <Search className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
                    </div>
                </div>
            </div>
        </header>
    );
};

// Stats Card Component
// eslint-disable-next-line no-unused-vars
const StatsCard = ({ icon: Icon, title, value, bgColor }) => {
    return (
        <div className="p-6 bg-white rounded-lg shadow-sm">
            <div className="flex items-center">
                <div className={`p-3 text-white ${bgColor} rounded-lg`}>
                    <Icon className="w-6 h-6" />
                </div>
                <div className="ml-4">
                    <p className="text-sm text-gray-600">{title}</p>
                    <p className="text-2xl font-semibold">{value}</p>
                </div>
            </div>
        </div>
    );
};

// Stats Section Component
const StatsSection = ({ totalFilms }) => {
    const statsData = [
        { icon: Film, title: "Tổng số phim", value: totalFilms, bgColor: "bg-blue-500" },
        { icon: PlayCircle, title: "Đang chiếu", value: 42, bgColor: "bg-green-500" },
        { icon: Clock, title: "Sắp chiếu", value: 28, bgColor: "bg-yellow-500" },
        { icon: Star, title: "Đánh giá TB", value: 8.2, bgColor: "bg-red-500" }
    ];

    return (
        <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-4">
            {
                statsData.map((stat, index) => (
                    <StatsCard key={index} {...stat} />
                ))
            }
        </div>
    );
};

// Filter Section Component
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

// Movie Row Component
const MovieRow = ({ film }) => {
    return (
        <tr className="hover:bg-gray-50">
            <td className="px-6 py-4 overflow-hidden whitespace-nowrap text-ellipsis">
                <div className="flex items-center">
                    <img
                        className="object-cover w-20 rounded h-28 hover:cursor-pointer"
                        src={film.posterUrl === "NONE" ? "/placeholder-movie.png" : film.posterUrl}
                        alt="Movie poster"
                        onError={(e) => {
                            e.target.src = "/placeholder-movie.png";
                        }}
                    />
                    <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{film.title}</div>
                    </div>
                </div>
            </td>
            <td className="px-6 py-4">
                <div className="flex flex-wrap gap-1 hover:cursor-pointer">
                    {
                        film.genres.map((genre, index) => (
                            <span
                                key={index}
                                className={
                                    `px-2 py-1 text-xs font-medium rounded-full ${getGenreColor(genre)}`
                                }
                            >
                                {GENRE_NAMES[genre]}
                            </span>
                        ))
                    }
                </div>
            </td>
            <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                {timeToMinutes(film.duration)}
            </td>
            <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                {film.releaseDate}
            </td>
            <td className="px-6 py-4 space-x-2 text-sm font-medium whitespace-nowrap">
                <Link
                    to={`film/edit/${film.id}`}
                    className="relative inline-block text-green-600 group hover:text-green-900">
                    <Eye className="w-6 h-6" />
                    {/* Tooltip */}
                    <span className="absolute px-2 py-1 mt-1 text-xs text-white transition -translate-x-1/2 bg-gray-500 rounded opacity-0 left-1/2 group-hover:opacity-100">
                        Chỉnh sửa
                    </span>
                </Link>
            </td>

        </tr>
    );
};

// Pagination Component
const Pagination = ({
    currentPage,
    totalPages,
    totalFilms,
    pageSize,
    isFirst,
    isLast,
    onPageChange
}) => {
    // Tính toán số item hiển thị
    const startItem = currentPage * pageSize + 1;
    const endItem = Math.min((currentPage + 1) * pageSize, totalFilms);
    // Tạo array các trang để hiển thị
    const getPageNumbers = () => {
        const pageNumbers = [];
        const maxVisiblePages = 5;

        if (totalPages <= maxVisiblePages) {
            for (let i = 0; i < totalPages; i++) {
                pageNumbers.push(i);
            }
        } else {
            const startPage = Math.max(0, currentPage - 2);
            const endPage = Math.min(totalPages - 1, currentPage + 2);

            for (let i = startPage; i <= endPage; i++) {
                pageNumbers.push(i);
            }
        }

        return pageNumbers;
    };

    return (
        <div className="flex items-center justify-between px-6 py-3 bg-white border-t border-gray-200">
            <div className="flex items-center justify-between flex-1">
                <p className="text-sm text-gray-700">
                    Hiển thị <span className="font-medium">{startItem}</span> đến{' '}
                    <span className="font-medium">{endItem}</span> trong{' '}
                    <span className="font-medium">{totalFilms}</span> kết quả
                </p>
                {totalPages > 1 && (
                    <nav className="relative z-0 inline-flex -space-x-px rounded-md shadow-sm">
                        {/* Previous Button */}
                        <button
                            onClick={() => !isFirst && onPageChange(currentPage - 1)}
                            disabled={isFirst}
                            className={
                                `relative inline-flex items-center px-2 py-2 text-sm font-medium rounded-l-md border border-gray-300 
                                ${isFirst
                                    ? 'text-gray-300 bg-gray-100 cursor-not-allowed'
                                    : 'text-gray-500 bg-white hover:bg-gray-50 cursor-pointer'
                                }`
                            }
                        >
                            <ChevronLeft className="w-4 h-4" />
                        </button>
                        {/* Page Numbers */}
                        {
                            getPageNumbers().map((pageNum) => (
                                <button
                                    key={pageNum}
                                    onClick={() => onPageChange(pageNum)}
                                    className={
                                        `relative inline-flex items-center px-4 py-2 text-sm font-medium border border-gray-300 
                                        ${pageNum === currentPage
                                            ? 'text-white bg-blue-600'
                                            : 'text-gray-700 bg-white hover:bg-gray-50'
                                        }`
                                    }
                                >
                                    {pageNum + 1}
                                </button>
                            ))
                        }
                        {/* Next Button */}
                        <button
                            onClick={() => !isLast && onPageChange(currentPage + 1)}
                            disabled={isLast}
                            className={
                                `relative inline-flex items-center px-2 py-2 text-sm font-medium rounded-r-md border border-gray-300
                                ${isLast
                                    ? 'text-gray-300 bg-gray-100 cursor-not-allowed'
                                    : 'text-gray-500 bg-white hover:bg-gray-50 cursor-pointer'
                                }`
                            }
                        >
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </nav>
                )}
            </div>
        </div>
    );
};

// Films Table Component
const FilmsTable = ({ films, paginationProps, error, onRetry, loading }) => {
    return (
        <div className="overflow-hidden bg-white rounded-lg shadow-sm">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                                Phim
                            </th>
                            <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                                Thể loại
                            </th>
                            <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                                Thời lượng
                            </th>
                            <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                                Ngày phát hành
                            </th>
                            <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                                Thao tác
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {
                            error ? (
                                <tr>
                                    <td colSpan="5" className="px-6 py-4">
                                        <ErrorMessage error={error} onRetry={onRetry} />
                                    </td>
                                </tr>
                            ) : loading && films.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="px-6 py-4 text-center">
                                        <div className="flex items-center justify-center">
                                            <div className="w-8 h-8 border-b-2 border-blue-600 rounded-full animate-spin"></div>
                                            <span className="ml-2 text-gray-600">Đang tải...</span>
                                        </div>
                                    </td>
                                </tr>
                            ) : films.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                                        Không có phim nào
                                    </td>
                                </tr>
                            ) : (
                                films.map((film) => (
                                    <MovieRow key={film.id} film={film} />
                                ))
                            )
                        }
                    </tbody>
                </table>
            </div>
            {!error && <Pagination {...paginationProps} />}
        </div>
    );
};

// Main FilmDashboard Component
const FilmDashboard = () => {
    const dispatch = useDispatch();
    const {
        films,
        totalFilms,
        totalPages,
        currentPage,
        pageSize,
        isFirst,
        isLast,
        loading,
        error
    } = useSelector((state) => state.film);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedGenre, setSelectedGenre] = useState('');
    // const [selectedStatus, setSelectedStatus] = useState('');
    const [sortBy, setSortBy] = useState('');
    // Fetch films khi component mount hoặc khi page thay đổi
    useEffect(() => {
        dispatch(getFilmsRequest({
            page: currentPage,
            size: SIZE_OF_PAGINATION,
        }));
    }, [dispatch, currentPage]);
    // Handle page change
    const handlePageChange = (newPage) => {
        dispatch(setCurrentPage(newPage));
    };
    // Pagination props
    const paginationProps = {
        currentPage,
        totalPages,
        totalFilms,
        pageSize,
        isFirst,
        isLast,
        onPageChange: handlePageChange
    };
    const handleRetry = () => {
        dispatch(getFilmsRequest({
            page: currentPage,
            size: SIZE_OF_PAGINATION,
        }));
    };

    if (loading && films.length === 0) {
        return (
            <LoadingScreen />
        )
    }

    return (
        <div className="bg-gray-50">
            <DashboardHeader
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
            />

            <div className="p-6">
                <StatsSection totalFilms={totalFilms} />

                <FilterSection
                    selectedGenre={selectedGenre}
                    setSelectedGenre={setSelectedGenre}
                    // selectedStatus={selectedStatus}
                    // setSelectedStatus={setSelectedStatus}
                    sortBy={sortBy}
                    setSortBy={setSortBy}
                />

                <FilmsTable
                    films={films}
                    paginationProps={paginationProps}
                    error={error}
                    onRetry={handleRetry}
                    loading={loading}
                />
            </div>
        </div>
    );
};

export default FilmDashboard;