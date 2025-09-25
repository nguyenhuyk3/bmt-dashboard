import ShowtimeCard from './ShowtimeCard';
import LoadingSection from './LoadingSection';

// --- SỬA LỖI: Thay đổi props nhận vào ---
// Thay vì nhận processingIds và removingIds, giờ chúng ta nhận một object `statuses` duy nhất.
const ShowtimesListSection = ({ showtimes, loading, onRelease, statuses }) => {
    if (loading) return <LoadingSection />;
    if (!loading && showtimes.length === 0) return null;

    return (
        <>
            <h2 className="mb-4 text-2xl font-semibold text-gray-900">Danh Sách Suất Chiếu</h2>
            <div className="space-y-4">
                {showtimes.map(showtime => (
                    <ShowtimeCard
                        key={showtime.showtimeId}
                        showtime={showtime}
                        onRelease={onRelease}
                        // --- SỬA LỖI: Cập nhật logic để đọc từ object `statuses` ---
                        // Kiểm tra trạng thái của showtime hiện tại trong object statuses.
                        isProcessing={statuses[showtime.showtimeId] === 'processing'}
                        isRemoving={statuses[showtime.showtimeId] === 'removing'}
                    />
                ))}
            </div>
        </>
    );
};

export default ShowtimesListSection;