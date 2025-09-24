function ConfirmModal({ open, onConfirm, onCancel }) {
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center min-h-screen bg-black bg-opacity-40">
            <div className="p-6 bg-white rounded-lg shadow-lg w-80">
                <h2 className="mb-4 text-lg font-semibold text-gray-800">
                    Xác nhận hủy bỏ
                </h2>
                <p className="mb-6 text-sm font-medium text-gray-600">
                    Bạn có chắc chắn muốn hủy bỏ các thay đổi?
                </p>
                <div className="flex justify-end space-x-3">
                    <button
                        className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
                        onClick={onCancel}
                    >
                        Quay lại
                    </button>
                    <button
                        className="px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700"
                        onClick={onConfirm}
                    >
                        Xác nhận
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ConfirmModal;