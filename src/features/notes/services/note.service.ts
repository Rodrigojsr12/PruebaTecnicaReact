import { jsonApi } from '../../../api/axiosInstance'

// Definimos la estructura exacta que nos pide y devuelve JSONPlaceholder
export interface Note {
    id: number;
    userId: number; // (ID del personaje)
    title: string;
    body: string;
}

// 1. LEER - Traer las notas asociadas a un personaje
export const getNotesByCharacter = async (characterId: number) => {
    // Axios automáticamente parsea el JSON
    const response = await jsonApi.get<Note[]>(`/posts?userId=${characterId}`);
    return response.data;
}

// 2. CREAR - Enviar una nueva nota
export const createNote = async (note: Omit<Note, 'id'>) => {
    const response = await jsonApi.post<Note>('/posts', note);
    return response.data;
}

// 3. ACTUALIZAR - Modificar una nota existente
export const updateNote = async (id: number, note: Partial<Note>) => {
    const response = await jsonApi.put<Note>(`/posts/${id}`, note);
    return response.data;
}

// 4. ELIMINAR - Borrar una nota
export const deleteNote = async (id: number) => {
    await jsonApi.delete(`/posts/${id}`);
    return id; // Retornamos el ID para saber cuál borramos en la UI
}