import Logo from "../../assets/react.svg";
import Form from "./components";

function LoginPage() {
    return (
        <div className="flex items-center justify-center h-screen overflow-hidden bg-gray-100">
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
                <Form />
            </div>
        </div>
    );
}

export default LoginPage;
