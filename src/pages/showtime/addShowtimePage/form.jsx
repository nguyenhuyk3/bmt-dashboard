import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { CoefficientDropdown, ShowDatePicker } from '../../../components/index';
import FilmSelector from './FilmSelector';
import CinemaAndAuditoriumSelector from './CinemaAndAuditoriumSelector';
import {
    addShowtimeRequest,
    getAllCinemasRequest, getAllFilmsRequest,
    getLatestShowtimeByAuditoriumIdAndByShowDateRequest
} from "../../../features/slices/index";
import { formatShowtimeAdd20Minutes, addMinutesToTime, durationToMinutes } from '../../../utils/convertors/time';

const MovieShowtimeForm = () => {
    const dispatch = useDispatch();
    const [film, setFilm] = useState(null);
    const {
        films
    } = useSelector((state) => state.film);
    const {
        cinemas
    } = useSelector((state) => state.cinema);
    const {
        auditoriums,
        loading: auditoriumsLoading
    } = useSelector((state) => state.auditorium);
    const {
        lastestShowtime
    } = useSelector((state) => state.showtime);
    const [formData, setFormData] = useState({
        filmId: '',
        auditoriumId: '',
        showDate: '',
        coefficient: 1
    });

    useEffect(() => {
        dispatch(getAllFilmsRequest());
    }, [dispatch]);
    useEffect(() => {
        dispatch(getAllCinemasRequest());
    }, [dispatch]);
    useEffect(() => {
        if (formData.auditoriumId && formData.showDate) {
            dispatch(getLatestShowtimeByAuditoriumIdAndByShowDateRequest({
                auditoriumId: formData.auditoriumId,
                showDate: formData.showDate
            }));
        }
    }, [dispatch, formData.auditoriumId, formData.showDate]);
    useEffect(() => {
        setFilm(films.find(f => f.id === formData.filmId));
    }, [formData.filmId, films])
    // Xử lý khi form data thay đổi
    const handleFormDataChange = (newData) => {
        setFormData(prev => ({ ...prev, ...newData }));
    };
    // Các biến để hiển thị thông tin tự động (bạn có thể implement logic này)
    const lastShowtimeInfo = "21:30";
    const estimatedEndTime =
        film && film.duration && lastestShowtime
            ? addMinutesToTime(
                formatShowtimeAdd20Minutes(lastestShowtime),
                durationToMinutes(film.duration)
            )
            : null;
    const isValidSchedule = true;

    const handleSubmit = () => {
        console.log('Submitting form data:', formData);

        dispatch(addShowtimeRequest(formData))
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            <div className="container px-4 py-8 mx-auto">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="mb-8 text-center">
                        <h1 className="mb-2 text-3xl font-bold text-gray-800">🎬 Thêm Suất Chiếu Phim</h1>
                        <p className="text-gray-600">Thiết lập suất chiếu mới - Tự động tính toán thời gian</p>
                    </div>
                    {/* Main Form */}
                    <div className="p-8 bg-white shadow-xl rounded-2xl">
                        <div className="space-y-8">
                            {/* Film Selection */}
                            <FilmSelector
                                films={films}
                                value={formData.filmId}
                                onChange={(filmId) => handleFormDataChange({ filmId })}
                            />
                            {/* Cinema Selection */}
                            <CinemaAndAuditoriumSelector
                                cinemas={cinemas}
                                auditoriums={auditoriums}
                                auditoriumsLoading={auditoriumsLoading}
                                formData={formData}
                                onFormDataChange={handleFormDataChange}
                            />
                            {/* Date & Coefficient */}
                            <div className="p-6 bg-gray-50 rounded-xl">
                                <h2 className="flex items-center mb-4 text-2xl font-semibold text-gray-800">
                                    📅 Ngày Chiếu & Hệ Số
                                </h2>
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                    <ShowDatePicker
                                        label={"Ngày chiếu"}
                                        value={formData.showDate}
                                        onChange={(showDate) => handleFormDataChange({ showDate })}
                                    />
                                    <CoefficientDropdown
                                        value={formData.coefficient}
                                        onChange={(coefficient) => handleFormDataChange({ coefficient })}
                                    />
                                </div>
                            </div>
                            {/* Last Showtime Info */}
                            <div className="p-6 border-2 border-yellow-200 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl">
                                <h2 className="flex items-center mb-4 text-2xl font-semibold text-gray-800">
                                    🕐 Thông Tin Suất Chiếu Cuối Cùng
                                </h2>
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                                    <div className="p-4 bg-white rounded-lg">
                                        <h3 className="mb-2 font-semibold text-gray-700">Suất chiếu cuối:</h3>
                                        <p className="text-lg font-bold text-orange-600">{lastShowtimeInfo}</p>
                                        <p className="mt-1 text-sm text-gray-500">Của ngày đã chọn</p>
                                    </div>
                                    <div className="p-4 bg-white rounded-lg">
                                        <h3 className="mb-2 font-semibold text-gray-700">Thời gian bắt đầu mới:</h3>
                                        <p className="text-lg font-bold text-blue-600">{formatShowtimeAdd20Minutes(lastestShowtime)}</p>
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
                            {/* Automatic Schedule Preview */}
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
                                            Sẵn sàng tạo suất chiếu
                                        </p>
                                    </div>
                                </div>
                            </div>
                            {/* Submit Button */}
                            <div className="flex justify-center pt-6">
                                <button
                                    onClick={handleSubmit}
                                    className="px-8 py-4 text-lg font-semibold text-white transition-all duration-300 transform shadow-lg bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl hover:from-blue-700 hover:to-purple-700 hover:scale-105"
                                >
                                    ✨ Tạo Suất Chiếu
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieShowtimeForm;
