const ErrorMessage = ({ error, onRetry }) => {
    return (
        <div className="flex flex-col items-center justify-center p-8 border border-red-200 rounded-lg bg-red-50">
            <div className="mb-4 text-red-600">
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 19.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
            </div>
            <h3 className="mb-2 text-lg font-medium text-red-900">Có lỗi xảy ra</h3>
            <p className="mb-4 text-center text-red-700">{error}</p>
            <button
                onClick={onRetry}
                className="px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
                Thử lại
            </button>
        </div>
    );
};

export default ErrorMessage;