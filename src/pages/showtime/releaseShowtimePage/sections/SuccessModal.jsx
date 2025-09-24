const SuccessModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-600 bg-opacity-50">
            <div className="max-w-md p-6 mx-auto bg-white rounded-lg">
                <div className="text-center">
                    <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 bg-green-100 rounded-full">
                        <svg
                            className="w-6 h-6 text-green-600"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M5 13l4 4L19 7"
                            ></path>
                        </svg>
                    </div>
                    <h3 className="mb-2 text-lg font-medium text-gray-900">Thành công!</h3>
                    <p className="mb-4 text-sm text-gray-500">
                        Suất chiếu đã được công bố thành công.
                    </p>
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-white transition duration-200 bg-blue-500 rounded-md hover:bg-blue-600"
                    >
                        Đóng
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SuccessModal;
