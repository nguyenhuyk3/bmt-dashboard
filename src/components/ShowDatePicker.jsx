import React, { useState, useRef, useEffect } from 'react';
import { Calendar, ChevronLeft, ChevronRight, Clock } from 'lucide-react';

const ShowDatePicker = ({ label, onChange }) => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
    const datePickerRef = useRef(null);
    // Ngày mai
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate());
    // Tên tháng tiếng Việt
    const monthNames = [
        'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6',
        'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'
    ];
    // Tên ngày trong tuần tiếng Việt
    const dayNames = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
    // Đóng calendar khi click bên ngoài
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (datePickerRef.current && !datePickerRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);
    // Lấy số ngày trong tháng
    const getDaysInMonth = (month, year) => {
        return new Date(year, month + 1, 0).getDate();
    };
    // Lấy ngày đầu tiên của tháng rơi vào thứ mấy
    const getFirstDayOfMonth = (month, year) => {
        return new Date(year, month, 1).getDay();
    };
    // Kiểm tra ngày có hợp lệ không (từ ngày mai trở đi)
    const isDateValid = (date) => {
        const today = new Date();

        today.setHours(0, 0, 0, 0);

        return date >= tomorrow;
    };
    // Kiểm tra ngày có phải là hôm nay không
    const isToday = (date) => {
        const today = new Date();

        return date.toDateString() === today.toDateString();
    };
    // Kiểm tra ngày có được chọn không
    const isSelected = (date) => {
        return selectedDate && date.toDateString() === selectedDate.toDateString();
    };

    // Format ngày thành chuỗi
    const formatDate = (date) => {
        if (!date) return '';

        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();

        return `${year}-${month}-${day}`;
    };

    // Xử lý chọn ngày
    const handleDateSelect = (day) => {
        const date = new Date(currentYear, currentMonth, day);

        if (isDateValid(date)) {
            setSelectedDate(date);
            setIsOpen(false);
            onChange(formatDate(date));
        }
    };

    // Chuyển tháng trước
    const goToPreviousMonth = () => {
        if (currentMonth === 0) {
            setCurrentMonth(11);
            setCurrentYear(currentYear - 1);
        } else {
            setCurrentMonth(currentMonth - 1);
        }
    };

    // Chuyển tháng sau
    const goToNextMonth = () => {
        if (currentMonth === 11) {
            setCurrentMonth(0);
            setCurrentYear(currentYear + 1);
        } else {
            setCurrentMonth(currentMonth + 1);
        }
    };

    // Render các ngày trong tháng
    const renderCalendarDays = () => {
        const daysInMonth = getDaysInMonth(currentMonth, currentYear);
        const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
        const days = [];

        // Thêm các ô trống cho những ngày của tháng trước
        for (let i = 0; i < firstDay; i++) {
            days.push(<div key={`empty-${i}`} className="w-10 h-10"></div>);
        }

        // Thêm các ngày trong tháng
        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(currentYear, currentMonth, day);
            const isValidDate = isDateValid(date);
            const isTodayDate = isToday(date);
            const isSelectedDate = isSelected(date);

            days.push(
                <button
                    key={day}
                    onClick={() => handleDateSelect(day)}
                    disabled={!isValidDate}
                    className={`
                        w-10 h-10 rounded-lg text-sm font-medium transition-all duration-200
                        ${isSelectedDate
                            ? 'bg-blue-600 text-white shadow-md'
                            : isValidDate
                                ? 'hover:bg-blue-50 text-gray-700 hover:text-blue-600'
                                : 'text-gray-300 cursor-not-allowed'
                        }
                        ${isTodayDate && !isSelectedDate ? 'ring-2 ring-blue-200' : ''}
                    `}
                >
                    {day}
                </button>
            );
        }

        return days;
    };

    return (
        <div className="flex flex-col gap-2" ref={datePickerRef}>
            <label htmlFor="customDatePicker" className="text-sm font-medium text-gray-950">
                {label}
            </label>
            <div className="relative">
                <button
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-full px-4 py-3 text-left transition-all duration-200 bg-white border border-gray-300 rounded-lg shadow-sm hover:border-blue-500 hover:ring-blue-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                >
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <Calendar className="w-5 h-5 text-gray-400" />
                            <span className={selectedDate ? 'text-gray-900' : 'text-gray-500'}>
                                {selectedDate ? formatDate(selectedDate) : 'Chọn ngày chiếu'}
                            </span>
                        </div>
                        <div className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </div>
                </button>
                {/* Calendar Dropdown */}
                {isOpen && (
                    <div className="absolute left-0 right-0 z-50 p-4 mt-2 duration-200 bg-white border border-gray-200 rounded-lg shadow-lg top-full animate-in fade-in slide-in-from-top-2">
                        {/* Header với điều hướng tháng */}
                        <div className="flex items-center justify-between mb-4">
                            <button
                                onClick={goToPreviousMonth}
                                className="p-2 transition-colors duration-200 rounded-lg hover:bg-gray-100"
                            >
                                <ChevronLeft className="w-5 h-5 text-gray-600" />
                            </button>
                            <h3 className="text-lg font-semibold text-gray-800">
                                {monthNames[currentMonth]} {currentYear}
                            </h3>
                            <button
                                onClick={goToNextMonth}
                                className="p-2 transition-colors duration-200 rounded-lg hover:bg-gray-100"
                            >
                                <ChevronRight className="w-5 h-5 text-gray-600" />
                            </button>
                        </div>
                        {/* Tên các ngày trong tuần */}
                        <div className="grid grid-cols-7 gap-1 mb-2">
                            {dayNames.map(day => (
                                <div key={day} className="flex items-center justify-center w-10 h-8 text-xs font-medium text-gray-500">
                                    {day}
                                </div>
                            ))}
                        </div>
                        {/* Lưới các ngày */}
                        <div className="grid grid-cols-7 gap-1">
                            {renderCalendarDays()}
                        </div>
                        {/* Quick actions */}
                        <div className="flex items-center justify-between pt-3 mt-4 border-t border-gray-200">
                            <button
                                onClick={() => {
                                    setSelectedDate(tomorrow);
                                    setIsOpen(false);
                                }}
                                className="flex items-center px-3 py-2 space-x-2 text-sm text-blue-600 transition-colors duration-200 rounded-lg hover:bg-blue-50"
                            >
                                <Clock className="w-4 h-4" />
                                <span>Ngày mai</span>
                            </button>

                            <button
                                onClick={() => setIsOpen(false)}
                                className="px-3 py-2 text-sm text-gray-500 transition-colors duration-200 rounded-lg hover:bg-gray-50"
                            >
                                Đóng
                            </button>
                        </div>
                    </div>
                )}
            </div>
            <small className="flex items-center space-x-1 text-gray-500">
                <span>Chỉ có thể chọn từ ngày mai trở đi</span>
            </small>
        </div>
    );
};

export default ShowDatePicker;