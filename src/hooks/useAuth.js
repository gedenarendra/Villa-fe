import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';

/**
 * Custom Hook: useAuth
 * Handles all authentication logic: login, logout, and session management.
 */
export const useAuth = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const login = useCallback(async (e) => {
        if (e) e.preventDefault();
        setError(null);
        
        // Basic validation
        if (!email || !password) {
            setError('Please enter both email and password.');
            return false;
        }

        setLoading(true);
        
        try {
            // Real API Call via Service
            const data = await authService.login(email, password);
            localStorage.setItem('token', data.token);
            navigate('/admin/dashboard');
            return true;
        } catch (err) {
            // Mock Login for development if backend is not ready
            // if (email === 'admin@nara.com' && password === 'admin123') {
            //     console.warn('Using mock authentication for development');
            //     localStorage.setItem('token', 'fake-jwt-token');
            //     navigate('/admin/dashboard');
            //     return true;
            // }
            
            // Mask internal server errors (like missing tables) with a friendly message
            setError('Invalid credentials. Please try again.');
            return false;
        } finally {
            setLoading(false);
        }
    }, [email, password, navigate]);

    const logout = useCallback(() => {
        localStorage.removeItem('token');
        navigate('/login');
    }, [navigate]);

    return {
        email,
        setEmail,
        password,
        setPassword,
        login,
        logout,
        loading,
        error,
        setError,
        isAuthenticated: !!localStorage.getItem('token')
    };
};
