import { useState } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { villaService } from '../services/villaService';

const MySwal = withReactContent(Swal);

/**
 * useSettings Hook
 * Decouples system settings logic from the UI.
 */
export const useSettings = () => {
    const [isResetting, setIsResetting] = useState(false);

    const handleHardReset = async () => {
        const result = await MySwal.fire({
            title: 'Apakah Anda Yakin?',
            text: "Seluruh data catalog, villa, dan booking akan dihapus permanen. Tindakan ini tidak dapat dibatalkan!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Ya, Hapus Semua!',
            cancelButtonText: 'Batal',
            background: '#1a1a1a',
            color: '#ffffff',
            customClass: {
                popup: 'rounded-3xl border border-white/10 shadow-2xl',
                confirmButton: 'rounded-xl px-6 py-3 font-bold',
                cancelButton: 'rounded-xl px-6 py-3 font-bold'
            }
        });

        if (result.isConfirmed) {
            try {
                setIsResetting(true);
                await villaService.hardReset();
                
                await MySwal.fire({
                    title: 'Berhasil!',
                    text: 'Seluruh data telah dihapus total.',
                    icon: 'success',
                    background: '#1a1a1a',
                    color: '#ffffff',
                    confirmButtonColor: '#C5A35C',
                });
                return true;
            } catch (error) {
                MySwal.fire({
                    title: 'Gagal!',
                    text: error.response?.data?.message || 'Terjadi kesalahan saat mereset data.',
                    icon: 'error',
                    background: '#1a1a1a',
                    color: '#ffffff',
                });
                return false;
            } finally {
                setIsResetting(false);
            }
        }
        return false;
    };

    return {
        isResetting,
        handleHardReset
    };
};
