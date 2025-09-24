import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";

import { getFilmsRequest, setCurrentPage } from "../../../features/slices/index";
import { SIZE_OF_PAGINATION } from "../../../utils/constants";
import { LoadingScreen} from "../../../components/index";
import DashboardHeader from "./sections/DashboardHeader";
import StatsSection from "./sections/StatsSection";
import FilterSection from "./sections/FilterSection";
import FilmsTable from './sections/FilmsTable';

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