
export const EditableField = ({ label, value, isEditable, onChange }) => {
    return (
        <div className="flex flex-row sm:items-center mb-4">
            <label className="font-medium sm:font-semibold sm:w-40 w-full mb-2 sm:mb-0">
                {label}:
            </label>
            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2">
                {isEditable ? (
                    <input
                        type="text"
                        className="w-full sm:w-64 border border-gray-300 rounded px-2 py-1"
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                    />
                ) : (
                    <p className="w-full sm:w-64 text-ellipsis overflow-hidden whitespace-nowrap">
                        {value}
                    </p>
                )}
            </div>
        </div>
    );
};