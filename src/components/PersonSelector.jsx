import { useState, useRef, useEffect } from 'react';

export default function PersonSelector({ selectedPeople, setSelectedPeople, options, label, error }) {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const dropdownRef = useRef(null);
    // Lọc ra những người chưa được chọn và phù hợp với tìm kiếm
    const availableOptions = options.filter(
        (p) => !selectedPeople.some((sp) => sp.id === p.id) &&
            p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const handleSelectPerson = (person) => {
        if (!selectedPeople.some((p) => p.id === person.id)) {
            setSelectedPeople([...selectedPeople, person]);
        }

        setSearchTerm('');
        setIsOpen(false);
    };
    const removePerson = (id) => {
        setSelectedPeople(selectedPeople.filter((p) => p.id !== id));
    };

    // Đóng dropdown khi click bên ngoài
    useEffect(() => {
        const handleClickOutside = (event) => {
            // dropdownRef.current.contains(event.target) kiểm tra click có nằm trong dropdown hay không.
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
                setSearchTerm('');
            }
        };

        /*
            Lắng nghe sự kiện click chuột trên toàn bộ tài liệu (document).
            Khi click bất kỳ đâu, hàm handleClickOutside sẽ được gọi
        */
        document.addEventListener('mousedown', handleClickOutside);

        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="relative w-full" ref={dropdownRef}>
            <label
                htmlFor={`${label}Selector`}
                className="block mb-2 text-sm font-medium text-gray-700 hover:cursor-pointer"
            >
                {label} <span className="text-red-500">*</span>
            </label>
            {/* Custom Dropdown */}
            <div className="relative">
                <div
                    className={`
                        w-full px-3 py-2 border-2 rounded-md shadow-sm cursor-pointer bg-white
                        flex items-center justify-between
                        ${error
                            ? "border-red-500 focus-within:ring-red-500 focus-within:border-red-500"
                            : "border-gray-300 focus-within:ring-blue-500 focus-within:border-blue-500 hover:border-gray-400"}
                    `}
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <input
                        id={`${label}Selector`}
                        type="text"
                        placeholder={`Tìm kiếm ${label.toLowerCase()}...`}
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setIsOpen(true);
                        }}
                        // onFocus={() => setIsOpen(true)}
                        className="flex-1 bg-transparent outline-none"
                    />
                    <svg
                        className={`
                            w-4 h-4 transition-transform 
                            ${isOpen ? 'rotate-180' : ''}
                            `}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
                {/* Dropdown Options */}
                {isOpen && (
                    <div className="absolute z-10 w-full mt-1 overflow-auto bg-white border-2 border-gray-300 rounded-md shadow-lg max-h-60">
                        {
                            availableOptions.length > 0 ? (
                                availableOptions.map((person) => (
                                    <div
                                        key={person.id}
                                        className="flex items-center px-3 py-2 transition-colors cursor-pointer hover:bg-gray-50"
                                        onClick={() => handleSelectPerson(person)}
                                    >
                                        {person.avatarUrl && (
                                            <img
                                                src={person.avatarUrl}
                                                alt={person.name}
                                                className="object-cover w-6 h-6 mr-3 rounded-full"
                                            />
                                        )}
                                        <span className="text-sm text-gray-900">{person.name}</span>
                                    </div>
                                ))
                            ) : (
                                <div className="px-3 py-2 text-sm text-gray-500">
                                    {searchTerm ? `Không tìm thấy "${searchTerm}"` : `Không có ${label.toLowerCase()} nào khả dụng`}
                                </div>
                            )
                        }
                    </div>
                )}
            </div>
            {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
            {/* Selected People Tags */}
            <div className="flex flex-wrap gap-2 mt-3">
                {
                    selectedPeople.map((person) => (
                        <span
                            key={person.id}
                            className="inline-flex items-center px-3 py-1 text-sm font-medium text-blue-800 transition-colors bg-blue-100 rounded-full hover:bg-blue-200"
                        >
                            {
                                person.avatarUrl && (
                                    <img
                                        src={person.avatarUrl}
                                        alt={person.name}
                                        className="object-cover w-4 h-4 mr-2 rounded-full"
                                    />
                                )
                            }
                            {person.name}
                            <button
                                type="button"
                                className="ml-2 text-blue-600 hover:text-blue-800 hover:bg-blue-300 rounded-full p-0.5 transition-colors"
                                onClick={() => removePerson(person.id)}
                            >
                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                    <path
                                        fillRule="evenodd"
                                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                        clipRule="evenodd" />
                                </svg>
                            </button>
                        </span>
                    ))
                }
            </div>
        </div>
    );
}