import { useState, useEffect, useCallback } from 'react';
import { villaService } from '../services/villaService';

/**
 * Custom Hook: useCalendar
 * Manages calendar blocking logic and booking data.
 */
export const useCalendar = () => {
    const [villas, setVillas] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [message, setMessage] = useState(null);

    // Form state
    const [selectedVilla, setSelectedVilla] = useState('');
    const [startYear, setStartYear] = useState(new Date().getFullYear());
    const [endYear, setEndYear] = useState(new Date().getFullYear());
    const [note, setNote] = useState('');

    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            const [villaData, bookingData] = await Promise.all([
                villaService.getVillas(),
                villaService.getBookings()
            ]);
            
            setVillas(villaData || []);
            setBookings(bookingData || []);
        } catch (err) {
            console.error('Hook Error [useCalendar]:', err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleBlock = async (e) => {
        if (e) e.preventDefault();
        if (!selectedVilla || !startYear || !endYear) return;

        try {
            setSubmitting(true);
            setMessage(null);
            
            await villaService.blockDates({
                villa_id: selectedVilla,
                start_year: startYear,
                end_year: endYear,
                note: note
            });
            
            setMessage({ type: 'success', text: 'Rentang tahun berhasil diblokir!' });
            setNote('');
            await fetchData(); // Refresh list
            return true;
        } catch (err) {
            setMessage({ 
                type: 'error', 
                text: err.response?.data?.message || 'Gagal memblokir rentang tahun.' 
            });
            return false;
        } finally {
            setSubmitting(false);
        }
    };

    const setStartYearSafe = useCallback((year) => {
        setStartYear(year);
        if (endYear < year) setEndYear(year);
    }, [endYear]);

    return {
        villas,
        bookings,
        loading,
        submitting,
        message,
        selectedVilla,
        setSelectedVilla,
        startYear,
        setStartYear: setStartYearSafe,
        endYear,
        setEndYear,
        note,
        setNote,
        handleBlock,
        refresh: fetchData
    };
};
