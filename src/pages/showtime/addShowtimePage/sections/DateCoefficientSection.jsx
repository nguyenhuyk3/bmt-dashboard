import { ShowDatePicker, CoefficientDropdown } from '../../../../components/index';

const DateCoefficientSection = ({ formData, onFormDataChange }) => {
    return (
        <div className="p-6 bg-gray-50 rounded-xl">
            <h2 className="flex items-center mb-4 text-sm font-medium text-gray-800">
                Ngày Chiếu & Hệ Số
            </h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <ShowDatePicker
                    label={"Ngày chiếu"}
                    value={formData.showDate}
                    onChange={(showDate) => onFormDataChange({ showDate })}
                />
                <CoefficientDropdown
                    value={formData.coefficient}
                    onChange={(coefficient) => onFormDataChange({ coefficient })}
                />
            </div>
        </div>
    );
};

export default DateCoefficientSection;