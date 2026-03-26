import axios from 'axios';

// Creamos una instancia configurada de Axios para la segunda API JSONPlaceholder
export const jsonApi = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Aquí podríamos agregar interceptores para manejar errores globales en el futuro
jsonApi.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error('Error global en la API de JSONPlaceholder:', error);
        return Promise.reject(error);
    }
);