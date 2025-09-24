import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import FilmSelector from './sections/FilmSelector';
import CinemaAndAuditoriumSelector from './sections/CinemaAndAuditoriumSelector';

import FormHeader from './sections/FormHeader';
import DateCoefficientSection from './sections/DateCoefficientSection';
import LastShowtimeInfo from './sections/LastShowtimeInfo';
import AutoScheduleInfo from './sections/AutoScheduleInfo';
import SubmitButton from './sections/SubmitButton';

import {
    addShowtimeRequest,
    getAllCinemasRequest,
    getAllFilmsRequest,
    getLatestShowtimeByAuditoriumIdAndByShowDateRequest
} from "../../../features/slices/index";

const AddShowtimeForm = () => {
    const dispatch = useDispatch();
    const [film, setFilm] = useState(null);
    const { films } = useSelector((state) => state.film);
    const { cinemas } = useSelector((state) => state.cinema);
    const { auditoriums, loading: auditoriumsLoading } = useSelector((state) => state.auditorium);
    const { lastestShowtime } = useSelector((state) => state.showtime);
    const [formData, setFormData] = useState({
        filmId: '',
        auditoriumId: '',
        showDate: '',
        coefficient: 1
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Effects
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
    }, [formData.filmId, films]);

    // Handlers
    const handleFormDataChange = (newData) => {
        setFormData(prev => ({ ...prev, ...newData }));
    };
    const handleSubmit = async () => {
        setIsSubmitting(true);

        try {
            await dispatch(addShowtimeRequest({
                filmId: formData.filmId,
                auditoriumId: formData.auditoriumId,
                showDate: formData.showDate,
                coefficient: formData.coefficient
            }));
        } catch (error) {
            console.error('Error submitting form:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    // Validation
    const isFormValid = formData.filmId && formData.auditoriumId && formData.showDate;

    return (
        <div className="max-w-4xl mx-auto">
            <FormHeader />
            <div className="p-8 bg-white shadow-xl rounded-2xl">
                <div className="space-y-8">
                    <FilmSelector
                        films={films}
                        value={formData.filmId}
                        onChange={(filmId) => handleFormDataChange({ filmId })}
                    />
                    <CinemaAndAuditoriumSelector
                        cinemas={cinemas}
                        auditoriums={auditoriums}
                        auditoriumsLoading={auditoriumsLoading}
                        formData={formData}
                        onFormDataChange={handleFormDataChange}
                        isAuditoriumSelectorSmall={false}
                    />
                    <DateCoefficientSection
                        formData={formData}
                        onFormDataChange={handleFormDataChange}
                    />
                    <LastShowtimeInfo
                        film={film}
                        lastestShowtime={lastestShowtime}
                    />
                    <AutoScheduleInfo isValidSchedule={isFormValid} />
                    <SubmitButton
                        onSubmit={handleSubmit}
                        disabled={!isFormValid}
                        loading={isSubmitting}
                    />
                </div>
            </div>
        </div>
    );
};

export default AddShowtimeForm;
