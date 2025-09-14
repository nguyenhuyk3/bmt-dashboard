import { useState, useEffect } from "react";

export default function DateInput({ id, label, onChange, error, value = "" }) {
    const [year, setYear] = useState("");
    const [month, setMonth] = useState("");
    const [day, setDay] = useState("");
    // Reset state khi value từ parent thay đổi
    useEffect(() => {
        if (value === "") {
            setYear("");
            setMonth("");
            setDay("");
        } else if (value) {
            const [y, m, d] = value.split("-");

            setYear(y);
            setMonth(parseInt(m, 10).toString());
            setDay(parseInt(d, 10).toString());
        }
    }, [value]);
    // Tính số ngày trong tháng
    const getDaysInMonth = (year, month) => {
        if (!year || !month) return 31;

        return new Date(year, month, 0).getDate();
    };

    const handleChange = (y, m, d) => {
        if (y && m && d) {
            onChange && onChange(`${y}-${m.padStart(2, "0")}-${d.padStart(2, "0")}`);
        } else {
            onChange && onChange("");
        }
    };

    useEffect(() => {
        handleChange(year, month, day);
    }, [year, month, day]);

    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 50 }, (_, i) => currentYear - i);
    const months = Array.from({ length: 12 }, (_, i) => i + 1);
    const days = Array.from({ length: getDaysInMonth(year, month) }, (_, i) => i + 1);

    return (
        <div className="w-full">
            <label htmlFor={id} className="block mb-2 text-sm font-medium text-gray-700 hover:cursor-pointer">
                {label}
                <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center gap-2">
                {/* Year */}
                <select
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    className={`px-3 py-2 border rounded-md focus:outline-none hover:cursor-pointer 
                        ${error ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
                        }`}
                >
                    <option value="">Năm</option>
                    {years.map((y) => (
                        <option key={y} value={y}>
                            {y}
                        </option>
                    ))}
                </select>
                {/* Month */}
                <select
                    value={month}
                    onChange={(e) => setMonth(e.target.value)}
                    className={`px-3 py-2 border rounded-md focus:outline-none hover:cursor-pointer 
                        ${error ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
                        }`}
                >
                    <option value="">Tháng</option>
                    {months.map((m) => (
                        <option key={m} value={m}>
                            {m.toString().padStart(2, "0")}
                        </option>
                    ))}
                </select>
                {/* Day */}
                <select
                    value={day}
                    onChange={(e) => setDay(e.target.value)}
                    className={`px-3 py-2 border rounded-md focus:outline-none hover:cursor-pointer 
                        ${error ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
                        }`}
                >
                    <option value="">Ngày</option>
                    {days.map((d) => (
                        <option key={d} value={d}>
                            {d.toString().padStart(2, "0")}
                        </option>
                    ))}
                </select>
            </div>
            {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
        </div>
    );
}