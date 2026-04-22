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
    
    // Edit state
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState(null);

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

    const resetForm = () => {
        setSelectedVilla('');
        setStartYear(new Date().getFullYear());
        setEndYear(new Date().getFullYear());
        setNote('');
        setIsEditing(false);
        setEditId(null);
    };

    const handleEdit = (booking) => {
        setIsEditing(true);
        setEditId(booking.id);
        setSelectedVilla(booking.villa_id);
        setStartYear(new Date(booking.start_date).getFullYear());
        setEndYear(new Date(booking.end_date).getFullYear());
        setNote(booking.note || '');
        // Scroll to form or just let user see it
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Apakah Anda yakin ingin menghapus blokir kalender ini?')) return;

        try {
            setSubmitting(true);
            await villaService.deleteBooking(id);
            setMessage({ type: 'success', text: 'Blokir kalender berhasil dihapus!' });
            await fetchData();
        } catch (err) {
            setMessage({ 
                type: 'error', 
                text: err.response?.data?.message || 'Gagal menghapus blokir.' 
            });
        } finally {
            setSubmitting(false);
        }
    };

    const handleBlock = async (e) => {
        if (e) e.preventDefault();
        if (!selectedVilla || !startYear || !endYear) return;

        try {
            setSubmitting(true);
            setMessage(null);
            
            const payload = {
                villa_id: selectedVilla,
                start_year: startYear,
                end_year: endYear,
                note: note
            };

            if (isEditing) {
                await villaService.updateBooking(editId, payload);
                setMessage({ type: 'success', text: 'Rentang tahun berhasil diperbarui!' });
            } else {
                await villaService.blockDates(payload);
                setMessage({ type: 'success', text: 'Rentang tahun berhasil diblokir!' });
            }
            
            resetForm();
            await fetchData(); // Refresh list
            return true;
        } catch (err) {
            setMessage({ 
                type: 'error', 
                text: err.response?.data?.message || 'Gagal menyimpan perubahan.' 
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
        handleEdit,
        handleDelete,
        isEditing,
        resetForm,
        refresh: fetchData
    };
};
