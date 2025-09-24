import CinemaAndAuditoriumSelector from '../../addShowtimePage/sections/CinemaAndAuditoriumSelector';

const CinemaAuditoriumSelectorSection = ({ cinemas, auditoriums, loading, formData, onFormDataChange }) => (
    <div className="mb-6">
        <CinemaAndAuditoriumSelector
            cinemas={cinemas}
            auditoriums={auditoriums}
            auditoriumsLoading={loading}
            formData={formData}
            onFormDataChange={onFormDataChange}
            isAuditoriumSelectorSmall={true}
        />
    </div>
);

export default CinemaAuditoriumSelectorSection;
