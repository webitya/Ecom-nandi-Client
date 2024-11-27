import React, { useState } from "react";

const hindiMonths = [
    "जनवरी", "फ़रवरी", "मार्च", "अप्रैल",
    "मई", "जून", "जुलाई", "अगस्त",
    "सितंबर", "अक्टूबर", "नवंबर", "दिसंबर"
];

const events = {
    "2024-11-27": "कोडिंग प्रतियोगिता",
    "2024-11-28": "महिला सशक्तिकरण दिवस",
    "2024-12-01": "विश्व एड्स दिवस",
    "2024-12-10": "मानवाधिकार दिवस",
};

export const CalendarBanner = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const day = today.getDate();
    const todayKey = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

    const [hoveredEvent, setHoveredEvent] = useState("");

    const firstDayOfMonth = new Date(year, month, 1).getDay(); // Day of the week for 1st of the month
    const daysInMonth = new Date(year, month + 1, 0).getDate(); // Total days in the month

    const calendarDays = Array.from({ length: firstDayOfMonth }, () => null).concat(
        Array.from({ length: daysInMonth }, (_, i) => i + 1)
    );

    return (
        <div className="container mx-auto p-6 bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-50 rounded-2xl shadow-xl">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-purple-700">
                    {hindiMonths[month]} {year}
                </h2>
                <div className="text-lg text-gray-600">
                    <span className="font-medium text-purple-700">आज:</span> {`${day} ${hindiMonths[month]}, ${year}`}
                </div>
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-4">
                {/* Weekdays */}
                {["रवि", "सोम", "मंगल", "बुध", "गुरु", "शुक्र", "शनि"].map((dayName) => (
                    <div key={dayName} className="text-sm font-semibold text-gray-500 uppercase">
                        {dayName}
                    </div>
                ))}

                {/* Days */}
                {calendarDays.map((date, index) => {
                    const currentDateKey = date
                        ? `${year}-${String(month + 1).padStart(2, "0")}-${String(date).padStart(2, "0")}`
                        : null;
                    const isToday = currentDateKey === todayKey;

                    return (
                        <div
                            key={index}
                            className={`h-16 w-full flex justify-center items-center rounded-lg relative
                ${date
                                    ? isToday
                                        ? "bg-purple-600 text-white font-bold shadow-md scale-105"
                                        : "bg-gray-100 text-gray-800 hover:bg-purple-100 transition-all duration-300 cursor-pointer"
                                    : ""
                                }`}
                            onMouseEnter={() => setHoveredEvent(events[currentDateKey] || "")}
                            onMouseLeave={() => setHoveredEvent("")}
                        >
                            {date || ""}
                            {/* Event Badge */}
                            {events[currentDateKey] && (
                                <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-red-500"></div>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Today's Event */}
            <div className="mt-8 p-6 bg-white rounded-xl shadow-lg">
                <h3 className="text-xl font-semibold text-purple-700">आज का कार्यक्रम</h3>
                {events[todayKey] ? (
                    <p className="mt-4 text-sm text-gray-700">{events[todayKey]}</p>
                ) : (
                    <p className="mt-4 text-sm text-gray-500">आज कोई कार्यक्रम नहीं है।</p>
                )}
            </div>

            {/* Hovered Event */}
            {hoveredEvent && (
                <div className="mt-4 p-4 bg-purple-100 rounded-lg text-gray-700 shadow">
                    <p className="text-sm">{hoveredEvent}</p>
                </div>
            )}

            {/* List of All Events */}
            <div className="mt-8">
                <h3 className="text-xl font-semibold text-purple-700">इस महीने के सभी कार्यक्रम</h3>
                <ul className="mt-4 space-y-2">
                    {Object.entries(events).map(([date, event]) => {
                        const eventDate = new Date(date);
                        return (
                            <li
                                key={date}
                                className={`p-4 border rounded-lg shadow-md ${date === todayKey ? "bg-purple-100" : "bg-white"
                                    } hover:bg-gray-50 transition-colors`}
                            >
                                <p className="text-sm font-semibold text-gray-800">
                                    {`${eventDate.getDate()} ${hindiMonths[eventDate.getMonth()]}, ${eventDate.getFullYear()}`}
                                </p>
                                <p className="text-sm text-gray-700 mt-1">{event}</p>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
};

export default CalendarBanner;
