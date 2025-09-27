const FormHeader = ({ title = "Thêm Suất Chiếu Phim", subtitle = "Thiết lập suất chiếu mới - Tự động tính toán thời gian" }) => {
    return (
        <div className="mb-8 text-center">
            <h1 className="mb-2 text-3xl font-bold text-gray-800">{title}</h1>
            <p className="text-gray-600">{subtitle}</p>
        </div>
    );
};

export default FormHeader;
