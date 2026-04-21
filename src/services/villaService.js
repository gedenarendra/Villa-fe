import { publicApi, api } from './api';

/**
 * Villa Service (Data Layer)
 * Handles all communication with the backend regarding Villa entities.
 */

export const villaService = {
    // Get all villas for the public catalog
    getVillas: async () => {
        try {
            // bypass browser cache by appending timestamp
            return await publicApi.get(`/villas?t=${new Date().getTime()}`);
        } catch (error) {
            console.error('Failed to fetch villas:', error);
            throw error;
        }
    },

    // Get a single villa detail
    getVillaById: async (id) => {
        try {
            return await publicApi.get(`/villas/${id}`);
        } catch (error) {
            console.error(`Failed to fetch villa ${id}:`, error);
            throw error;
        }
    },

    // Admin: Create new villa
    createVilla: async (villaData) => {
        try {
            return await api.post('/villas', villaData);
        } catch (error) {
            console.error('Failed to create villa:', error);
            throw error;
        }
    },

    // Admin: Update villa
    updateVilla: async (id, villaData) => {
        try {
            return await api.put(`/villas/${id}`, villaData);
        } catch (error) {
            console.error(`Failed to update villa ${id}:`, error);
            throw error;
        }
    },

    // Admin: Delete villa
    deleteVilla: async (id) => {
        try {
            return await api.delete(`/villas/${id}`);
        } catch (error) {
            console.error(`Failed to delete villa ${id}:`, error);
            throw error;
        }
    },

    // Get availability for a villa
    getAvailability: async (id) => {
        try {
            return await publicApi.get(`/villas/${id}/availability`);
        } catch (error) {
            console.error(`Failed to fetch availability for villa ${id}:`, error);
            throw error;
        }
    },

    // Admin: Block dates
    blockDates: async (blockData) => {
        try {
            return await api.post('/bookings/block', blockData);
        } catch (error) {
            console.error('Failed to block dates:', error);
            throw error;
        }
    },

    // Admin: Get all bookings
    getBookings: async () => {
        try {
            return await api.get('/bookings');
        } catch (error) {
            console.error('Failed to fetch bookings:', error);
            throw error;
        }
    }
};
