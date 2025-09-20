import AddFilmForm from "./form";

export default function AddFilmPage() {
    return (
        <div className="bg-gray-50">
            <div className="w-full p-8 mx-auto bg-white rounded-lg shadow-md">
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold text-gray-900"> Thêm Phim Mới </h1>
                    <p className="mt-2 text-gray-600"> Điền thông tin chi tiết về bộ phim </p>
                </div>
                {/* Form */}
                <AddFilmForm />
            </div>
        </div>
    );
}
