import { useState } from "react";

import { FileUpload, GenreSelect, InputField, TextareaField } from "../../../components/index";

export default function AddFilmForm() {
    const [poster, setPoster] = useState(null);
    const [trailer, setTrailer] = useState(null);
    const [selectedGenres, setSelectedGenres] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = {
            title: e.target.title.value,
            description: e.target.description.value,
            release_date: e.target.release_date.value,
            duration: e.target.duration.value,
            poster,
            trailer,
            genres: selectedGenres,
        };

        console.log("Dữ liệu phim:", formData);
        alert("Phim đã được thêm thành công! Xem console để kiểm tra dữ liệu.");
    };

    return (
        <form className="space-y-6" onSubmit={handleSubmit}>
            <InputField label="Tên phim" id="title"
                required placeholder="Nhập tên phim..." />
            <TextareaField label="Mô tả" id="description"
                required placeholder="Nhập mô tả phim..." />
            <InputField label="Ngày phát hành" id="releaseDate" type="date" required />
            <InputField label="Thời lượng" id="duration" type="time" required />
            <FileUpload id="poster" label="Poster phim"
                accept="image/*" required
                onChange={(e) => setPoster(e.target.files[0])}>
                <p className="text-sm text-gray-600">Nhấp để chọn ảnh poster</p>
            </FileUpload>
            <FileUpload id="trailer" label="Trailer phim"
                accept="video/*" required
                onChange={(e) => setTrailer(e.target.files[0])}>
                <p className="text-sm text-gray-600">Nhấp để chọn video trailer</p>
            </FileUpload>
            <GenreSelect selectedGenres={selectedGenres} setSelectedGenres={setSelectedGenres} required />
            <div className="flex pt-6 space-x-4">
                <button
                    type="submit"
                    className="flex-1 px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
                >
                    Thêm Phim
                </button>
                <button
                    type="reset"
                    onClick={() => {
                        setPoster(null);
                        setTrailer(null);
                        setSelectedGenres([]);
                    }}
                    className="flex-1 px-4 py-2 text-gray-700 bg-gray-300 rounded-md hover:bg-gray-400 focus:ring-2 focus:ring-gray-500"
                >
                    Làm mới
                </button>
            </div>
        </form>
    );
}