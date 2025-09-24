import { ShowDatePickerModal } from '../../../../components';

const ShowDatePickerSection = ({ onChange }) => (
    <div className="mb-6">
        <ShowDatePickerModal
            label="Chọn Ngày Chiếu"
            onChange={onChange}
        />
    </div>
);

export default ShowDatePickerSection;
