import {
    ChevronLeft,
    ChevronRight
} from 'lucide-react';

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

export default Pagination;