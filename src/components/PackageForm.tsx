import React, { useState } from 'react';
import { PackageStatus } from '../interfaces/package';

interface PackageFormProps {
    onSubmit: (payload: { package_id?: string; status: PackageStatus; lat?: number; lon?: number; timestamp: string; note?: string }) => Promise<void>;
    loading: boolean;
    error: string | null;
    success: string | null;
}

const PackageForm: React.FC<PackageFormProps> = ({ onSubmit, loading, error, success }) => {
    const [packageId, setPackageId] = useState('');
    const [status, setStatus] = useState<PackageStatus>(PackageStatus.CREATED);
    const [lat, setLat] = useState<number | ''>('');
    const [lon, setLon] = useState<number | ''>('');
    const [note, setNote] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        const timestamp = new Date().toISOString(); 
        
        await onSubmit({
            package_id: packageId.trim() || undefined,
            status,
            lat: lat === '' ? undefined : Number(lat),
            lon: lon === '' ? undefined : Number(lon),
            timestamp,
            note: note.trim() || undefined,
        });
    };

    return (
        <div className="p-4 bg-white rounded-lg shadow mb-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Simulate Courier Update</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="packageId" className="block text-gray-700 font-medium">Package ID (Optional for new, required for existing):</label>
                    <input
                        type="text"
                        id="packageId"
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        value={packageId}
                        onChange={(e) => setPackageId(e.target.value)}
                        placeholder="Leave empty for new package, or enter existing ID"
                        disabled={loading}
                    />
                </div>
                <div>
                    <label htmlFor="status" className="block text-gray-700 font-medium">Status:</label>
                    <select
                        id="status"
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        value={status}
                        onChange={(e) => setStatus(e.target.value as PackageStatus)}
                        required
                        disabled={loading}
                    >
                        {Object.values(PackageStatus).map((s) => (
                            <option key={s} value={s}>{s.replace(/_/g, ' ')}</option>
                        ))}
                    </select>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="lat" className="block text-gray-700 font-medium">Latitude (Optional):</label>
                        <input
                            type="number"
                            step="0.0001"
                            id="lat"
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            value={lat}
                            onChange={(e) => setLat(e.target.value === '' ? '' : Number(e.target.value))}
                            placeholder="e.g., 23.8103"
                            disabled={loading}
                        />
                    </div>
                    <div>
                        <label htmlFor="lon" className="block text-gray-700 font-medium">Longitude (Optional):</label>
                        <input
                            type="number"
                            step="0.0001"
                            id="lon"
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            value={lon}
                            onChange={(e) => setLon(e.target.value === '' ? '' : Number(e.target.value))}
                            placeholder="e.g., 90.4125"
                            disabled={loading}
                        />
                    </div>
                </div>
                <div>
                    <label htmlFor="note" className="block text-gray-700 font-medium">Note (Optional):</label>
                    <textarea
                        id="note"
                        rows={2}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        placeholder="e.g., Left at front desk"
                        disabled={loading}
                    />
                </div>
                <button
                    type="submit"
                    className="w-full px-4 py-2 bg-green-600 text-white font-semibold rounded-md shadow hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50"
                    disabled={loading}
                >
                    {loading ? 'Submitting...' : 'Submit Update'}
                </button>
                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                {success && <p className="text-green-500 text-sm mt-2">{success}</p>}
            </form>
        </div>
    );
};

export default PackageForm;