import { PackageStatus, type IPackage } from '@/interfaces/package';
import React, { useState } from 'react';

interface PackageListProps {
    packages: IPackage[];
    onPackageSelect: (pkg: IPackage) => void;
}

const PackageList: React.FC<PackageListProps> = ({ packages, onPackageSelect }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState<string>('ALL_ACTIVE');

    const activeStatuses = Object.values(PackageStatus).filter(
        status => status !== PackageStatus.DELIVERED && status !== PackageStatus.CANCELLED
    );

    const filteredPackages = packages.filter(pkg => {
        const matchesSearch = pkg.package_id.toLowerCase().includes(searchTerm.toLowerCase());
        
        let matchesStatus = true;
        if (filterStatus !== 'ALL_ACTIVE') {
            matchesStatus = pkg.current_status === filterStatus;
        }

        return matchesSearch && matchesStatus;
    });

    const calculateTimeSinceLastUpdate = (lastUpdatedIso: string): string => {
        const now = new Date();
        const updatedDate = new Date(lastUpdatedIso);
        const diffMs = now.getTime() - updatedDate.getTime();

        const minutes = Math.floor(diffMs / (1000 * 60));
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        if (minutes < 1) return 'Just now';
        if (minutes < 60) return `${minutes}m ago`;
        if (hours < 24) return `${hours}h ${minutes % 60}m ago`;
        return `${days}d ago`;
    };

    return (
        <div className="p-4 bg-gray-100 min-h-screen">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Active Packages</h2>
            <div className="flex flex-col sm:flex-row gap-4 mb-4">
                <input
                    type="text"
                    placeholder="Search by Package ID..."
                    className="p-2 border border-gray-300 rounded shadow-sm flex-grow focus:ring-blue-500 focus:border-blue-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <select
                    className="p-2 border border-gray-300 rounded shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                >
                    <option value="ALL_ACTIVE">All Active</option>
                    {activeStatuses.map(status => (
                        <option key={status} value={status}>{status.replace(/_/g, ' ')}</option>
                    ))}
                </select>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredPackages.length === 0 ? (
                    <p className="col-span-full text-center text-gray-600 p-4 bg-white rounded-lg shadow">
                        No active packages match your criteria.
                    </p>
                ) : (
                    filteredPackages.map((pkg) => (
                        <div
                            key={pkg._id}
                            className={`bg-white p-4 rounded-lg shadow cursor-pointer transition-all duration-200 ease-in-out hover:shadow-md
                                ${pkg.is_stuck_alert_triggered ? 'border-l-4 border-red-500 bg-red-50' : 'border-l-4 border-blue-400'}`}
                            onClick={() => onPackageSelect(pkg)}
                        >
                            <h3 className="text-xl font-semibold mb-2">{pkg.package_id}</h3>
                            <p className="text-gray-700">Status: <span className="font-medium">{pkg.current_status.replace(/_/g, ' ')}</span></p>
                            <p className="text-gray-600 text-sm">Last Update: {calculateTimeSinceLastUpdate(pkg.last_updated)}</p>
                            {pkg.current_lat !== undefined && pkg.current_lon !== undefined && (
                                <p className="text-gray-600 text-sm">Location: {pkg.current_lat.toFixed(4)}, {pkg.current_lon.toFixed(4)}</p>
                            )}
                            <p className="text-gray-600 text-sm">ETA: {pkg.eta ? new Date(pkg.eta).toLocaleString() : '—'}</p>
                            {pkg.is_stuck_alert_triggered && (
                                <p className="text-red-600 font-semibold mt-2">STUCK! Check alerts.</p>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default PackageList;