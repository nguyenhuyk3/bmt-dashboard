import { useEffect, useState, useRef } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";

import {
    FileUpload, GenreSelector, InputField,
    TextareaField, PersonSelector, TimeInput,
    DateInput
} from "../../../components/index";
import { fetchFilmProfessionals, addFilmRequest } from "../../../features/slices/index";

function SubmitButton({ loading }) {
    return (
        <button
            type="submit"
            disabled={loading}
            className={`
                flex-1 px-4 py-2 text-white rounded-md focus:ring-2 focus:ring-blue-500
                ${loading
                    ? "bg-blue-600 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }
            `}
        >
            {loading ? "Đang thêm phim..." : "Thêm phim"}
        </button>
    );
}

function ResetButton({ loading, onReset }) {
    return (
        <button
            type="button"
            onClick={onReset}
            disabled={loading}
            className={`
                flex-1 px-4 py-2 rounded-md focus:ring-2 focus:ring-gray-500
                ${loading
                    ? "bg-gray-300 text-gray-700 cursor-not-allowed"
                    : "bg-gray-300 text-gray-700 hover:bg-gray-400"
                }
            `}
        >
            Làm mới
        </button>
    );
}

export default function AddFilmForm() {
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [selectedDirectors, setSelectedDirectors] = useState([]);
    const [selectedActors, setSelectedActors] = useState([]);
    const [duration, setDuration] = useState("");
    const [releaseDate, setReleaseDate] = useState("");
    const [poster, setPoster] = useState(null);
    const [trailer, setTrailer] = useState(null);
    const [posterPreview, setPosterPreview] = useState(null);
    const [trailerPreview, setTrailerPreview] = useState(null);
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch();
    const { directors, actors, } = useSelector((state) => state.filmProfessional);
    const { loading } = useSelector((state) => state.film);
    const formRef = useRef();

    useEffect(() => {
        dispatch(fetchFilmProfessionals());
    }, [dispatch]);

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

        const formData = new FormData();

        formData.append("title", e.target.title.value);
        formData.append("description", e.target.description.value);
        formData.append("releaseDate", releaseDate);
        formData.append("duration", duration);
        selectedGenres.forEach((genre) => {
            formData.append("genres", genre);
        });
        [...selectedDirectors, ...selectedActors].forEach((filmProfessional) => {
            formData.append("filmProfessionalIds", filmProfessional.id);
        });

        if (poster) formData.append("image", poster);
        if (trailer) formData.append("video", trailer);

        // console.log([...formData.entries()]);

        const newErrors = {};

        if (!e.target.title.value) newErrors.title = "Tên phim bắt buộc!!";
        if (!e.target.description.value) newErrors.description = "Mô tả bắt buộc!!";
        if (selectedGenres.length === 0) newErrors.genres = "Thể loại bắt buộc!!";
        if (selectedDirectors.length === 0) newErrors.directors = "Không thể thiếu đạo diễn!!";
        if (selectedActors.length === 0) newErrors.actors = "Không thể thiếu diễn viên!!";
        if (releaseDate.length === 0) newErrors.releaseDate = "Ngày phát hành là bắt buộc!!";
        if (duration.length === 0) newErrors.duration = "Thời lượng phim là bắt buộc!!";
        if (!poster) newErrors.poster = "Poster là bắt buộc!!";
        if (!trailer) newErrors.trailer = "Trailer là bắt buộc!!";


        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);

            toast.error("Vui lòng điền đầy đủ thông tin!!");

            return;
        }

        dispatch(addFilmRequest(formData));

        setErrors({});

    };
    const handleReset = () => {
        formRef.current.reset(); // reset toàn bộ input mặc định

        setPoster(null);
        setTrailer(null);
        setPosterPreview(null);
        setTrailerPreview(null);
        setSelectedGenres([]);
        setSelectedActors([]);
        setSelectedDirectors([]);
        setDuration("");
        setReleaseDate("");
        setErrors({});

        if (trailerPreview) {
            URL.revokeObjectURL(trailerPreview);
        }
    };

    return (
        <form ref={formRef} className="space-y-6" onSubmit={handleSubmit} noValidate>
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
                options={directors}
                label="Đạo diễn"
                error={errors.directors}
            />
            <PersonSelector
                selectedPeople={selectedActors}
                setSelectedPeople={setSelectedActors}
                options={actors}
                label="Diễn viên"
                error={errors.actors}
            />
            <DateInput
                id="releaseDate"
                label="Ngày phát hành"
                value={releaseDate}
                onChange={setReleaseDate}
                error={errors.releaseDate}
            />
            <TimeInput
                id="duration"
                label="Thời lượng phim"
                value={duration}
                onChange={setDuration}
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
                <SubmitButton loading={loading} />
                <ResetButton loading={loading} onReset={handleReset} />
            </div>
        </form>
    );
}