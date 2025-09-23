import { useDispatch } from 'react-redux';

import { getAllAuditoriumsByCinemaIdRequest } from '../../../features/slices/auditoriumSlice';
import AuditoriumSelector from './AuditoriumSelector';
import CinemaSelector from './CinemaSelector';

const CinemaAndAuditoriumSelector = ({ cinemas, auditoriums, auditoriumsLoading, formData, onFormDataChange }) => {
    const dispatch = useDispatch();
    // Xử lý khi chọn cinema
    const handleCinemaChange = (cinemaId) => {
        // Reset auditorium khi đổi cinema
        onFormDataChange({
            cinemaId,
            auditoriumId: ''
        });
        // Gọi API để load auditoriums theo cinema
        if (cinemaId) {
            dispatch(getAllAuditoriumsByCinemaIdRequest(cinemaId));
        }
    };
    // Xử lý khi chọn auditorium
    const handleAuditoriumChange = (auditoriumId) => {
        onFormDataChange({ auditoriumId });
    };

    return (
        <div className="container mx-auto">
            <div className="max-w-4xl mx-auto">
                <div className="space-y-6">
                    <CinemaSelector
                        value={formData.cinemaId}
                        onChange={handleCinemaChange}
                        cinemas={cinemas}
                    />
                    <AuditoriumSelector
                        value={formData.auditoriumId}
                        onChange={handleAuditoriumChange}
                        auditoriums={auditoriums || []}
                        disabled={!formData.cinemaId}
                        loading={auditoriumsLoading}
                    />
                </div>
            </div>
        </div>
    );
};

export default CinemaAndAuditoriumSelector;