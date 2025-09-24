function SubmitButton({ loading }) {
    return (
        <button
            type="submit"
            disabled={loading}
            className={`
                flex-1 px-4 py-2 text-white rounded-md focus:ring-2 focus:ring-blue-500
                ${loading
                    ? "bg-blue-600 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }
            `}
        >
            {loading ? "Đang thêm phim..." : "Thêm phim"}
        </button>
    );
}

export default SubmitButton;