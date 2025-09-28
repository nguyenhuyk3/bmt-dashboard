import ReleaseShowtimeForm from "./form";

const ReleaseShowtimePage = () => {
    return (
        <div className="container px-4 py-8 pb-20 mx-auto bg-white">
            <div className="mb-8 text-center">
                <h1 className="mb-8 text-3xl font-bold text-gray-800">
                    Quản lý Suất Chiếu Rạp Phim
                </h1>
            </div>
            <ReleaseShowtimeForm />
        </div>
    );
}

export default ReleaseShowtimePage;