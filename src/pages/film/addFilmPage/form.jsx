import { useState } from "react";
import { toast } from "react-toastify";
import { FileUpload, GenreSelector, InputField, TextareaField, PersonSelector } from "../../../components/index";

export default function AddFilmForm() {
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [selectedDirectors, setSelectedDirectors] = useState([]);
    const [selectedActors, setSelectedActors] = useState([]);
    const [poster, setPoster] = useState(null);
    const [trailer, setTrailer] = useState(null);
    const [posterPreview, setPosterPreview] = useState(null);
    const [trailerPreview, setTrailerPreview] = useState(null);
    const [errors, setErrors] = useState({});
    const mockDirectors = [
        { id: '1', name: 'Nguyễn Văn A', avatarUrl: 'https://ui-avatars.com/api/?name=Nguyen+Van+A&background=random' },
        { id: '2', name: 'Trần Thị B', avatarUrl: 'https://ui-avatars.com/api/?name=Tran+Thi+B&background=random' },
        { id: '3', name: 'Lê Văn C', avatarUrl: 'https://ui-avatars.com/api/?name=Le+Van+C&background=random' },
        { id: '4', name: 'Phạm Thị D', avatarUrl: 'https://ui-avatars.com/api/?name=Pham+Thi+D&background=random' },
        { id: '5', name: 'Hoàng Văn E', avatarUrl: 'https://ui-avatars.com/api/?name=Hoang+Van+E&background=random' },
    ];

    const mockActors = [
        { id: '1', name: 'Nguyễn Văn A', avatarUrl: 'https://ui-avatars.com/api/?name=Nguyen+Van+A&background=random' },
        { id: '2', name: 'Trần Thị B', avatarUrl: 'https://ui-avatars.com/api/?name=Tran+Thi+B&background=random' },
        { id: '3', name: 'Lê Văn C', avatarUrl: 'https://ui-avatars.com/api/?name=Le+Van+C&background=random' },
        { id: '4', name: 'Phạm Thị D', avatarUrl: 'https://ui-avatars.com/api/?name=Pham+Thi+D&background=random' },
        { id: '5', name: 'Hoàng Văn E', avatarUrl: 'https://ui-avatars.com/api/?name=Hoang+Van+E&background=random' },
    ];


    const handlePosterChange = (e) => {
        const file = e.target.files[0];

        setPoster(file);

        if (file) {
            const reader = new FileReader();

            reader.onload = (e) => {
                setPosterPreview(e.target.result);
            };

            reader.readAsDataURL(file);
        } else {
            setPosterPreview(null);
        }
    };

    const handleTrailerChange = (e) => {
        const file = e.target.files[0];

        setTrailer(file);

        if (file) {
            const url = URL.createObjectURL(file);

            setTrailerPreview(url);
        } else {
            setTrailerPreview(null);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = {
            title: e.target.title.value,
            description: e.target.description.value,
            genres: selectedGenres,
            directors: selectedDirectors,
            actors: selectedActors,
            releaseDate: e.target.releaseDate.value,
            duration: e.target.duration.value,
            poster,
            trailer,
        };

        const newErrors = {};

        if (!formData.title) newErrors.title = "Tên phim bắt buộc!!";
        if (!formData.description) newErrors.description = "Mô tả bắt buộc!!";
        if (!formData.genres || formData.genres.length === 0) newErrors.genres = "Thể loại bắt buộc!!";
        if (!formData.directors || formData.directors.length === 0) newErrors.directors = "Không thể thiếu đạo diễn!!";
        if (!formData.actors || formData.actors.length === 0) newErrors.actors = "Không thể thiếu diễn viên!!";
        if (!formData.releaseDate) newErrors.releaseDate = "Ngày phát hành bắt buộc!!";
        if (!formData.duration) newErrors.duration = "Thời lượng bắt buộc!!";
        if (!formData.poster) newErrors.poster = "Poster bắt buộc!!";
        if (!formData.trailer) newErrors.trailer = "Trailer bắt buộc!!";


        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            toast.error("Vui lòng điền đầy đủ thông tin!!");
            return;
        }

        setErrors({});
        console.log("Dữ liệu phim:", formData);
        toast.success("Phim đã được thêm thành công!");
    };

    const handleReset = () => {
        setPoster(null);
        setTrailer(null);
        setPosterPreview(null);
        setTrailerPreview(null);
        setSelectedGenres([]);
        setErrors({});

        // Revoke object URL to prevent memory leaks
        if (trailerPreview) {
            URL.revokeObjectURL(trailerPreview);
        }
    };



    return (
        <form className="space-y-6" onSubmit={handleSubmit} noValidate>
            <InputField
                label="Tên phim"
                id="title"
                type="text"
                placeholder="Nhập tên phim..."
                error={errors.title}
            />
            <TextareaField
                label="Mô tả"
                id="description"
                placeholder="Nhập mô tả phim..."
                error={errors.description}
            />
            <GenreSelector
                selectedGenres={selectedGenres}
                setSelectedGenres={setSelectedGenres}
                error={errors.genres}
            />
            <PersonSelector
                selectedPeople={selectedDirectors}
                setSelectedPeople={setSelectedDirectors}
                options={mockDirectors}
                label="Đạo diễn"
                error={errors.directors}
            />
            <PersonSelector
                selectedPeople={selectedActors}
                setSelectedPeople={setSelectedActors}
                options={mockActors}
                label="Diễn viên"
                error={errors.actors}
            />
            <InputField
                label="Ngày phát hành"
                id="releaseDate"
                type="date"
                error={errors.releaseDate}
            />
            <InputField
                label="Thời lượng"
                id="duration"
                type="time"
                error={errors.duration}
            />
            <FileUpload
                id="poster"
                label="Poster phim"
                accept="image/*"
                onChange={handlePosterChange}
                error={errors.poster}
            >
                {posterPreview ? (
                    <div className="flex flex-col items-center space-y-2">
                        <img
                            src={posterPreview}
                            alt="Poster preview"
                            className="object-cover rounded-lg shadow-md max-w-32 max-h-48"
                        />
                        <p className="text-sm text-gray-600">Nhấp để thay đổi ảnh poster</p>
                    </div>
                ) : (
                    <p className="text-sm text-gray-600">Nhấp để chọn ảnh poster</p>
                )}
            </FileUpload>
            <FileUpload
                id="trailer"
                label="Trailer phim"
                accept="video/*"
                onChange={handleTrailerChange}
                error={errors.trailer}
            >
                {trailerPreview ? (
                    <div className="flex flex-col items-center space-y-2">
                        <video
                            src={trailerPreview}
                            className="rounded-lg shadow-md max-w-64 max-h-36"
                            controls
                            preload="metadata"
                        />
                        <p className="text-sm text-gray-600">Nhấp để thay đổi video trailer</p>
                    </div>
                ) : (
                    <p className="text-sm text-gray-600">Nhấp để chọn video trailer</p>
                )}
            </FileUpload>
            <div className="flex pt-6 space-x-4">
                <button
                    type="submit"
                    className="flex-1 px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
                >
                    Thêm Phim
                </button>
                <button
                    type="button"
                    onClick={handleReset}
                    className="flex-1 px-4 py-2 text-gray-700 bg-gray-300 rounded-md hover:bg-gray-400 focus:ring-2 focus:ring-gray-500"
                >
                    Làm mới
                </button>
            </div>
        </form>
    );
}