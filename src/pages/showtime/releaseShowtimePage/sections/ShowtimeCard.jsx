import { GENRE_NAMES, getGenreColor } from '../../../../utils/mappers/genre';

const formatTime = (timeString) => {
    const date = new Date(timeString);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    return `${hours}:${minutes.toString().padStart(2, '0')}`;
};

const formatDuration = (durationString) => {
    const [hours, minutes] = durationString.split(':');
    return `${parseInt(hours, 10)}:${minutes}`;
};

const ShowtimeCard = ({ showtime, onRelease, isProcessing, isRemoving }) => {
    const handleRelease = () => {
        onRelease(showtime.showtimeId);
    };
    const isDisabled = isProcessing || isRemoving;
    const getButtonText = () => {
        if (isRemoving) return 'Hoàn thành!';
        if (isProcessing) return 'Đang xử lý...';

        return 'Công Bố Suất Chiếu';
    };

    return (
        <div
            className={`overflow-hidden transition-all duration-500 ease-in-out ${isRemoving
                ? 'max-h-0 opacity-0 transform scale-y-0 mb-0'
                : 'max-h-96 opacity-100 transform scale-y-100 mb-4'
                }`}
        >
            <div
                className={`p-4 border border-gray-200 rounded-lg hover:border-blue-500 transition-all duration-300 ${isRemoving ? 'transform scale-95' : 'transform scale-100'
                    }`}
            >
                <div className="flex items-start gap-4">
                    {/* Movie Poster */}
                    <div className="flex-shrink-0">
                        {showtime.film.posterUrl && showtime.film.posterUrl !== "NONE" ? (
                            <img
                                src={showtime.film.posterUrl}
                                alt={showtime.film.title}
                                className="object-cover w-24 rounded-lg shadow-md h-36"
                                onError={(e) => { e.target.style.display = 'none'; }}
                            />
                        ) : (
                            <div className="flex items-center justify-center w-24 bg-gray-200 rounded-lg h-36">
                                <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </div>
                        )}
                    </div>
                    {/* Movie Info */}
                    <div className="flex-1">
                        <h3 className="mb-1 text-lg font-semibold text-gray-900">{showtime.film.title}</h3>
                        <p className="mb-3 text-sm leading-relaxed text-gray-600">{showtime.film.description}</p>
                        <div className="space-y-1 text-sm text-gray-500">
                            <p><span className="font-medium">Thời gian:</span> {formatTime(showtime.startTime)} - {formatTime(showtime.endTime)}</p>
                            <p><span className="font-medium">Thời lượng:</span> {formatDuration(showtime.film.duration)}</p>
                            <p><span className="font-medium">Thể loại:</span></p>
                            <div className="flex flex-wrap gap-1 mt-1">
                                {showtime.film.genres.map((genre) => (
                                    <span
                                        key={genre}
                                        className={`px-2 py-1 text-xs font-semibold rounded ${getGenreColor(genre)}`}
                                    >
                                        {GENRE_NAMES[genre] || genre}
                                    </span>
                                ))}
                            </div>
                            <p><span className="font-medium">Hệ số:</span> {showtime.coefficient}x</p>
                        </div>
                    </div>
                    {/* Release Button */}
                    <div className="flex-shrink-0">
                        <button
                            type="button"
                            onClick={handleRelease}
                            disabled={isDisabled}
                            className={`px-4 py-2 text-white transition-all duration-200 rounded-md whitespace-nowrap ${isDisabled
                                ? 'bg-gray-400 cursor-not-allowed'
                                : 'bg-green-500 hover:bg-green-600'
                                }`}
                        >
                            {getButtonText()}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShowtimeCard;