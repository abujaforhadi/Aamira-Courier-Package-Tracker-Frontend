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
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Aamira Package Tracker</h2>
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
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

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white rounded-lg shadow overflow-hidden">
                    <thead className="bg-blue-100 text-left text-sm font-semibold text-gray-700">
                        <tr>
                            <th className="px-4 py-3">#</th>
                            <th className="px-4 py-3">Package ID</th>
                            <th className="px-4 py-3">Status</th>
                            <th className="px-4 py-3">Last Seen</th>
                            <th className="px-4 py-3">Location</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredPackages.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="text-center text-gray-500 py-6">
                                    No active packages match your criteria.
                                </td>
                            </tr>
                        ) : (
                            filteredPackages.map((pkg, index) => (
                                <tr
                                    key={pkg._id}
                                    onClick={() => onPackageSelect(pkg)}
                                    className={`cursor-pointer text-sm transition hover:bg-gray-50 ${
                                        pkg.is_stuck_alert_triggered ? 'bg-red-50 border-l-4 border-red-500' : ''
                                    }`}
                                >
                                    <td className="px-4 py-3">{index + 1}</td>
                                    <td className="px-4 py-3 font-medium text-blue-600">{pkg.package_id}</td>
                                    <td className="px-4 py-3">
                                        {pkg.current_status.replace(/_/g, ' ')}
                                        {pkg.is_stuck_alert_triggered && (
                                            <span className="ml-2 inline-block px-2 py-0.5 text-xs font-semibold text-red-700 bg-red-100 rounded">
                                                STUCK!
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-4 py-3">{calculateTimeSinceLastUpdate(pkg.last_updated)}</td>
                                    <td className="px-4 py-3">
                                        {pkg.current_lat !== undefined && pkg.current_lon !== undefined
                                            ? `${pkg.current_lat.toFixed(2)}, ${pkg.current_lon.toFixed(2)}`
                                            : '—'}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PackageList;
