export default function FileUpload({ id, label, accept, onChange, error, children }) {
    return (
        <div className="w-full">
            <label
                htmlFor={id}
                className="block mb-2 text-sm font-medium text-gray-700 hover:cursor-pointer"
            >
                {label} <span className="text-red-500"> * </span>
            </label>
            <div className="relative">
                <input
                    type="file"
                    id={id}
                    accept={accept}
                    className="hidden"
                    onChange={onChange}
                />
                <label
                    htmlFor={id}
                    className={`
                        ${error
                            ? "border-red-500 hover:border-red-500 hover:bg-red-50"
                            : "border-gray-300 hover:border-blue-400 hover:bg-gray-50"}
                        flex items-center justify-center w-full px-4 py-6 transition-colors border-2 border-dashed rounded-lg cursor-pointer
                    `}
                >
                    {children}
                </label>
                {error && (
                    <p className="mt-2 text-sm text-red-500">{error}</p>
                )}
            </div>
        </div>
    );
}