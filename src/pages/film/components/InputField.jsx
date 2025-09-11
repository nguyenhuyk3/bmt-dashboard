export default function InputField({ label, id, type = "text", required, ...props }) {
    return (
        <>
            <label htmlFor={id} className="block mb-2 text-sm font-medium text-gray-700">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            <input
                type={type}
                id={id}
                required={required}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                {...props}
            />
        </>
    );
}
