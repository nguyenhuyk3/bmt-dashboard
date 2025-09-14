import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { loginRequest } from "../../features/slices/index";
import { InputField, PasswordInput } from "../../components/index";
import { DEFAULT } from "../../utils/routes"


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
    const { loading, role } = useSelector((state) => state.authentication);
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(loginRequest({ email, password }));
    };

    useEffect(() => {
        if (role) {
            navigate(DEFAULT);
        }
    }, [role, navigate]);

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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Nhập mật khẩu"
            />

            <div className="mb-8"></div>

            <Button type="submit">{loading ? "Đang đăng nhập..." : "Đăng nhập"}</Button>
        </form>
    );
}
