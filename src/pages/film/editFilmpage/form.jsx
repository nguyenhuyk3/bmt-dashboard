import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

import {
    InputField, TextareaField,
    GenreSelector, PersonSelector,
    DateInput, TimeInput, FileUpload,
    LoadingScreen
} from "../../../components/index";
import { fetchFilmProfessionals, getFilmByIdRequest, updateFilmByIdRequest } from "../../../features/slices/index";
import { DEFAULT } from "../../../utils/routes";
import SubmitButton from "./sections/SubmitButton";
import CancelButton from "./sections/CancelButton";
import ConfirmModal from "./sections/ConfirmModal";

export default function EditFilmForm() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const { filmDetails } = useSelector((state) => state.film);
    const { directors, actors } = useSelector((state) => state.filmProfessional);
    // State cho form
    const [showConfirm, setShowConfirm] = useState(false);
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
    const [loading, setLoading] = useState(false);
    const formRef = useRef();

    useEffect(() => {
        dispatch(fetchFilmProfessionals());
    }, [dispatch]);
    useEffect(() => {
        dispatch(getFilmByIdRequest({ id }))
    }, [dispatch, id]);

    // Load dữ liệu phim hiện có khi component mount
    useEffect(() => {
        if (filmDetails) {
            setSelectedGenres(filmDetails.genres || []);
            setSelectedDirectors(filmDetails.filmProfessionals.filter((fp) => fp.job === "DIRECTOR") || []);
            setSelectedActors(filmDetails.filmProfessionals.filter((fp) => fp.job === "ACTOR") || []);
            setDuration(filmDetails.duration || "");
            setReleaseDate(filmDetails.releaseDate || "");
            setPosterPreview(filmDetails.posterUrl || null);
            setTrailerPreview(filmDetails.trailerUrl || null);
            // Set form fields với existing data
            if (formRef.current) {
                formRef.current.title.value = filmDetails.title || "";
                formRef.current.description.value = filmDetails.description || "";
            }
        }
    }, [filmDetails]);

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
            setPosterPreview(filmDetails.posterUrl);
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

        setLoading(true);

        const formData = new FormData();

        formData.append("id", filmDetails.id); // ID của phim cần cập nhật
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

        // Validation
        const newErrors = {};

        if (!e.target.title.value) newErrors.title = "Tên phim bắt buộc!!";
        if (!e.target.description.value) newErrors.description = "Mô tả bắt buộc!!";
        if (selectedGenres.length === 0) newErrors.genres = "Thể loại bắt buộc!!";
        if (selectedDirectors.length === 0) newErrors.directors = "Không thể thiếu đạo diễn!!";
        if (selectedActors.length === 0) newErrors.actors = "Không thể thiếu diễn viên!!";
        if (releaseDate.length === 0) newErrors.releaseDate = "Ngày phát hành là bắt buộc!!";
        if (duration.length === 0) newErrors.duration = "Thời lượng phim là bắt buộc!!";
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            setLoading(false);
            toast("Vui lòng điền đầy đủ thông tin!!");

            return;
        }

        dispatch(updateFilmByIdRequest({
            formData, onSuccess: () => setTimeout(() => {
                navigate(DEFAULT);
            }, 500)
        }));
    };

    const resetForm = () => {
        setSelectedGenres(filmDetails.genres);
        setSelectedDirectors(filmDetails.directors);
        setSelectedActors(filmDetails.actors);
        setDuration(filmDetails.duration);
        setReleaseDate(filmDetails.releaseDate);
        setPoster(null);
        setTrailer(null);
        setPosterPreview(filmDetails.posterUrl);
        setTrailerPreview(null);
        setErrors({});

        if (formRef.current) {
            formRef.current.title.value = filmDetails.title;
            formRef.current.description.value = filmDetails.description;
        }

        if (trailerPreview && trailerPreview !== filmDetails.trailerUrl) {
            URL.revokeObjectURL(trailerPreview);
        }
    };

    const handleCancel = () => {
        setShowConfirm(true); // mở modal
    };

    if (!filmDetails) {
        return (
            <LoadingScreen />
        )
    }

    return (
        <>
            <div className="flex items-center justify-center p-3 mb-4 rounded-lg bg-blue-50">
                <p className="text-xl text-blue-800">
                    <span className="font-semibold"> Đang sửa phim: </span> {filmDetails.title}
                </p>
            </div>
            <form ref={formRef} className="flex flex-col gap-6" onSubmit={handleSubmit} noValidate>
                <InputField
                    label="Tên phim"
                    id="title"
                    name="title"
                    type="text"
                    placeholder="Nhập tên phim..."
                    defaultValue={filmDetails.title}
                    error={errors.title}
                />
                <TextareaField
                    label="Mô tả"
                    id="description"
                    name="description"
                    placeholder="Nhập mô tả phim..."
                    defaultValue={filmDetails.description}
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
                    value={filmDetails.releaseDate}
                    onChange={setReleaseDate}
                    error={errors.releaseDate}
                />
                <TimeInput
                    id="duration"
                    label="Thời lượng phim"
                    value={filmDetails.duration}
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
                    {
                        posterPreview ? (
                            <div className="flex flex-col items-center space-y-2">
                                <img
                                    src={posterPreview}
                                    alt="Poster preview"
                                    className="object-cover max-w-full max-h-full rounded-lg shadow-md"
                                />
                                <p className="text-sm text-gray-600">
                                    {poster ? "Nhấp để thay đổi ảnh poster" : "Poster hiện tại - Nhấp để thay đổi"}
                                </p>
                            </div>
                        ) : (
                            <p className="text-sm text-gray-600">Nhấp để chọn ảnh poster</p>
                        )
                    }
                </FileUpload>
                <FileUpload
                    id="trailer"
                    label="Trailer phim"
                    accept="video/*"
                    onChange={handleTrailerChange}
                    error={errors.trailer}
                >
                    {
                        trailerPreview ? (
                            <div className="flex flex-col items-center space-y-2">
                                <video
                                    src={trailerPreview}
                                    className="max-w-full max-h-full rounded-lg shadow-md"
                                    controls
                                    preload="metadata"
                                />
                                <p className="text-sm text-gray-600">Nhấp để thay đổi video trailer</p>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center space-y-2">
                                <div className="text-center">
                                    <svg
                                        className="w-12 h-12 mx-auto mb-2 text-gray-400"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                    </svg>
                                    <p className="text-sm text-gray-600">
                                        {filmDetails.trailerUrl ? "Chưa có trailer mới - Nhấp để tải lên" : "Nhấp để chọn video trailer"}
                                    </p>
                                </div>
                            </div>
                        )
                    }
                </FileUpload>
                <div className="flex pt-6 space-x-4">
                    <SubmitButton loading={loading} />
                    <CancelButton loading={loading} onCancel={handleCancel} />
                </div>
                {/* Modal confirm */}
                <ConfirmModal
                    open={showConfirm}
                    onCancel={() => setShowConfirm(false)}
                    onConfirm={() => {
                        resetForm();
                        setShowConfirm(false);
                    }}
                />
            </form>
        </>
    );
}