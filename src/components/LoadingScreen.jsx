import { useEffect, useState } from "react";

const LoadingScreen = () => {
    const [show, setShow] = useState(true);

    useEffect(() => {
        // Tự động ẩn sau 2 giây
        const timer = setTimeout(() => setShow(false), 2000);
        
        return () => clearTimeout(timer);
    }, []);

    if (!show) return null; // ẩn luôn sau 2 giây

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="flex flex-col items-center">
                {/* Vòng quay tròn */}
                <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
                <p className="mt-4 text-lg font-medium text-gray-700">Đang tải...</p>
            </div>
        </div>
    );
};

export default LoadingScreen;
