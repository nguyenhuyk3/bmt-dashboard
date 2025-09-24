import ReleaseShowtimeForm from "./form";

const ReleaseShowtimePage = () => {
    return (
        <div className="pb-20 bg-gray-100">
            <div className="container px-4 py-8 mx-auto">
                <div className="mb-8 text-center">
                    <h1 className="mb-8 text-3xl font-bold text-gray-800">
                        Quản lý Suất Chiếu Rạp Phim
                    </h1>
                </div>
                <ReleaseShowtimeForm />
            </div>
        </div>
    );
}

export default ReleaseShowtimePage;