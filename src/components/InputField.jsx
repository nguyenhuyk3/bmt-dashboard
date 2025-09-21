export default function InputField({ label, id, ...props }) {
    return (
        <div className="w-full">
            <label htmlFor={id}
                className={`${props.type != "text" ? "hover:cursor-pointer" : ""} 
                    block mb-2 text-sm font-medium text-gray-700`}>
                {label} <span className="text-red-500"> * </span>
            </label>
            <input
                id={id}
                className={`
                        w-full px-3 py-2 border-2 rounded-md shadow-sm focus:outline-none
                        ${props.type === "text" || props.type === "email" ? "" : "hover:cursor-pointer"}
                        ${props.error
                        ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                        : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"}
                `}
                {...props}
            />
            {props.error && (
                <p className="mt-2 text-sm text-red-500">{props.error}</p>
            )}

        </div>
    );
}
