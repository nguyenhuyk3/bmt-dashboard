import { useState } from "react";

function Input({ label, type = "text", value, onChange, placeholder }) {
    return (
        <div className="w-full mb-4">
            <label className="block mb-1 text-sm font-medium text-gray-700">
                {label}
            </label>
            <input
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:ring-2 focus:outline-none"
            />
        </div>
    );
}

function Button({ children, onClick, type = "button" }) {
    return (
        <button
            type={type}
            onClick={onClick}
            className="w-full py-2 text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
        >
            {children}
        </button>
    );
}

function Form() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Email:", email, "Password:", password);
        // TODO: dispatch redux saga login action
    };

    return (
        <form onSubmit={handleSubmit}>
            <Input
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Nhập email"
            />
            <Input
                label="Mật khẩu"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Nhập mật khẩu"
            />

            <div className="mb-8"></div>

            <Button type="submit">Đăng nhập</Button>
        </form>
    );
}

export default Form;
