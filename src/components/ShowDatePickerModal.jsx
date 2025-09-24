import { useState } from 'react';
import { Calendar, ChevronLeft, ChevronRight, Clock, X } from 'lucide-react';

const ShowDatePickerModal = ({ label, onChange }) => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate());

    const monthNames = [
        'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6',
        'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'
    ];
    const dayNames = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];

    const getDaysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();
    const getFirstDayOfMonth = (month, year) => new Date(year, month, 1).getDay();

    const isDateValid = (date) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return date >= tomorrow;
    };

    const isToday = (date) => new Date().toDateString() === date.toDateString();
    const isSelected = (date) => selectedDate && date.toDateString() === selectedDate.toDateString();

    const formatDate = (date) => {
        if (!date) return '';
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${year}-${month}-${day}`;
    };

    const handleDateSelect = (day) => {
        const date = new Date(currentYear, currentMonth, day);
        if (!isDateValid(date)) return;

        setSelectedDate(date);
        onChange(formatDate(date));
        setIsOpen(false);
    };

    const goToPreviousMonth = () => {
        if (currentMonth === 0) {
            setCurrentMonth(11);
            setCurrentYear(currentYear - 1);
        } else {
            setCurrentMonth(currentMonth - 1);
        }
    };

    const goToNextMonth = () => {
        if (currentMonth === 11) {
            setCurrentMonth(0);
            setCurrentYear(currentYear + 1);
        } else {
            setCurrentMonth(currentMonth + 1);
        }
    };

    const renderCalendarDays = () => {
        const daysInMonth = getDaysInMonth(currentMonth, currentYear);
        const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
        const days = [];

        for (let i = 0; i < firstDay; i++) days.push(<div key={`empty-${i}`} className="w-10 h-10"></div>);

        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(currentYear, currentMonth, day);
            const valid = isDateValid(date);
            const today = isToday(date);
            const selected = isSelected(date);

            days.push(
                <button
                    key={day}
                    onClick={() => handleDateSelect(day)}
                    disabled={!valid}
                    className={`
                        w-10 h-10 rounded-lg text-sm font-medium transition-all duration-200
                        ${selected ? 'bg-blue-600 text-white shadow-md' :
                            valid ? 'hover:bg-blue-50 text-gray-700 hover:text-blue-600' :
                                'text-gray-300 cursor-not-allowed'}
                        ${today && !selected ? 'ring-2 ring-blue-200' : ''}
                    `}
                >
                    {day}
                </button>
            );
        }
        return days;
    };

    return (
        <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-950">{label}</label>
            <button
                type="button"
                onClick={() => setIsOpen(true)}
                className="flex items-center w-full px-4 py-3 space-x-2 text-left bg-white border border-gray-300 rounded-lg shadow-sm hover:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
                <Calendar className="w-5 h-5 text-gray-400" />
                <span className={selectedDate ? 'text-gray-900' : 'text-gray-500'}>
                    {selectedDate ? formatDate(selectedDate) : 'Chọn ngày chiếu'}
                </span>
            </button>

            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white w-80 p-4 rounded-lg shadow-lg max-h-[90vh] overflow-auto">
                        {/* Header */}
                        <div className="flex items-center justify-between mb-4">
                            <button onClick={goToPreviousMonth} className="p-2 rounded-lg hover:bg-gray-100">
                                <ChevronLeft className="w-5 h-5 text-gray-600" />
                            </button>
                            <h3 className="text-lg font-semibold text-gray-800">
                                {monthNames[currentMonth]} {currentYear}
                            </h3>
                            <button onClick={goToNextMonth} className="p-2 rounded-lg hover:bg-gray-100">
                                <ChevronRight className="w-5 h-5 text-gray-600" />
                            </button>
                        </div>

                        {/* Day Names */}
                        <div className="grid grid-cols-7 gap-1 mb-2 text-xs font-medium text-gray-500">
                            {dayNames.map(day => (
                                <div key={day} className="flex items-center justify-center w-10 h-8">{day}</div>
                            ))}
                        </div>

                        {/* Calendar Grid */}
                        <div className="grid grid-cols-7 gap-1">{renderCalendarDays()}</div>

                        {/* Quick Actions */}
                        <div className="flex items-center justify-between pt-3 mt-4 border-t border-gray-200">
                            <button
                                onClick={() => {
                                    setSelectedDate(tomorrow);
                                    onChange(formatDate(tomorrow));
                                    setIsOpen(false);
                                }}
                                className="flex items-center px-3 py-2 space-x-2 text-sm text-blue-600 rounded-lg hover:bg-blue-50"
                            >
                                <Clock className="w-4 h-4" />
                                <span>Ngày mai</span>
                            </button>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="flex items-center px-3 py-2 space-x-1 text-sm text-gray-500 rounded-lg hover:bg-gray-50"
                            >
                                <X className="w-4 h-4" />
                                <span>Đóng</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ShowDatePickerModal;
