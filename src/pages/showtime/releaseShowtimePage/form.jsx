// ReleaseShowtimeForm.jsx

import { useState, useEffect, useRef } from 'react';
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

const STATUS = {
    PROCESSING: 'processing',
    REMOVING: 'removing',
};

const TIMINGS = {
    PROCESS_DURATION: 1500,
    REMOVE_ANIMATION: 600,
};

const ReleaseShowtimeForm = () => {
    const dispatch = useDispatch();
    const { cinemas } = useSelector((state) => state.cinema);
    const { auditoriums, loading: auditoriumsLoading } = useSelector((state) => state.auditorium);
    const { showtimes, loading: showtimesLoading } = useSelector((state) => state.showtime);

    const [localShowtimes, setLocalShowtimes] = useState([]);
    const [requestParams, setRequestParams] = useState({ auditoriumId: '', showDate: '' });
    const [hasSearched, setHasSearched] = useState(false);
    const [showtimeStatuses, setShowtimeStatuses] = useState({});
    const timersRef = useRef({});

    useEffect(() => {
        dispatch(getAllCinemasRequest());
        
        return () => {
            Object.values(timersRef.current).forEach(clearTimeout);
        };
    }, [dispatch]);

    // --- FIX: THAY ĐỔI LOGIC ĐỒNG BỘ STATE ---
    // Effect này bây giờ CHỈ đồng bộ `showtimes` từ Redux vào `localShowtimes`
    // khi dữ liệu gốc từ Redux thay đổi (ví dụ: sau một lần tìm kiếm mới).
    // Quan trọng là nó sẽ KHÔNG chạy lại chỉ vì `showtimeStatuses` thay đổi.
    useEffect(() => {
        // Nếu có bất kỳ animation nào đang diễn ra, chúng ta KHÔNG đồng bộ.
        // Điều này ngăn chặn việc Redux state (đã xóa 1 item) ghi đè lên
        // local state và làm hỏng animation của các item khác.
        if (Object.keys(showtimeStatuses).length > 0) {
            return;
        }

        setLocalShowtimes(showtimes);

        if (!showtimesLoading) {
            setHasSearched(true);
        }
        // Bỏ `showtimeStatuses` ra khỏi dependency array là chìa khóa ở đây.
    }, [showtimes, showtimesLoading]);


    useEffect(() => {
        if (requestParams.auditoriumId && requestParams.showDate) {
            setHasSearched(false);
            dispatch(findShowtimesByAuditoriumIdAndShowDateRequest(requestParams));
        }
    }, [dispatch, requestParams]);

    const handleFormDataChange = (newData) => {
        setRequestParams(prev => ({ ...prev, ...newData }));
        setHasSearched(false);
    };

    const handleReleaseShowtime = (showtimeId) => {
        dispatch(releaseShowtimeRequest({ id: showtimeId }));
        setShowtimeStatuses(prev => ({ ...prev, [showtimeId]: STATUS.PROCESSING }));

        timersRef.current[showtimeId + '_process'] = setTimeout(() => {
            setShowtimeStatuses(prev => ({ ...prev, [showtimeId]: STATUS.REMOVING }));

            timersRef.current[showtimeId + '_remove'] = setTimeout(() => {
                // Chỉ cập nhật local state, không cần đọc lại từ Redux
                setLocalShowtimes(prev => prev.filter(s => s.showtimeId !== showtimeId));

                setShowtimeStatuses(prev => {
                    const newStatuses = { ...prev };
                    delete newStatuses[showtimeId];
                    return newStatuses;
                });
            }, TIMINGS.REMOVE_ANIMATION);

        }, TIMINGS.PROCESS_DURATION);
    };

    const canSearch = requestParams.auditoriumId && requestParams.showDate;
    const shouldShowNoResults = !showtimesLoading && hasSearched && localShowtimes.length === 0 && canSearch;

    return (
        <div className="max-w-4xl p-6 mx-auto rounded-lg shadow-lg bg-gradient-to-br from-blue-50 to-indigo-100">
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
                statuses={showtimeStatuses}
            />
            {shouldShowNoResults && <NoResultsSection />}
        </div>
    );
};

export default ReleaseShowtimeForm;