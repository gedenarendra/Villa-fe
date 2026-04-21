import { useState, useEffect, useCallback } from 'react';
import { villaService } from '../services/villaService';

/**
 * Custom Hook: useVillas
 * Separates business logic (fetching, state management) from UI components.
 */
export const useVillas = () => {
    const [villas, setVillas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchVillas = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await villaService.getVillas();
            
            // Centralized data formatting logic
            const villaData = data && data.data ? data.data : (Array.isArray(data) ? data : []);
            setVillas(villaData);
        } catch (err) {
            setError('Failed to load properties. Please check your connection.');
            console.error('Hook Error [useVillas]:', err);
        } finally {
            setLoading(false);
        }
    }, []);

    // Initial fetch on mount
    useEffect(() => {
        fetchVillas();
    }, [fetchVillas]);

    return {
        villas,
        loading,
        error,
        refresh: fetchVillas
    };
};
