import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { findShowtimesByAuditoriumIdAndShowDateRequest, getAllCinemasRequest, releaseShowtimeRequest } from '../../../features/slices';

import CinemaAuditoriumSelectorSection from './sections/CinemaAuditoriumSelectorSection';
import ShowDatePickerSection from './sections/ShowDatePickerSection';
import ShowtimesListSection from './sections/ShowtimesListSection';
import NoResultsSection from './sections/NoResultsSection';
import SuccessModal from './sections/SuccessModal';

const ReleaseShowtimeForm = () => {
    const dispatch = useDispatch();
    const { cinemas } = useSelector((state) => state.cinema);
    const { auditoriums, loading: auditoriumsLoading } = useSelector((state) => state.auditorium);
    const { showtimes, loading: showtimesLoading } = useSelector((state) => state.showtime);
    const [localShowtimes, setLocalShowtimes] = useState([]);

    const [requestParams, setRequestParams] = useState({ auditoriumId: '', showDate: '' });
    const [releasingShowtime, setReleasingShowtime] = useState('');
    const [showModal, setShowModal] = useState(false);

    const handleFormDataChange = (newData) => setRequestParams(prev => ({ ...prev, ...newData }));

    useEffect(() => { dispatch(getAllCinemasRequest()); }, [dispatch]);

    useEffect(() => {
        setLocalShowtimes(showtimes);
    }, [showtimes]);

    useEffect(() => {
        if (requestParams.auditoriumId && requestParams.showDate) {
            dispatch(findShowtimesByAuditoriumIdAndShowDateRequest(requestParams));
        }
    }, [dispatch, requestParams, requestParams.auditoriumId, requestParams.showDate]);

    const handleReleaseShowtime = async (showtimeId) => {
        setLocalShowtimes(prev => prev.filter(s => s.showtimeId !== showtimeId));

        dispatch(releaseShowtimeRequest({ id: showtimeId }))
    };

    const canSearch = requestParams.auditoriumId && requestParams.showDate;

    return (
        <>
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
                    releasingShowtime={releasingShowtime}
                />
                {!showtimesLoading && showtimes.length === 0 && canSearch && <NoResultsSection />}
            </div>
            <SuccessModal isOpen={showModal} onClose={() => setShowModal(false)} />
        </>
    );
};

export default ReleaseShowtimeForm;
