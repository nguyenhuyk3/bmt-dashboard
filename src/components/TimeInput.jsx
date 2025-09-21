import { useState, useEffect } from "react";

export default function TimeInput({ id, label, onChange, error, value = "" }) {
    const [hour, setHour] = useState("");
    const [minute, setMinute] = useState("");

    // Reset state khi value từ parent thay đổi
    useEffect(() => {
        if (value === "") {
            setHour("");
            setMinute("");
        } else if (value) {
            const [h, m] = value.split(":");

            setHour(h);
            setMinute(m);
        }
    }, [value]);

    const handleChange = (h, m) => {
        // chỉ khi nhập hợp lệ mới trả ra
        if (h !== "" && m !== "") {
            onChange && onChange(`${h.padStart(2, "0")}:${m.padStart(2, "0")}`);
        } else {
            onChange && onChange("");
        }
    };

    const handleHourChange = (e) => {
        let val = e.target.value;
        // Cho phép rỗng hoặc số
        if (val === "") {
            setHour("");
            handleChange("", minute);

            return;
        }
        // Chỉ cho số
        if (!/^\d+$/.test(val)) return;
        // Convert sang số
        let num = parseInt(val, 10);

        if (num > 23) num = 23;

        setHour(num.toString());
        handleChange(num.toString(), minute);
    };

    const handleMinuteChange = (e) => {
        let val = e.target.value;

        if (val === "") {
            setMinute("");
            handleChange(hour, "");

            return;
        }

        if (!/^\d+$/.test(val)) return;

        let num = parseInt(val, 10);

        if (num > 59) num = 59;

        setMinute(num.toString());
        handleChange(hour, num.toString());
    };


    return (
        <div className="w-full">
            <label
                htmlFor={id}
                className="block mb-2 text-sm font-medium text-gray-700"
            >
                {label} <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center gap-2">
                {/* Hour input */}
                <input
                    type="number"
                    id={`${id}-hour`}
                    placeholder="Giờ"
                    min="0"
                    max="23"
                    value={hour}
                    onChange={handleHourChange}
                    className={
                        `w-20 px-3 py-2 border rounded-md text-center focus:outline-none
                        ${error ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"}
                        `
                    }
                />
                <span className="text-lg">:</span>
                {/* Minute input */}
                <input
                    type="number"
                    id={`${id}-minute`}
                    placeholder="Phút"
                    min="0"
                    max="59"
                    value={minute}
                    onChange={handleMinuteChange}
                    className={
                        `w-20 px-3 py-2 border rounded-md text-center focus:outline-none
                        ${error ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"}
                        `
                    }
                />
            </div>
            {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
        </div>
    );
}