export default function TextareaField({ label, id, rows = 4, required, ...props }) {
    return (
        <div>
            <label htmlFor={id} className="block mb-2 text-sm font-medium text-gray-700">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            <textarea
                id={id}
                rows={rows}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                {...props}
            />
        </div>
    );
}
