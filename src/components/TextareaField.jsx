export default function TextareaField({ label, id, rows = 4, ...props }) {
    return (
        <div className="w-full">
            <label
                htmlFor={id}
                className="block mb-2 text-sm font-medium text-gray-700 hover:cursor-pointer"
            >
                {label} <span className="text-red-500">*</span>
            </label>
            <textarea
                id={id}
                rows={rows}
                className={`
                    w-full px-3 py-2 border-2 rounded-md shadow-sm focus:outline-none
                    ${props.error
                        ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                        : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"}
                `}
                {...props}
            />
            {props.error && (
                <p className="mt-1 text-sm text-red-500">{props.error}</p>
            )}
        </div>
    );
}
