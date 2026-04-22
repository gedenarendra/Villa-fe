import { publicApi, api } from './api';

/**
 * Villa Service (Data Layer)
 * Handles all communication with the backend regarding Villa entities.
 * CONSISTENCY: All methods return the unwrapped 'data' field from the API response.
 */

export const villaService = {
    // Get all villas for the public catalog
    getVillas: async () => {
        try {
            const response = await publicApi.get(`/villas?t=${new Date().getTime()}`);
            return response.data; // Array of villas
        } catch (error) {
            console.error('Failed to fetch villas:', error);
            throw error;
        }
    },

    // Get a single villa detail
    getVillaById: async (id) => {
        try {
            const response = await publicApi.get(`/villas/${id}`);
            return response.data; // Villa object
        } catch (error) {
            console.error(`Failed to fetch villa ${id}:`, error);
            throw error;
        }
    },

    // Admin: Create new villa
    createVilla: async (villaData) => {
        try {
            const response = await api.post('/villas', villaData);
            return response.data; // Created villa object
        } catch (error) {
            console.error('Failed to create villa:', error);
            throw error;
        }
    },

    // Admin: Update villa
    updateVilla: async (id, villaData) => {
        try {
            // UBAH DARI api.put MENJADI api.patch
            const response = await api.patch(`/villas/${id}`, villaData);
            return response.data; // Updated villa object
        } catch (error) {
            console.error(`Failed to update villa ${id}:`, error);
            throw error;
        }
    },

    // Admin: Delete villa
    deleteVilla: async (id) => {
        try {
            const response = await api.delete(`/villas/${id}`);
            return response.data; // Success message
        } catch (error) {
            console.error(`Failed to delete villa ${id}:`, error);
            throw error;
        }
    },

    // Get availability for a villa
    getAvailability: async (id) => {
        try {
            const response = await publicApi.get(`/villas/${id}/availability`);
            return response.data; // Array of bookings
        } catch (error) {
            console.error(`Failed to fetch availability for villa ${id}:`, error);
            throw error;
        }
    },

    // Admin: Block dates
    blockDates: async (blockData) => {
        try {
            const response = await api.post('/bookings/block', blockData);
            return response.data; // Created booking object
        } catch (error) {
            console.error('Failed to block dates:', error);
            throw error;
        }
    },

    // Admin: Get all bookings
    getBookings: async () => {
        try {
            const response = await api.get('/bookings');
            return response.data; // Array of bookings
        } catch (error) {
            console.error('Failed to fetch bookings:', error);
            throw error;
        }
    },
    
    // Admin: Hard Reset Data
    hardReset: async () => {
        try {
            const response = await api.post('/system/hard-reset');
            return response.data;
        } catch (error) {
            console.error('Failed to perform hard reset:', error);
            throw error;
        }
    }
};
