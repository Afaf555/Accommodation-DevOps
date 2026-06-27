import axios from 'axios';

const baseURL =
    import.meta.env.MODE === 'development'
        ? 'http://localhost:8081/api'
        : 'http://backend.local:8080/api';

const axiosInstance = axios.create({
    baseURL,
    headers: { 'Content-Type': 'application/json' }
});
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        console.log("AUTH HEADER:", config.headers.Authorization);
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        const status = error.response?.status;
        if ((status === 401 || status === 403) && localStorage.getItem('token')) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;