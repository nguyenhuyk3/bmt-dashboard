import { TransitionGroup, CSSTransition } from 'react-transition-group';

import ShowtimeCard from './ShowtimeCard';
import LoadingSection from './LoadingSection';

const ShowtimesListSection = ({ showtimes, loading, onRelease, releasingShowtime }) => {
    if (loading) return <LoadingSection />;

    if (showtimes.length === 0) return null;

    return (
        <>
            <h2 className="mb-4 text-2xl font-semibold text-gray-900">Danh Sách Suất Chiếu</h2>
            <TransitionGroup className="space-y-4">
                {showtimes.map((showtime) => (
                    <CSSTransition
                        key={showtime.showtimeId}
                        timeout={300} // thời gian animation
                        classNames="fade"
                    >
                        <ShowtimeCard
                            showtime={showtime}
                            onRelease={onRelease}
                            isReleasing={releasingShowtime === showtime.showtimeId}
                        />
                    </CSSTransition>
                ))}
            </TransitionGroup>
        </>
    );
};

export default ShowtimesListSection;
