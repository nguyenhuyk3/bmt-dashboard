import AddFilmForm from "./form";

export default function AddFilmPage() {
    return (
        <div className="bg-gray-50">
            <div className="px-4 py-8 mx-auto text-center">
                <h1 className="text-3xl font-bold text-gray-900"> Thêm Phim Mới </h1>
                <p className="mt-2 text-gray-600"> Điền thông tin chi tiết về bộ phim </p>
            </div>
            <div className="container max-w-4xl p-8 mx-auto mb-10 rounded-lg shadow-xl bg-amber-50">
                {/* Form */}
                <AddFilmForm />
            </div>
        </div>
    );
}
