import type { IAlert, IPackage } from '@/interfaces/package';
import { useState, useEffect, useCallback, useRef } from 'react';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

export const usePackages = () => {
    const [packages, setPackages] = useState<IPackage[]>([]);
    const [alerts, setAlerts] = useState<IAlert[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const isActiveRef = useRef(true);

    const fetchPackages = useCallback(async () => {
        if (!isActiveRef.current) return;
        
        try {
            const response = await fetch(`${API_BASE_URL}/packages`, {
                headers: {
                    'Content-Type': 'application/json',
                    'X-API-Key': API_KEY,
                },
            });
            
            if (!response.ok) {
                const errData = await response.json();
                throw new Error(errData.message || `HTTP error! status: ${response.status}`);
            }
            
            const data: IPackage[] = await response.json();
            
            if (isActiveRef.current) {
                setPackages(data);
                setError(null);
            }
        } catch (err: any) {
            console.error('Failed to fetch packages:', err);
            if (isActiveRef.current) {
                setError(`Failed to load packages: ${err.message}`);
            }
        } finally {
            if (isActiveRef.current) {
                setLoading(false);
            }
        }
    }, []);

    const fetchAlerts = useCallback(async () => {
        if (!isActiveRef.current) return;
        
        try {
            const response = await fetch(`${API_BASE_URL}/alerts`, {
                headers: {
                    'Content-Type': 'application/json',
                    'X-API-Key': API_KEY,
                },
            });
            
            if (response.ok) {
                const data: IAlert[] = await response.json();
                if (isActiveRef.current) {
                    setAlerts(data);
                }
            }
        } catch (err: any) {
            console.error('Failed to fetch alerts:', err);
        }
    }, []);

    const refreshData = useCallback(async () => {
        await Promise.all([fetchPackages(), fetchAlerts()]);
    }, [fetchPackages, fetchAlerts]);

    useEffect(() => {
        isActiveRef.current = true;
        
        // Initial data fetch
        refreshData();

        // Set up polling interval (refresh every 10 seconds)
        intervalRef.current = setInterval(() => {
            if (isActiveRef.current) {
                refreshData();
            }
        }, 10000);

        // Also refresh when window regains focus
        const handleFocus = () => {
            if (isActiveRef.current) {
                refreshData();
            }
        };

        window.addEventListener('focus', handleFocus);

        return () => {
            isActiveRef.current = false;
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
            window.removeEventListener('focus', handleFocus);
        };
    }, [refreshData]);

    // Force refresh function for manual updates
    const forceRefresh = useCallback(() => {
        setLoading(true);
        refreshData();
    }, [refreshData]);

    return { 
        packages, 
        alerts, 
        loading, 
        error, 
        fetchPackages,
        forceRefresh
    };
};