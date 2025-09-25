import ShowtimeCard from './ShowtimeCard';
import LoadingSection from './LoadingSection';

const ShowtimesListSection = ({ showtimes, loading, onRelease, processingIds, removingIds }) => {
    if (loading) return <LoadingSection />;
    // -- THAY ĐỔI 3: Điều kiện này quan trọng, nó sẽ ẩn section này đi khi không còn suất chiếu
    // để component NoResultsSection ở cha có thể hiện ra.
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
                        isProcessing={processingIds.includes(showtime.showtimeId)}
                        isRemoving={removingIds.includes(showtime.showtimeId)}
                    />
                ))}
            </div>
        </>
    );
};

export default ShowtimesListSection;