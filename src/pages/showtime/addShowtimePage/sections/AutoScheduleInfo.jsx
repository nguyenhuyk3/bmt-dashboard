const AutoScheduleInfo = ({ isValidSchedule = true }) => {
    return (
        <div className="p-6 border-2 border-green-200 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl">
            <h2 className="flex items-center mb-4 text-2xl font-semibold text-gray-800">
                ⏰ Thông Tin Tự Động
            </h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="p-4 bg-white rounded-lg">
                    <h3 className="mb-2 font-semibold text-gray-700">Logic thời gian:</h3>
                    <ul className="space-y-1 text-sm text-gray-600">
                        <li>• Bắt đầu từ 9:00 AM nếu chưa có suất chiếu</li>
                        <li>• Hoặc sau suất chiếu cuối + 20 phút dọn dẹp</li>
                        <li>• Tự động tính thời gian kết thúc</li>
                    </ul>
                </div>
                <div className="p-4 bg-white rounded-lg">
                    <h3 className="mb-2 font-semibold text-gray-700">Trạng thái:</h3>
                    <p className={`text-sm ${isValidSchedule ? 'text-green-600 font-semibold' : 'text-gray-600'}`}>
                        {isValidSchedule ? 'Sẵn sàng tạo suất chiếu' : 'Cần kiểm tra lại thông tin'}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AutoScheduleInfo;