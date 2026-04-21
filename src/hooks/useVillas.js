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
            setVillas(data || []);
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

    const deleteVilla = useCallback(async (id) => {
        try {
            setLoading(true);
            await villaService.deleteVilla(id);
            await fetchVillas();
            return { success: true };
        } catch (err) {
            setError('Failed to delete villa.');
            console.error('Hook Error [useVillas - delete]:', err);
            return { success: false, error: err };
        } finally {
            setLoading(false);
        }
    }, [fetchVillas]);

    return {
        villas,
        loading,
        error,
        refresh: fetchVillas,
        deleteVilla
    };
};
