import { getPackageById } from '@/api/packageApi';
import type { Package } from '@/Types/package';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';


const PackageDetails = () => {
  const { packageId } = useParams<{ packageId: string }>();
  const [pkg, setPkg] = useState<Package | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!packageId) return;

    const fetchData = async () => {
      try {
        const data = await getPackageById(packageId);
        setPkg(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [packageId]);

  if (loading) return <p className="text-center text-blue-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!pkg) return <p className="text-center">No package found</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">📦 Package Details</h1>
      <div className="border p-4 rounded shadow bg-white">
        <p><strong>Package ID:</strong> {pkg.package_id}</p>
        <p><strong>Status:</strong> {pkg.current_status}</p>
        <p><strong>Current Location:</strong> {pkg.current_lat}, {pkg.current_lon}</p>
        <p><strong>Last Updated:</strong> {new Date(pkg.last_updated).toLocaleString()}</p>
        <p><strong>Received At:</strong> {new Date(pkg.received_at).toLocaleString()}</p>

        <div className="mt-4">
          <h2 className="text-lg font-semibold mb-2">📚 Event History</h2>
          <ul className="list-disc list-inside space-y-1">
            {pkg.event_history.map((event, idx) => (
              <li key={idx}>
                <strong>{event.status}</strong> at ({event.lat}, {event.lon}) on{' '}
                {new Date(event.event_timestamp).toLocaleString()}
                {event.note && <span> – "{event.note}"</span>}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PackageDetails;
