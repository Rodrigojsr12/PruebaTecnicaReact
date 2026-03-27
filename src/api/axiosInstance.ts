import axios from 'axios';
import toast from 'react-hot-toast';

// Instancia configurada de Axios para JSONPlaceholder
export const jsonApi = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor global: notifica al usuario y loguea el error
jsonApi.interceptors.response.use(
    (response) => response,
    (error) => {
        const message: string =
            error?.response?.data?.message ?? 'Error en el servidor. Intenta de nuevo.';
        toast.error(message);
        console.error('Error en la API de JSONPlaceholder:', error);
        return Promise.reject(error);
    }
);