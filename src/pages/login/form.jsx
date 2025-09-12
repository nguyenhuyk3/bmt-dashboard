import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import { loginRequest } from "../../features/slices/index";
import { InputField, PasswordInput } from "../../components/index";


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

export default function LoginForm() {
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
        <form className="space-y-4" onSubmit={handleSubmit}>
            <InputField
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
