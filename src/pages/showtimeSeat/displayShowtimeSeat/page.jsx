import DisplayShowtimeSeatForm from "./form";

const DisplayShowtimeSeatPage = () => {
    return (
        <div className="container px-4 py-8 mx-auto bg-white">
            <div className="mb-8 text-center">
                <h1 className="mb-2 text-4xl font-bold text-gray-800">Hiển thị ghế</h1>
                <p className="text-gray-600">Chọn rạp, phòng chiếu</p>
            </div>
            <DisplayShowtimeSeatForm />
        </div>
    );
}

export default DisplayShowtimeSeatPage;