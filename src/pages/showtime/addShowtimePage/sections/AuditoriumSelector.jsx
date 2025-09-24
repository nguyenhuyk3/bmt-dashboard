import { useState, useEffect, useRef } from 'react';
import { ChevronDown, Star, Users, Loader2 } from 'lucide-react';

import { getTagColor } from '../../../../utils/randomers/color';

const AuditoriumSelector = ({ value, onChange, auditoriums, disabled, loading, isAuditoriumSelectorSmall }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const selectedAuditorium = auditoriums.find(auditorium => auditorium.id === value);
    const handleSelect = (auditoriumId) => {
        onChange(auditoriumId);
        setIsOpen(false);
    };

    // Đóng khi click ra ngoài
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Các feature của phòng chiếu dựa trên số thứ tự
    const getAuditoriumDetails = (auditorium) => {
        const baseDetails = { capacity: auditorium.numberOfSeats, features: [] };
        // Lấy số thứ tự từ tên phòng (Auditorium 1, Auditorium 2, ...)
        const auditoriumNumber = parseInt(auditorium.name.match(/\d+/)?.[0] || '1');
        // Phân loại dựa trên số thứ tự
        if (auditoriumNumber <= 2) {
            return {
                ...baseDetails,
                type: 'Standard',
                icon: '🎪',
                features: ['Màn hình tiêu chuẩn', 'Âm thanh 5.1']
            };
        } else if (auditoriumNumber <= 4) {
            return {
                ...baseDetails,
                type: 'Premium',
                icon: '⭐',
                features: ['Ghế nằm', 'Không gian rộng rãi']
            };
        } else if (auditoriumNumber <= 6) {
            return {
                ...baseDetails,
                type: 'VIP',
                icon: '👑',
                features: ['Ghế da cao cấp', 'Dịch vụ đồ uống']
            };
        } else if (auditoriumNumber <= 8) {
            return {
                ...baseDetails,
                type: 'IMAX',
                icon: '📽️',
                features: ['Màn hình IMAX', 'Âm thanh Dolby Atmos']
            };
        } else {
            return {
                ...baseDetails,
                type: '4DX',
                icon: '🎢',
                features: ['Ghế chuyển động', 'Hiệu ứng môi trường']
            };
        }
    };

    return (
        <div className="w-full mx-auto" ref={dropdownRef} style={{ maxHeight: '60vh' }}>
            <div className="p-6 bg-white border border-gray-100 shadow-lg rounded-2xl">
                <h2 className="flex items-center mb-4 text-2xl font-semibold text-gray-800">
                    🎪 Chọn Phòng Chiếu
                </h2>
                <div className="relative">
                    <label htmlFor="auditorium" className="block mb-3 text-sm font-medium text-gray-700 hover:cursor-pointer">
                        Phòng chiếu
                    </label>
                    <button
                        id="auditorium"
                        type="button"
                        onClick={() => !disabled && !loading && setIsOpen(!isOpen)}
                        disabled={disabled || loading}
                        className={`w-full p-4 transition-all duration-200 border-2 border-gray-200 shadow-sm rounded-xl focus:outline-none 
                            ${disabled || loading ? 'bg-gray-200 cursor-not-allowed'
                                : 'bg-white hover:border-blue-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500'}`}
                    >
                        {loading ? (
                            <div className="flex items-center space-x-4">
                                <div className="flex items-center justify-center w-12 h-12 bg-gray-300 rounded-lg">
                                    <Loader2 className="w-6 h-6 text-gray-600 animate-spin" />
                                </div>
                                <div className="flex-1 text-left">
                                    <span className="text-gray-600">Đang tải phòng chiếu...</span>
                                </div>
                            </div>
                        ) : selectedAuditorium ? (
                            <div className="flex items-center space-x-4">
                                <div className="relative">
                                    <div className="flex items-center justify-center w-12 h-12 text-2xl text-white bg-purple-500 rounded-lg shadow-md">
                                        {getAuditoriumDetails(selectedAuditorium).icon}
                                    </div>
                                </div>
                                <div className="flex-1 text-left">
                                    <h3 className="text-lg font-semibold text-gray-900">
                                        {selectedAuditorium.name}
                                    </h3>
                                    <div className="flex items-center mt-1 space-x-4 text-sm text-gray-600">
                                        <span className="flex items-center space-x-1">
                                            <Users className="w-4 h-4" />
                                            <span>{selectedAuditorium.numberOfSeats} ghế</span>
                                        </span>
                                        <span className="px-2 py-1 text-xs text-purple-600 bg-purple-100 rounded-full">
                                            {getAuditoriumDetails(selectedAuditorium).type}
                                        </span>
                                    </div>
                                </div>
                                <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                            </div>
                        ) : (
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3 text-gray-500">
                                    <div className="flex items-center justify-center w-12 h-12 bg-gray-200 rounded-lg">
                                        🎪
                                    </div>
                                    <span>{disabled ? 'Vui lòng chọn rạp chiếu trước' : 'Chọn phòng chiếu...'}</span>
                                </div>
                                <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                            </div>
                        )}
                    </button>
                    {isOpen && !disabled && !loading && auditoriums.length > 0 && (
                        <div className={`absolute left-0 right-0 z-50 mt-2 overflow-y-auto duration-300 bg-white border border-gray-200 shadow-xl top-full rounded-xl animate-in fade-in slide-in-from-top-2 
                            ${isAuditoriumSelectorSmall ? 'max-h-72' : 'max-h-96'
                            }`}>
                            <div className="p-2">
                                {auditoriums.map((auditorium) => {
                                    const details = getAuditoriumDetails(auditorium);
                                    return (
                                        <button
                                            key={auditorium.id}
                                            type="button"
                                            onClick={() => handleSelect(auditorium.id)}
                                            className={`w-full p-4 text-left hover:bg-gray-50 rounded-lg transition-all duration-200 focus:outline-none focus:bg-purple-50 group 
                                                ${auditorium.id === value ? 'bg-purple-50 ring-2 ring-purple-200' : ''}`}
                                        >
                                            <div className="flex items-start space-x-4">
                                                <div className="relative flex-shrink-0">
                                                    <div className="flex items-center justify-center w-16 h-16 text-2xl text-white transition-shadow duration-200 bg-purple-500 rounded-lg shadow-md group-hover:shadow-lg">
                                                        {details.icon}
                                                    </div>
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <h3 className="mb-1 text-lg font-semibold text-gray-900 truncate">
                                                        {auditorium.name}
                                                    </h3>
                                                    <div className="flex items-center mb-2 space-x-2">
                                                        {details.features.map((feature, idx) => (
                                                            <span
                                                                key={idx}
                                                                className={`px-2 py-1 text-xs font-medium rounded-full ${getTagColor(feature)}`}
                                                            >
                                                                {feature}
                                                            </span>
                                                        ))}
                                                    </div>
                                                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                                                        <span className="flex items-center space-x-1">
                                                            <Users className="w-3 h-3" />
                                                            <span>{details.capacity} ghế</span>
                                                        </span>
                                                        <span className="flex items-center space-x-1">
                                                            <Star className="w-3 h-3" />
                                                            <span>{details.type}</span>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>
                <div className="p-4 mt-4 border border-blue-200 rounded-lg bg-blue-50">
                    <p className="text-sm text-blue-700">
                        ℹ️ <strong>Lưu ý:</strong> Số ghế của mỗi phòng chiếu có thể khác nhau tùy theo loại phòng và vị trí ghế.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AuditoriumSelector;