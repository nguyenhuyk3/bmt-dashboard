import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
    findShowtimesByAuditoriumIdAndShowDateRequest,
    getAllCinemasRequest,
    releaseShowtimeRequest
} from '../../../features/slices';
import CinemaAuditoriumSelectorSection from './sections/CinemaAuditoriumSelectorSection';
import ShowDatePickerSection from './sections/ShowDatePickerSection';
import ShowtimesListSection from './sections/ShowtimesListSection';
import NoResultsSection from './sections/NoResultsSection';

const ReleaseShowtimeForm = () => {
    const dispatch = useDispatch();
    const { cinemas } = useSelector((state) => state.cinema);
    const { auditoriums, loading: auditoriumsLoading } = useSelector((state) => state.auditorium);
    const { showtimes, loading: showtimesLoading } = useSelector((state) => state.showtime);

    const [localShowtimes, setLocalShowtimes] = useState([]);
    const [requestParams, setRequestParams] = useState({ auditoriumId: '', showDate: '' });

    // -- THAY ĐỔI 1: Hợp nhất state xử lý --
    const [processingIds, setProcessingIds] = useState([]); // ID đang ở trạng thái "Đang xử lý"
    const [removing, setRemoving] = useState([]); // ID đang trong animation xóa

    const [hasSearched, setHasSearched] = useState(false);

    const handleFormDataChange = (newData) => {
        setRequestParams(prev => ({ ...prev, ...newData }));
        setHasSearched(false);
    };

    useEffect(() => {
        dispatch(getAllCinemasRequest());
    }, [dispatch]);

    useEffect(() => {
        setLocalShowtimes(showtimes);
        // Đặt hasSearched = true chỉ khi quá trình tìm kiếm đã kết thúc
        if (!showtimesLoading) {
            setHasSearched(true);
        }
    }, [showtimes, showtimesLoading]);

    useEffect(() => {
        if (requestParams.auditoriumId && requestParams.showDate) {
            // Khi bắt đầu tìm kiếm, reset lại trạng thái
            setHasSearched(false);
            dispatch(findShowtimesByAuditoriumIdAndShowDateRequest(requestParams));
        }
    }, [dispatch, requestParams]);

    const handleReleaseShowtime = (showtimeId) => {
        // Bước 1: Đánh dấu là "Đang xử lý..." ngay lập tức
        setProcessingIds(prev => [...prev, showtimeId]);
        dispatch(releaseShowtimeRequest({ id: showtimeId }));

        // Bước 2: Sau 1.5 giây, chuyển sang trạng thái "removing" để bắt đầu animation
        setTimeout(() => {
            setProcessingIds(prev => prev.filter(id => id !== showtimeId)); // Xóa khỏi danh sách xử lý
            setRemoving(prev => [...prev, showtimeId]);

            // Bước 3: Sau khi animation hoàn thành (600ms), xóa hẳn khỏi danh sách local
            setTimeout(() => {
                setLocalShowtimes(prev => prev.filter(s => s.showtimeId !== showtimeId));
                setRemoving(prev => prev.filter(id => id !== showtimeId));
            }, 600);
        }, 1500);
    };

    const canSearch = requestParams.auditoriumId && requestParams.showDate;
    // -- THAY ĐỔI 2: Logic hiển thị NoResultsSection không cần thay đổi, nhưng giờ nó sẽ hoạt động đúng
    // vì localShowtimes được cập nhật chính xác.
    const shouldShowNoResults = !showtimesLoading && hasSearched && localShowtimes.length === 0 && canSearch;

    return (
        <div className="max-w-4xl p-6 mx-auto bg-white rounded-lg shadow-lg">
            <CinemaAuditoriumSelectorSection
                cinemas={cinemas}
                auditoriums={auditoriums}
                loading={auditoriumsLoading}
                formData={requestParams}
                onFormDataChange={handleFormDataChange}
            />
            <ShowDatePickerSection
                onChange={(dateString) => handleFormDataChange({ showDate: dateString })}
            />
            <ShowtimesListSection
                showtimes={localShowtimes}
                loading={showtimesLoading}
                onRelease={handleReleaseShowtime}
                processingIds={processingIds} // Truyền state mới xuống
                removingIds={removing}       // Đổi tên cho rõ ràng
            />
            {shouldShowNoResults && <NoResultsSection />}
        </div>
    );
};

export default ReleaseShowtimeForm;