import { useState } from 'react';
import { usePackages } from './hooks/usePackages';
import PackageList from './components/PackageList';
import PackageForm from './components/PackageForm';
import PackageDetails from './components/PackageDetails';
import AlertDisplay from './components/AlertDisplay';

import './index.css'; 
import type { IPackage, PackageStatus } from './interfaces/package';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
// const API_KEY = import.meta.env.VITE_API_KEY;

function App() {
    const { packages, alerts, loading, error, forceRefresh } = usePackages();
    
    const [selectedPackage, setSelectedPackage] = useState<IPackage | null>(null);

    const [formLoading, setFormLoading] = useState(false);
    const [formError, setFormError] = useState<string | null>(null);
    const [formSuccess, setFormSuccess] = useState<string | null>(null);

    const handleFormSubmit = async (payload: { 
        package_id?: string; 
        status: PackageStatus; 
        lat?: number; 
        lon?: number; 
        timestamp: string; 
        note?: string 
    }) => {
        setFormLoading(true);
        setFormError(null);
        setFormSuccess(null);
        try {
            const response = await fetch(`${API_BASE_URL}/packages/new`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // 'X-API-Key': API_KEY,
                },
                body: JSON.stringify(payload),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to submit package update.');
            }

            setFormSuccess(data.message || 'Package update submitted successfully!');
            if (payload.package_id === undefined && data.package_id) {
                setFormSuccess(`New Package created: ${data.package_id}`);
            }

            // Force refresh data after successful submission
            setTimeout(() => {
                forceRefresh();
            }, 1000);

        } catch (err) {
            if (err instanceof Error) {
                console.error('Submission error:', err);
                setFormError(`Submission failed: ${err.message}`);
            }
        } finally {
            setFormLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6 shadow-lg">
                <h1 className="text-4xl font-extrabold text-center tracking-tight">Aamira Package Tracker</h1>
                <p className="text-center text-blue-200 mt-2">Real-time Courier Management Dashboard</p>
                <div className="text-center mt-4">
                    <button 
                        onClick={forceRefresh}
                        className="bg-blue-500 hover:bg-blue-400 px-4 py-2 rounded-lg transition-colors"
                        disabled={loading}
                    >
                        {loading ? 'Refreshing...' : 'Refresh Data'}
                    </button>
                </div>
            </header>

            <main className="container mx-auto p-6">
                <AlertDisplay alerts={alerts} />

                {selectedPackage ? (
                    <PackageDetails package={selectedPackage} onBack={() => setSelectedPackage(null)} />
                ) : (
                    <>
                        <PackageForm
                            onSubmit={handleFormSubmit}
                            loading={formLoading}
                            error={formError}
                            success={formSuccess}
                        />

                        {loading && <p className="text-center text-blue-600 text-lg mt-8">Loading packages...</p>}
                        {error && <p className="text-center text-red-600 text-lg mt-8">Error: {error}</p>}
                        
                        {!loading && !error && (
                            <PackageList packages={packages} onPackageSelect={setSelectedPackage} />
                        )}
                    </>
                )}
            </main>
        </div>
    );
}

export default App;