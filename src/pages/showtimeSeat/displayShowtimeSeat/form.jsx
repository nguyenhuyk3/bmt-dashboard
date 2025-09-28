import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CinemaAuditoriumSelectorSection from '../../showtime/releaseShowtimePage/sections/CinemaAuditoriumSelectorSection';
import {
    findAllReleasedShowtimeByAuditoriumIdRequest,
    getAllCinemasRequest,
    getShowtimeSeatsByShowtimeIdRequest
} from '../../../features/slices';
import Seats from './sections/Seats';

// Hàm format thời gian từ ISO string sang HH:MM
const formatTime = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString('vi-VN', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    });
};

// ✅ Group showtimes by showDate
const groupShowtimesByDate = (showtimes) => {
    return showtimes.reduce((acc, showtime) => {
        const date = showtime.showDate;
        if (!acc[date]) {
            acc[date] = [];
        }
        acc[date].push(showtime);
        return acc;
    }, {});
};

export default function DisplayShowtimeSeatForm() {
    const dispatch = useDispatch();
    const { cinemas } = useSelector((state) => state.cinema);
    const { auditoriums, loading: auditoriumsLoading } = useSelector((state) => state.auditorium);
    const { showtimes } = useSelector((state) => state.showtime);
    const { seats, metadata } = useSelector((state) => state.showtimeSeat);
    const [requestParams, setRequestParams] = useState({
        auditoriumId: '',
        showDate: '',
        showtimeId: '',
    });

    useEffect(() => {
        dispatch(getAllCinemasRequest());
    }, [dispatch]);

    useEffect(() => {
        if (requestParams.auditoriumId.length !== 0) {
            dispatch(findAllReleasedShowtimeByAuditoriumIdRequest(requestParams.auditoriumId))
        }
    }, [dispatch, requestParams.auditoriumId]);

    useEffect(() => {
        if (requestParams.showtimeId.length !== 0) {
            dispatch(getShowtimeSeatsByShowtimeIdRequest(requestParams.showtimeId));
        }
    }, [dispatch, requestParams.showtimeId])

    const handleRequestParamsChange = (newData) => {
        setRequestParams(prev => ({ ...prev, ...newData }));
    };

    // ✅ Grouped showtimes theo ngày
    const groupedShowtimes = groupShowtimesByDate(showtimes);
    // Kiểm tra xem có suất chiếu hay không khi đã chọn rạp và phòng chiếu
    const hasShowtimes = requestParams.auditoriumId && showtimes.length > 0;
    const noShowtimesMessage = requestParams.auditoriumId && showtimes.length === 0;
    // ✅ Điều kiện hiển thị Seats - chỉ hiển thị khi có đầy đủ dữ liệu và có suất chiếu
    const shouldShowSeats = requestParams.showtimeId &&
        seats.length > 0 &&
        metadata &&
        hasShowtimes &&
        requestParams.showDate &&
        groupedShowtimes[requestParams.showDate]?.some(st => st.showtimeId === requestParams.showtimeId);

    return (
        <>
            <div className="max-w-4xl p-6 mx-auto mb-8 rounded-lg shadow-lg bg-amber-50">
                {/* Cinema & Auditorium Selection */}
                <div className="p-6 mb-20 bg-white border border-gray-100 shadow-lg rounded-xl">
                    <CinemaAuditoriumSelectorSection
                        cinemas={cinemas}
                        auditoriums={auditoriums}
                        loading={auditoriumsLoading}
                        formData={requestParams}
                        onFormDataChange={handleRequestParamsChange}
                    />
                </div>

                {/* No Showtimes Message */}
                {noShowtimesMessage && (
                    <div className="p-8 bg-white border border-gray-100 shadow-lg rounded-xl">
                        <div className="text-center">
                            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-orange-100 rounded-full">
                                <svg className="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                                </svg>
                            </div>
                            <h3 className="mb-2 text-xl font-semibold text-gray-700">Không có suất chiếu</h3>
                            <p className="text-gray-500">Hiện tại không có suất chiếu nào cho rạp và phòng chiếu đã chọn. Vui lòng chọn rạp hoặc phòng chiếu khác.</p>
                        </div>
                    </div>
                )}

                {/* Date Selection */}
                {hasShowtimes && Object.keys(groupedShowtimes).length > 0 && (
                    <div className="p-6 mb-8 bg-white border border-gray-100 shadow-lg rounded-xl">
                        <h3 className="flex items-center mb-4 text-xl font-semibold text-gray-800">
                            <svg className="w-6 h-6 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            Chọn Ngày Chiếu
                        </h3>
                        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-6">
                            {Object.keys(groupedShowtimes).map(date => (
                                <button
                                    key={date}
                                    onClick={() => handleRequestParamsChange({
                                        showDate: date,
                                        showtimeId: '' // Reset showtimeId khi chọn ngày mới
                                    })}
                                    className={`p-4 rounded-lg border-2 transition-all duration-200 hover:shadow-md
                                        ${requestParams.showDate === date
                                            ? 'bg-blue-600 text-white border-blue-600 shadow-lg transform scale-105'
                                            : 'bg-white text-gray-700 border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                                        }`}
                                >
                                    <div className="text-sm font-medium">{date}</div>
                                    <div className="mt-1 text-xs opacity-80">
                                        {groupedShowtimes[date].length} suất chiếu
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Time Selection */}
                {requestParams.showDate && groupedShowtimes[requestParams.showDate]?.length > 0 && (
                    <div className="p-6 bg-white border border-gray-100 shadow-lg rounded-xl">
                        <h3 className="flex items-center mb-4 text-xl font-semibold text-gray-800">
                            <svg className="w-6 h-6 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Chọn Giờ Chiếu
                        </h3>
                        <div className="grid grid-cols-3 gap-3 md:grid-cols-5 lg:grid-cols-7">
                            {groupedShowtimes[requestParams.showDate].map(showtime => (
                                <button
                                    key={showtime.showtimeId}
                                    onClick={() => {
                                        handleRequestParamsChange({ showtimeId: showtime.showtimeId });
                                    }}
                                    className={`p-3 rounded-lg border-2 transition-all duration-200 hover:shadow-md font-medium
                                        ${requestParams.showtimeId === showtime.showtimeId
                                            ? 'bg-green-600 text-white border-green-600 shadow-lg transform scale-105'
                                            : 'bg-white text-gray-700 border-gray-200 hover:border-green-300 hover:bg-green-50'
                                        }`}
                                >
                                    {formatTime(showtime.startTime)}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* ✅ Chỉ hiển thị khi có đầy đủ điều kiện */}
            {shouldShowSeats && (
                <div className='w-full'>
                    <div className="overflow-hidden bg-white border border-gray-100 shadow-lg rounded-xl">
                        <Seats seats={seats} metadata={metadata} />
                    </div>
                </div>
            )}
        </>
    )
}