export default function FileUpload({ id, label, accept, onChange, required, children }) {
    return (
        <>
            <label className="block mb-2 text-sm font-medium text-gray-700"
                htmlFor={id}>
                {label}  {required && <span className="text-red-500">*</span>}
            </label>
            <div className="relative">
                <input type="file" id={id} accept={accept} className="hidden" onChange={onChange} />
                <label
                    htmlFor={id}
                    className="flex items-center justify-center w-full px-4 py-6 transition-colors border-2 border-gray-300 border-dashed rounded-lg cursor-pointer hover:border-blue-400 hover:bg-gray-50"
                >
                    {children}
                </label>
            </div>
        </>
    );
}
