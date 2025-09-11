import { useState } from "react";
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

export default function PasswordInput({ id, label, ...props }) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="relative w-full">
            <label
                htmlFor={id}
                className="block mb-2 text-sm font-medium text-gray-700"
            >
                {label}
            </label>
            <input
                id={id}
                type={showPassword ? "text" : "password"}
                className="w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:ring-1 focus:outline-none"
                {...props}
            />
            <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute text-gray-500 top-9 right-3"
            >
                {showPassword ? (
                    <EyeSlashIcon className="w-6 h-6" />
                ) : (
                    <EyeIcon className="w-6 h-6" />
                )}
            </button>
        </div>
    );
}