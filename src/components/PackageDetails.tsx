import type { IPackage } from '@/interfaces/package';
import React from 'react';

interface PackageDetailsProps {
    package: IPackage;
    onBack: () => void;
}

const PackageDetails: React.FC<PackageDetailsProps> = ({ package: pkg, onBack }) => {
    return (
        <div className="p-4 bg-gray-100 min-h-screen">
            <button
                onClick={onBack}
                className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors shadow-md"
            >
                &larr; Back to List
            </button>
            <h2 className="text-3xl font-bold mb-4 text-gray-800">{pkg.package_id}</h2>
            <div className="bg-white p-6 rounded-lg shadow mb-6">
                <h3 className="text-xl font-semibold mb-3">Current Status</h3>
                <p><strong>Status:</strong> {pkg.current_status.replace(/_/g, ' ')}</p>
                <p><strong>Last Updated Server Time:</strong> {new Date(pkg.last_updated).toLocaleString()}</p>
                <p><strong>Status Reported At:</strong> {new Date(pkg.current_status_timestamp as string).toLocaleString()}</p>
                {pkg.current_lat !== undefined && pkg.current_lon !== undefined && (
                    <p><strong>Latest Location:</strong> {pkg.current_lat.toFixed(4)}, {pkg.current_lon.toFixed(4)}</p>
                )}
                <p><strong>ETA:</strong> {pkg.eta ? new Date(pkg.eta).toLocaleString() : '—'}</p>
                <p><strong>Received At (First Event):</strong> {new Date(pkg.received_at as string).toLocaleString()}</p>
                {pkg.is_stuck_alert_triggered && (
                    <p className="text-red-600 font-bold mt-2 text-lg animate-pulse">This package is currently flagged as STUCK!</p>
                )}
                {pkg.current_lat !== undefined && pkg.current_lon !== undefined && (
                    <div className="mt-4 bg-gray-200 h-48 flex items-center justify-center rounded-md border border-gray-300">
                        <p className="text-gray-500">Map Placeholder for {pkg.current_lat.toFixed(4)}, {pkg.current_lon.toFixed(4)}</p>
                    </div>
                )}
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-xl font-semibold mb-3">Event History (Newest First)</h3>
                {pkg.event_history.length === 0 ? (
                    <p className="text-gray-600">No event history available.</p>
                ) : (
                    <ul className="space-y-4">
                        {[...pkg.event_history]
                            .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
                            .map((event, index) => (
                                <li key={index} className="border-b pb-2 last:border-b-0 border-gray-200">
                                    <p className="font-medium text-gray-800">{event.status.replace(/_/g, ' ')}</p>
                                    <p className="text-gray-600 text-sm">Reported: {new Date(event.timestamp).toLocaleString()}</p>
                                    {event.lat !== undefined && event.lon !== undefined && (
                                        <p className="text-gray-600 text-sm">Location: {event.lat.toFixed(4)}, {event.lon.toFixed(4)}</p>
                                    )}
                                    {event.note && (
                                        <p className="text-gray-700 text-sm italic">Note: "{event.note}"</p>
                                    )}
                                </li>
                            ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default PackageDetails;