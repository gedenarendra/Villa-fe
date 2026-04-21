import { useState, useEffect, useCallback } from 'react';
import { villaService } from '../services/villaService';
import { villaUtils } from '../utils/villaUtils';

/**
 * Custom Hook: useVillaDetail
 * Manages state and logic for individual villa details.
 */
export const useVillaDetail = (id) => {
    const [villa, setVilla] = useState(null);
    const [availability, setAvailability] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [validationError, setValidationError] = useState(null);

    // Booking selection state
    const [startYear, setStartYear] = useState(new Date().getFullYear());
    const [endYear, setEndYear] = useState(new Date().getFullYear());

    const fetchData = useCallback(async () => {
        if (!id) return;
        
        try {
            setLoading(true);
            setError(null);
            
            const [villaData, availData] = await Promise.all([
                villaService.getVillaById(id),
                villaService.getAvailability(id).catch(() => [])
            ]);
            
            const actualVilla = villaData;
            const actualAvail = availData;

            if (actualVilla) {
                setVilla(actualVilla);
            } else {
                setError("Data villa tidak ditemukan");
            }

            if (actualAvail) {
                setAvailability(actualAvail);
                
                // Business Logic: Find first available year via Utils
                const firstAvailable = villaUtils.findFirstAvailableYear(actualAvail);
                setStartYear(firstAvailable);
                setEndYear(firstAvailable);
            }
        } catch (err) {
            setError("Gagal memuat detail villa");
            console.error('Hook Error [useVillaDetail]:', err);
        } finally {
            setLoading(false);
        }
    }, [id]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleWhatsAppBooking = useCallback(() => {
        if (!villa) return;
        
        const validation = villaUtils.validateLeaseDuration(startYear, endYear);
        if (!validation.valid) {
            setValidationError(validation.message);
            return false;
        }

        const message = villaUtils.generateWhatsAppMessage(villa.name, startYear, endYear);
        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/6281234567890?text=${encodedMessage}`;
        window.open(whatsappUrl, '_blank');
        return true;
    }, [villa, startYear, endYear]);

    const setStartYearSafe = useCallback((year) => {
        setStartYear(year);
        if (endYear < year) setEndYear(year);
        if (validationError) setValidationError(null);
    }, [endYear, validationError]);

    return {
        villa,
        availability,
        loading,
        error,
        validationError,
        setValidationError,
        startYear,
        endYear,
        setStartYear: setStartYearSafe,
        setEndYear,
        handleWhatsAppBooking,
        refresh: fetchData
    };
};
