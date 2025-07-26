import type { IAlert } from '@/interfaces/package';
import React from 'react';

interface AlertDisplayProps {
    alerts: IAlert[];
}

const AlertDisplay: React.FC<AlertDisplayProps> = ({ alerts }) => {
    if (alerts.length === 0) {
        return null;
    }

    return (
        <div className="p-4 bg-red-100 border-l-4 border-red-500 text-red-700 mb-6 rounded-md shadow-md">
            <h3 className="text-lg font-bold mb-2">Recent Alerts!</h3>
            <ul className="list-disc list-inside space-y-1">
                {alerts.map((alert) => (
                    <li key={alert._id} className="text-sm">
                        <span className="font-semibold">{alert.package_id}:</span> {alert.message} ({new Date(alert.timestamp).toLocaleTimeString()})
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AlertDisplay;