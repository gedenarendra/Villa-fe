import { useState } from 'react';
import { villaService } from '../services/villaService';

/**
 * Custom Hook: useVillaForm
 * Handles the state and logic for creating/editing a villa.
 */
export const useVillaForm = (onSuccess) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        location: '',
        description: '',
        price_per_year: '',
        max_guests: '',
        status: 'available', // Pilihan yang valid: 'available', 'fullbooked', 'partially_booked'
        image_url: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&q=80&w=1000'
    });

    const resetForm = () => {
        setFormData({
            name: '',
            location: '',
            description: '',
            price_per_year: '',
            max_guests: '',
            status: 'available',
            image_url: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&q=80&w=1000'
        });
    };

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => {
        setIsModalOpen(false);
        resetForm();
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        if (e) e.preventDefault();
        
        try {
            setIsSubmitting(true);
            const response = await villaService.createVilla({
                ...formData,
                price_per_year: parseFloat(formData.price_per_year),
                max_guests: parseInt(formData.max_guests)
            });
            
            closeModal();
            if (onSuccess) onSuccess();
            return { success: true, data: response };
        } catch (err) {
            console.error('Form Submission Error:', err);
            return { success: false, error: err };
        } finally {
            setIsSubmitting(false);
        }
    };

    return {
        isModalOpen,
        isSubmitting,
        formData,
        openModal,
        closeModal,
        handleChange,
        handleSubmit,
        setFormData
    };
};
