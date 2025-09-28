const seatTypeColors = {
    STANDARD: "bg-gradient-to-br from-slate-500 to-slate-600", // Xám gradient
    COUPLED: "bg-gradient-to-br from-purple-500 to-purple-600", // Tím gradient
    VIP: "bg-gradient-to-br from-amber-500 to-amber-600", // Vàng đồng gradient
};

export default function Seats({ seats, metadata }) {
    console.log(seats);

    // --- Hàm tạo ghế đơn ---
    const createSingleSeat = (seat) => {
        const seatNumber = parseInt(seat.seatNumber.substring(1));
        let baseClass =
            "w-9 h-9 md:w-11 md:h-11 flex items-center justify-center rounded-lg text-xs font-bold transition-all duration-300 shadow-sm border";
        let tooltip = "";
        const baseColor = seatTypeColors[seat.seatType] || "bg-gradient-to-br from-slate-500 to-slate-600";

        if (seat.status === "AVAILABLE") {
            baseClass += ` ${baseColor} hover:shadow-lg hover:scale-105 cursor-pointer text-white border-gray-300 hover:border-blue-400`;
        } else if (seat.status === "RESERVED") {
            baseClass +=
                " bg-gradient-to-br from-yellow-400 to-yellow-500 text-black cursor-not-allowed relative group border-yellow-300 shadow-md";
            tooltip = (
                <span className="absolute z-10 hidden px-3 py-2 text-xs text-white -translate-x-1/2 bg-gray-900 rounded-lg shadow-xl pointer-events-none bottom-full group-hover:block left-1/2 whitespace-nowrap">
                    Giữ bởi: {seat.bookedBy}
                    <div className="absolute w-0 h-0 transform -translate-x-1/2 border-t-4 border-l-4 border-r-4 border-transparent top-full left-1/2 border-t-gray-900"></div>
                </span>
            );
        } else if (seat.status === "BOOKED") {
            baseClass += " bg-gradient-to-br from-red-500 to-red-600 cursor-not-allowed relative group text-white border-red-400 shadow-md";
            tooltip = (
                <span className="absolute z-10 hidden px-3 py-2 text-xs text-white -translate-x-1/2 bg-gray-900 rounded-lg shadow-xl pointer-events-none bottom-full group-hover:block left-1/2 whitespace-nowrap">
                    Đặt bởi: {seat.bookedBy}
                    <div className="absolute w-0 h-0 transform -translate-x-1/2 border-t-4 border-l-4 border-r-4 border-transparent top-full left-1/2 border-t-gray-900"></div>
                </span>
            );
        }

        return (
            <div
                key={seat.seatId}
                className={baseClass}
                data-seat-id={seat.seatId}
            >
                {seatNumber}
                {tooltip}
            </div>
        );
    };

    // --- Hàm tạo ghế đôi ---
    const createCoupledSeat = (seat1, seat2) => {
        let baseClass =
            "w-[4.75rem] h-9 md:w-[6rem] md:h-11 flex items-center justify-center rounded-lg text-xs font-bold transition-all duration-300 coupled-seat shadow-sm border";
        const baseColor = seatTypeColors[seat1.seatType] || "bg-gradient-to-br from-purple-500 to-purple-600";

        let tooltip = "";
        if (seat1.status === "AVAILABLE") {
            baseClass += ` ${baseColor} hover:shadow-lg hover:scale-105 cursor-pointer text-white border-gray-300 hover:border-blue-400`;
        } else if (seat1.status === "RESERVED") {
            baseClass +=
                " bg-gradient-to-br from-yellow-400 to-yellow-500 text-black cursor-not-allowed relative group border-yellow-300 shadow-md";
            tooltip = (
                <span className="absolute z-10 hidden px-3 py-2 text-xs text-white -translate-x-1/2 bg-gray-900 rounded-lg shadow-xl pointer-events-none bottom-full group-hover:block left-1/2 whitespace-nowrap">
                    Giữ bởi: {seat1.bookedBy}
                    <div className="absolute w-0 h-0 transform -translate-x-1/2 border-t-4 border-l-4 border-r-4 border-transparent top-full left-1/2 border-t-gray-900"></div>
                </span>
            );
        } else if (seat1.status === "BOOKED") {
            baseClass += " bg-gradient-to-br from-red-500 to-red-600 cursor-not-allowed relative group text-white border-red-400 shadow-md";
            tooltip = (
                <span className="absolute z-10 hidden px-3 py-2 text-xs text-white -translate-x-1/2 bg-gray-900 rounded-lg shadow-xl pointer-events-none bottom-full group-hover:block left-1/2 whitespace-nowrap">
                    Đặt bởi: {seat1.bookedBy}
                    <div className="absolute w-0 h-0 transform -translate-x-1/2 border-t-4 border-l-4 border-r-4 border-transparent top-full left-1/2 border-t-gray-900"></div>
                </span>
            );
        }

        const seatRange = `${parseInt(seat1.seatNumber.substring(1))}-${parseInt(
            seat2.seatNumber.substring(1)
        )}`;

        return (
            <div
                key={`${seat1.seatId}-${seat2.seatId}`}
                className={baseClass}
            >
                {seatRange}
                {tooltip}
            </div>
        );
    };

    // --- Tổ chức ghế theo hàng ---
    const rows = {};
    seats.forEach((seat) => {
        const rowLetter = seat.seatNumber.charAt(0);
        if (!rows[rowLetter]) rows[rowLetter] = [];
        rows[rowLetter].push(seat);
    });

    const sortedRowKeys = Object.keys(rows).sort();

    return (
        <div className="relative overflow-hidden text-white bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
            {/* Cinema Screen */}
            <div className="relative px-4 pt-8 pb-6">
                <div className="max-w-4xl mx-auto">
                    {/* Screen */}
                    <div className="relative mb-8">
                        <div className="h-2 rounded-full shadow-lg bg-gradient-to-r from-transparent via-white to-transparent"></div>
                        <div className="mt-3 text-center">
                            <span className="text-sm font-medium text-gray-400">MÀN HÌNH CHIẾU</span>
                        </div>
                    </div>

                    <h1 className="mb-8 text-2xl font-bold text-center text-transparent md:text-3xl bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text">
                        Sơ đồ ghế rạp chiếu phim
                    </h1>

                    {/* Seat Map */}
                    <div id="seat-map" className="flex flex-col gap-3 mb-8">
                        {sortedRowKeys.map((rowKey) => {
                            const rowSeats = rows[rowKey].sort(
                                (a, b) =>
                                    parseInt(a.seatNumber.substring(1)) -
                                    parseInt(b.seatNumber.substring(1))
                            );

                            let rowElements = [];
                            let currentIndex = 0;

                            while (currentIndex < rowSeats.length) {
                                const seat = rowSeats[currentIndex];
                                const seatNumber = parseInt(seat.seatNumber.substring(1));

                                if (seatNumber === 7) {
                                    rowElements.push(<div key={`aisle-${rowKey}`} className="w-8" />);
                                }

                                if (seat.seatType === "COUPLED") {
                                    const nextSeat = rowSeats[currentIndex + 1];
                                    if (
                                        nextSeat &&
                                        nextSeat.seatType === "COUPLED" &&
                                        parseInt(nextSeat.seatNumber.substring(1)) === seatNumber + 1
                                    ) {
                                        rowElements.push(createCoupledSeat(seat, nextSeat));
                                        currentIndex += 2;
                                        continue;
                                    }
                                }

                                rowElements.push(createSingleSeat(seat));
                                currentIndex++;
                            }

                            return (
                                <div
                                    key={rowKey}
                                    className="flex items-center w-full"
                                >
                                    <div className="w-8 text-lg font-bold text-center text-gray-400">
                                        {rowKey}
                                    </div>
                                    <div className="flex items-center justify-center flex-grow gap-1.5">
                                        {rowElements}
                                    </div>
                                    <div className="w-8 text-lg font-bold text-center text-gray-400">
                                        {rowKey}
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Legend */}
                    <div className="p-6 border border-gray-700 bg-gray-800/50 backdrop-blur-sm rounded-2xl">
                        <h3 className="mb-4 text-lg font-semibold text-center text-gray-200">Chú thích</h3>
                        {/* Tổng doanh thu */}
                        <div className="flex justify-center gap-2 p-4 mb-4 text-sm font-semibold text-yellow-300 rounded-lg shadow-sm bg-gray-800/50">
                            <span>Tổng doanh thu:</span>
                            <span>
                                {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(metadata.totalRevenue)}
                            </span>
                        </div>
                        <div className="flex flex-col items-center justify-center gap-8 lg:flex-row">
                            {/* Status Legend */}
                            <div className="flex flex-wrap justify-center gap-4">
                                <div className="flex items-center gap-2">
                                    <div className="w-6 h-6 border border-yellow-300 rounded-lg shadow-sm bg-gradient-to-br from-yellow-400 to-yellow-500"></div>
                                    <span className="text-sm font-medium">Đang giữ</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-6 h-6 border border-red-400 rounded-lg shadow-sm bg-gradient-to-br from-red-500 to-red-600"></div>
                                    <span className="text-sm font-medium">Đã đặt</span>
                                </div>
                            </div>

                            <div className="hidden w-px h-12 bg-gray-600 lg:block"></div>

                            {/* Seat Types Legend */}
                            <div className="flex flex-wrap justify-center gap-4">
                                {Object.keys(metadata.seatTypes).map((type) => {
                                    let typeDisplayName = "";
                                    let colorClass = "";
                                    switch (type) {
                                        case "STANDARD":
                                            typeDisplayName = "Thường";
                                            colorClass = "bg-gradient-to-br from-slate-500 to-slate-600";
                                            break;
                                        case "COUPLED":
                                            typeDisplayName = "Đôi";
                                            colorClass = "bg-gradient-to-br from-purple-500 to-purple-600";
                                            break;
                                        case "VIP":
                                            typeDisplayName = "VIP";
                                            colorClass = "bg-gradient-to-br from-amber-500 to-amber-600";
                                            break;
                                        default:
                                            typeDisplayName = type;
                                            colorClass = "bg-gradient-to-br from-slate-500 to-slate-600";
                                    }
                                    return (
                                        <div key={type} className="flex items-center gap-2">
                                            <div className={`w-6 h-6 ${colorClass} rounded-lg shadow-sm border border-gray-300`}></div>
                                            <span className="text-sm font-medium">{typeDisplayName}:</span>
                                            <span className="px-2 py-1 text-sm font-semibold text-yellow-400 bg-gray-700 rounded">
                                                {new Intl.NumberFormat("vi-VN").format(
                                                    metadata.seatTypes[type].price
                                                )}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}