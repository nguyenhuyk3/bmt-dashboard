import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Calendar, Clock, Star, Zap } from 'lucide-react';

const CoefficientDropdown = ({ value, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const coefficientOptions = [
        {
            value: 1,
            label: '1 - Ngày thường',
            description: 'Giá cơ bản',
            icon: Calendar,
            color: 'text-gray-600',
            bgColor: 'bg-gray-50'
        },
        {
            value: 2,
            label: '2 - Cuối tuần',
            description: '+20%',
            icon: Calendar,
            color: 'text-blue-600',
            bgColor: 'bg-blue-50'
        },
        {
            value: 3,
            label: '3 - Ngày lễ',
            description: '+50%',
            icon: Star,
            color: 'text-green-600',
            bgColor: 'bg-green-50'
        },
        {
            value: 4,
            label: '4 - Ngày đặc biệt',
            description: '+100%',
            icon: Zap,
            color: 'text-orange-600',
            bgColor: 'bg-orange-50'
        },
        {
            value: 5,
            label: '5 - Prime time',
            description: '+150%',
            icon: Clock,
            color: 'text-red-600',
            bgColor: 'bg-red-50'
        }
    ];

    const selectedOption = coefficientOptions.find(option => option.value === value);

    const handleSelect = (val) => {
        onChange(val); // báo ngược lên cha
        setIsOpen(false);
    };

    // Đóng dropdown khi click ra ngoài
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

    return (
        <div className="flex flex-col gap-2" ref={dropdownRef}>
            <label className="block text-sm font-medium text-gray-950">
                Hệ số giá (Coefficient)
            </label>
            {/* Custom Dropdown */}
            <div className="relative">
                <button
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-full px-4 py-3 transition-all duration-200 bg-white border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none hover:border-blue-500"
                >
                    <div className="flex items-center justify-between">
                        {selectedOption && (
                            <div className="flex items-center space-x-3">
                                <div className={`p-1 rounded ${selectedOption.bgColor}`}>
                                    <selectedOption.icon className={`w-4 h-4 ${selectedOption.color}`} />
                                </div>
                                <div className="text-left">
                                    <div className="text-sm font-medium text-gray-900">
                                        {selectedOption.label}
                                    </div>
                                    <div className="text-xs text-gray-500">
                                        {selectedOption.description}
                                    </div>
                                </div>
                            </div>
                        )}
                        <ChevronDown
                            className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                        />
                    </div>
                </button>
                {/* Dropdown Menu */}
                {isOpen && (
                    <div className="absolute left-0 right-0 z-10 mt-2 overflow-hidden duration-200 bg-white border border-gray-200 rounded-lg shadow-lg top-full animate-in fade-in slide-in-from-top-2">
                        {coefficientOptions.map((option) => (
                            <button
                                key={option.value}
                                type="button"
                                onClick={() => handleSelect(option.value)}
                                className={`w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors duration-150 focus:outline-none focus:bg-gray-50 ${option.value === value ? 'bg-blue-50 border-r-2 border-blue-500' : ''
                                    }`}
                            >
                                <div className="flex items-center space-x-3">
                                    <div className={`p-2 rounded-lg ${option.bgColor} transition-all duration-150`}>
                                        <option.icon className={`w-4 h-4 ${option.color}`} />
                                    </div>
                                    <div className="flex-1">
                                        <div className="text-sm font-medium text-gray-900">{option.label}</div>
                                        <div className="text-xs text-gray-500 mt-0.5">{option.description}</div>
                                    </div>
                                    {option.value === value && (
                                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                    )}
                                </div>
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CoefficientDropdown;
