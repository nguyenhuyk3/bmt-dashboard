import { useEffect } from "react";

import Logo from "../../assets/react.svg";
import LoginForm from "./form";

function LoginPage() {
    useEffect(() => {
        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-2xl">
                {/* Logo */}
                <div className="flex justify-center mb-6">
                    <img src={Logo} alt="Logo" className="h-16" />
                </div>
                {/* Title */}
                <h1 className="mb-6 text-2xl font-semibold text-center text-gray-800">
                    Đăng nhập
                </h1>
                {/* Form */}
                <LoginForm />
            </div>
        </div>
    );
}

export default LoginPage;
