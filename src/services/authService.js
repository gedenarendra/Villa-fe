import { publicApi } from './api';

/**
 * Service: authService
 * Handles all authentication-related API calls.
 */
export const authService = {
    login: async (email, password) => {
        try {
            const response = await publicApi.post('/login', { email, password });
            return response; // Usually contains { token, user }
        } catch (error) {
            console.error('Auth Service Error [login]:', error);
            throw error;
        }
    },
    
    logout: async () => {
        // Optional: Call logout endpoint if exists
        // await api.post('/logout');
        localStorage.removeItem('token');
    }
};
