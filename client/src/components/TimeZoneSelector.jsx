import React from 'react';
import moment from 'moment-timezone';

const TimeZoneSelector = ({ selectedTimeZone, onTimeZoneChange }) => {
    const timeZones = moment.tz.names();

    return (
        <div className="mb-4">
            <label className="mr-2">Time Zone:</label>
            <select
                value={selectedTimeZone}
                onChange={(e) => onTimeZoneChange(e.target.value)}
                className="p-2 border rounded"
            >
                {timeZones.map((zone) => (
                    <option key={zone} value={zone}>
                        {zone}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default TimeZoneSelector;