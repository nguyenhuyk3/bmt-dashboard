import {
    Film,
    PlayCircle,
    Clock,
    Star,
} from 'lucide-react';

// Stats Card Component
// eslint-disable-next-line no-unused-vars
const StatsCard = ({ icon: Icon, title, value, bgColor }) => {
    return (
        <div className="p-6 bg-white rounded-lg shadow-sm">
            <div className="flex items-center">
                <div className={`p-3 text-white ${bgColor} rounded-lg`}>
                    <Icon className="w-6 h-6" />
                </div>
                <div className="ml-4">
                    <p className="text-sm text-gray-600">{title}</p>
                    <p className="text-2xl font-semibold">{value}</p>
                </div>
            </div>
        </div>
    );
};

// Stats Section Component
const StatsSection = ({ totalFilms }) => {
    const statsData = [
        { icon: Film, title: "Tổng số phim", value: totalFilms, bgColor: "bg-blue-500" },
        { icon: PlayCircle, title: "Đang chiếu", value: 42, bgColor: "bg-green-500" },
        { icon: Clock, title: "Sắp chiếu", value: 28, bgColor: "bg-yellow-500" },
        { icon: Star, title: "Đánh giá TB", value: 8.2, bgColor: "bg-red-500" }
    ];

    return (
        <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-4">
            {
                statsData.map((stat, index) => (
                    <StatsCard key={index} {...stat} />
                ))
            }
        </div>
    );
};

export default StatsSection;