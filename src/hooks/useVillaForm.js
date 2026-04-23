import { useState } from 'react';
import { villaService } from '../services/villaService';

/**
 * Custom Hook: useVillaForm
 * Handles the state and logic for creating/editing a villa.
 */
export const useVillaForm = (onSuccess) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [editId, setEditId] = useState(null);
    
    const defaultImage = 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&q=80&w=1000';

    const [formData, setFormData] = useState({
        name: '',
        location: '',
        description: '',
        price_per_year: '',
        max_guests: '',
        status: 'available', // Pilihan yang valid: 'available', 'fullbooked', 'partially_booked'
        image_url: defaultImage
    });

    const resetForm = () => {
        setEditId(null);
        setFormData({
            name: '',
            location: '',
            description: '',
            price_per_year: '',
            max_guests: '',
            status: 'available',
            image_url: defaultImage
        });
    };

    // Tambahkan parameter data villa opsional untuk mode edit instan
    const openModal = async (villaData = null) => {
        setIsModalOpen(true);
        
        if (villaData) {
            // Jika yang dikirim adalah ID (string/number), tetap fetch API (fallback)
            if (typeof villaData === 'string' || typeof villaData === 'number') {
                try {
                    setIsSubmitting(true);
                    const response = await villaService.getVillaById(villaData);
                    const villa = response.data || response;
                    setEditId(villaData);
                    setFormData({
                        name: villa.name || '',
                        location: villa.location || '',
                        description: villa.description || '',
                        price_per_year: villa.price_per_year ? Number(villa.price_per_year).toLocaleString('id-ID') : '',
                        max_guests: villa.max_guests || '',
                        status: villa.status || 'available',
                        image_url: villa.images?.[0]?.image_url || defaultImage
                    });
                } catch (error) {
                    console.error('Failed to fetch villa details:', error);
                    setIsModalOpen(false);
                } finally {
                    setIsSubmitting(false);
                }
            } 
            // Jika yang dikirim adalah object villa lengkap, langsung isi form (No Delay)
            else {
                setEditId(villaData.id);
                setFormData({
                    name: villaData.name || '',
                    location: villaData.location || '',
                    description: villaData.description || '',
                    price_per_year: villaData.price_per_year ? Number(villaData.price_per_year).toLocaleString('id-ID') : '',
                    max_guests: villaData.max_guests || '',
                    status: villaData.status || 'available',
                    image_url: villaData.images?.[0]?.image_url || defaultImage
                });
            }
        } else {
            resetForm();
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        resetForm();
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        
        if (name === 'price_per_year') {
            // Hanya izinkan angka, lalu format dengan titik
            const rawValue = value.replace(/\D/g, '');
            const formattedValue = rawValue.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
            
            setFormData(prev => ({
                ...prev,
                [name]: formattedValue
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleSubmit = async (e) => {
        if (e) e.preventDefault();
        
        try {
            setIsSubmitting(true);
            
            const payload = {
                ...formData,
                // Hapus titik sebelum dikirim ke database agar terbaca sebagai angka
                price_per_year: parseFloat(formData.price_per_year.toString().replace(/\./g, '')),
                max_guests: parseInt(formData.max_guests)
            };

            let response;
            // Cek jika editId ada, maka panggil API update. Jika tidak, API create.
            if (editId) {
                response = await villaService.updateVilla(editId, payload);
            } else {
                response = await villaService.createVilla(payload);
            }
            
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
        editId,
        openModal,
        closeModal,
        handleChange,
        handleSubmit,
        setFormData
    };};