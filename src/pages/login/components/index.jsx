import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

import { loginRequest } from "../../../features/authentication/authenticationSlice";

function Input({ id, label, type = "text", value, onChange, placeholder }) {
    return (
        <div className="w-full mb-4">
            <label
                htmlFor={id}
                className="block mb-3 text-sm font-medium text-gray-700">
                {label}
            </label>
            <input
                id={id}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:ring-2 focus:outline-none"
            />
        </div>
    );
}

function PasswordInput({ id, label, value, onChange, placeholder }) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="relative w-full mb-4">
            <label
                htmlFor={id}
                className="block mb-3 text-sm font-medium text-gray-700"
            >
                {label}
            </label>
            <input
                id={id}
                type={showPassword ? "text" : "password"}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:ring-2 focus:outline-none"
            />
            <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute text-gray-500 top-10 right-3"
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


function Button({ children, onClick, type = "button" }) {
    return (
        <button
            type={type}
            onClick={onClick}
            className="w-full py-2 font-medium text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
        >
            {children}
        </button>
    );
}

function Form() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const { loading, error, role } = useSelector((state) => state.auth);

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(loginRequest({ email, password }));
    };

    useEffect(() => {
        if (error) {
            toast.error(error);
        }
    }, [error])

    useEffect(() => {
        if (role && role !== "CUSTOMER") {
            toast.success("Đăng nhập thành công!");
        }
    }, [role]);

    return (
        <form onSubmit={handleSubmit}>
            <Input
                id="email"
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Nhập email"
            />
            <PasswordInput
                id="password"
                label="Mật khẩu"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Nhập mật khẩu"
            />

            <div className="mb-8"></div>

            <Button type="submit">{loading ? "Đang đăng nhập..." : "Đăng nhập"}</Button>
        </form>
    );
}

export default Form;
