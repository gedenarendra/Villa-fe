

const BASE_URL = import.meta.env.VITE_API_URL;

export const fetchApi = async (endpoint, options = {}) => {
    const { requireAuth = true, ...fetchOptions } = options;
    const token = requireAuth ? localStorage.getItem('token') : null;
    
    const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        ...options.headers,
    };

    if (requireAuth && token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    try {
        const response = await fetch(`${BASE_URL}${endpoint}`, {
            ...fetchOptions,
            headers,
        });

        let data = null;
        const contentType = response.headers.get('content-type');
        
        if (contentType && contentType.includes('application/json')) {
            try {
                data = await response.json();
            } catch (e) {
                console.error('Failed to parse JSON:', e);
            }
        }

        if (!response.ok) {
            throw { status: response.status, data: data || { message: response.statusText } };
        }

        return data;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
};

// API yang BUTUH token (Authenticated)
export const api = {
    get: (endpoint, options = {}) => 
        fetchApi(endpoint, { ...options, method: 'GET', requireAuth: true }),
    
    post: (endpoint, data, options = {}) => 
        fetchApi(endpoint, { ...options, method: 'POST', body: JSON.stringify(data), requireAuth: true }),
    
    put: (endpoint, data, options = {}) => 
        fetchApi(endpoint, { ...options, method: 'PUT', body: JSON.stringify(data), requireAuth: true }),
    
    delete: (endpoint, options = {}) => 
        fetchApi(endpoint, { ...options, method: 'DELETE', requireAuth: true }),
};

// API yang TIDAK butuh token (Public)
export const publicApi = {
    get: (endpoint, options = {}) => 
        fetchApi(endpoint, { ...options, method: 'GET', requireAuth: false }),
    
    post: (endpoint, data, options = {}) => 
        fetchApi(endpoint, { ...options, method: 'POST', body: JSON.stringify(data), requireAuth: false }),
    
    put: (endpoint, data, options = {}) => 
        fetchApi(endpoint, { ...options, method: 'PUT', body: JSON.stringify(data), requireAuth: false }),
    
    delete: (endpoint, options = {}) => 
        fetchApi(endpoint, { ...options, method: 'DELETE', requireAuth: false }),
};

