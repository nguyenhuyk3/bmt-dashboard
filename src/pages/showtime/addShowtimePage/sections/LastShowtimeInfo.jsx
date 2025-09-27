import { formatShowtimeAdd20Minutes, addMinutesToTime, durationToMinutes } from '../../../../utils/convertors/time';

const LastShowtimeInfo = ({ film, lastestShowtime }) => {
    const lastShowtimeInfo = "00:00"; // Có thể được tính toán từ lastestShowtime
    const estimatedEndTime = film && film.duration && lastestShowtime
        ? addMinutesToTime(
            formatShowtimeAdd20Minutes(lastestShowtime),
            durationToMinutes(film.duration)
        )
        : "---";

    return (
        <div className="p-6 border-2 border-yellow-200 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl">
            <h2 className="flex items-center mb-4 text-2xl font-semibold text-gray-800">
                Thông Tin Suất Chiếu Cuối Cùng
            </h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div className="p-4 bg-white rounded-lg">
                    <h3 className="mb-2 font-semibold text-gray-700">Suất chiếu cuối:</h3>
                    <p className="text-lg font-bold text-orange-600">{lastShowtimeInfo}</p>
                    <p className="mt-1 text-sm text-gray-500">Của ngày đã chọn</p>
                </div>
                <div className="p-4 bg-white rounded-lg">
                    <h3 className="mb-2 font-semibold text-gray-700">Thời gian bắt đầu mới:</h3>
                    <p className="text-lg font-bold text-blue-600">
                        {formatShowtimeAdd20Minutes(lastestShowtime)}
                    </p>
                    <p className="mt-1 text-sm text-gray-500">Dự kiến tự động</p>
                </div>
                <div className="p-4 bg-white rounded-lg">
                    <h3 className="mb-2 font-semibold text-gray-700">Thời gian kết thúc:</h3>
                    <p className="text-lg font-bold text-green-600">
                        {estimatedEndTime || ""}
                    </p>
                    <p className="mt-1 text-sm text-gray-500">Theo thời lượng phim</p>
                </div>
            </div>
            <div className="p-3 mt-4 bg-yellow-100 border border-yellow-300 rounded-lg">
                <p className="text-sm text-yellow-800">
                    ⚠️ <strong>Lưu ý:</strong> Nếu suất chiếu kết thúc sau 11:59 PM, đây sẽ là suất chiếu cuối cùng trong ngày.
                </p>
            </div>
        </div>
    );
};

export default LastShowtimeInfo;