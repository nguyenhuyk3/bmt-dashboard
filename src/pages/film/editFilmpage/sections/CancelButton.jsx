function CancelButton({ loading, onCancel }) {
    return (
        <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className={`
                flex-1 px-4 py-2 rounded-md focus:ring-2 focus:ring-gray-500
                ${loading
                    ? "bg-gray-300 text-gray-700 cursor-not-allowed"
                    : "bg-gray-300 text-gray-700 hover:bg-gray-400"
                }
            `}
        >
            Hủy bỏ
        </button>
    );
}

export default CancelButton;