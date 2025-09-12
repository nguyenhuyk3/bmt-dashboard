export default function InputField({ label, id, required, ...props }) {
    return (
        <div className="w-full">
            <label htmlFor={id} className="block mb-2 text-sm font-medium text-gray-700">
                {label} {required && <span className="text-red-500"> * </span>}
            </label>
            <input
                id={id}
                required={required}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                {...props}
            />
        </div>
    );
}
