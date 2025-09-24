const SubmitButton = ({ onSubmit, disabled = false, loading = false }) => {
    return (
        <div className="flex justify-center pt-6">
            <button
                onClick={onSubmit}
                disabled={disabled || loading}
                className={`px-8 py-4 text-lg font-semibold text-white transition-all duration-300 transform shadow-lg rounded-xl
                    ${disabled || loading
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover:scale-105'
                    }`}
            >
                {loading ? (
                    <span className="flex items-center">
                        <svg className="w-5 h-5 mr-2 animate-spin" viewBox="0 0 24 24">
                            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" fill="none" />
                            <path fill="currentColor" className="opacity-75" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Đang tạo...
                    </span>
                ) : (
                    '✨ Tạo Suất Chiếu'
                )}
            </button>
        </div>
    );
};

export default SubmitButton;