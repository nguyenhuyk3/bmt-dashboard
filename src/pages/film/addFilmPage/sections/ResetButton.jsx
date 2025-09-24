function ResetButton({ loading, onReset }) {
    return (
        <button
            type="button"
            onClick={onReset}
            disabled={loading}
            className={`
                flex-1 px-4 py-2 rounded-md focus:ring-2 focus:ring-gray-500
                ${loading
                    ? "bg-gray-300 text-gray-700 cursor-not-allowed"
                    : "bg-gray-300 text-gray-700 hover:bg-gray-400"
                }
            `}
        >
            Làm mới
        </button>
    );
}

export default ResetButton;