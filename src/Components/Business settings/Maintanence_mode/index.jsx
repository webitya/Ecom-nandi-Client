import { useState } from "react";

const MtMode = () => {
    const [isMaintenanceMode, setIsMaintenanceMode] = useState(false);

    const toggleMaintenanceMode = () => {
        setIsMaintenanceMode(!isMaintenanceMode);
    };
    return (
        <>
            <div className={`flex items-center justify-between w-full max-w-xlg border-2 ${isMaintenanceMode ? "border-blue-500" : "border-gray-300"} rounded-lg p-4 shadow-lg bg-white`}>
                <span className="text-lg font-semibold text-blue-600">
                    Maintenance Mode
                </span>
                <div
                    className="relative inline-block w-16 h-8 cursor-pointer"
                    onClick={toggleMaintenanceMode}
                >
                    <input
                        type="checkbox"
                        checked={isMaintenanceMode}
                        readOnly
                        className="opacity-0 w-0 h-0"
                    />
                    <span
                        className={`absolute top-0 left-0 right-0 bottom-0 rounded-full transition-colors ${isMaintenanceMode ? "bg-blue-500" : "bg-sky-200"
                            }`}
                    ></span>
                    <span
                        className={`absolute left-1 top-1 w-6 h-6 rounded-full bg-white transition-transform transform ${isMaintenanceMode ? "translate-x-8" : "translate-x-0"
                            }`}
                    ></span>
                </div>
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center mb-2 tracking-wider">
                *By turning the "Maintenance Mode" ON, all your apps and customer
                websites will be disabled until you turn this mode OFF. Only the Admin
                Panel will be functional.
            </p>
        </>
    );
}

export default MtMode;