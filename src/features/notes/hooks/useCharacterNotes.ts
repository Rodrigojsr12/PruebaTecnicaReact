import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'
import { getNotesByCharacter, createNote, updateNote, deleteNote, type Note } from '../services/note.service'

export const useCharacterNotes = (characterId: number) => {
    const queryClient = useQueryClient()
    const queryKey = ['notes', characterId]

    // 1. READ: Traemos los comentarios y limitamos a 5 predeterminados
    const { data: notes, isLoading } = useQuery({
        queryKey,
        queryFn: async () => {
            const simulatedUserId = (characterId % 10) + 1;
            const data = await getNotesByCharacter(simulatedUserId);
            return data.slice(0, 5);
        },
    })

    // 2. CREATE
    const createMutation = useMutation({
        mutationFn: createNote,
        onSuccess: (newNote) => {
            queryClient.setQueryData(queryKey, (oldNotes: Note[] | undefined) => {
                const noteWithUniqueId = { ...newNote, id: Date.now() }
                return oldNotes ? [noteWithUniqueId, ...oldNotes] : [noteWithUniqueId]
            })
            toast.success('Bitácora agregada', { style: { background: '#88e23b', color: '#043c6e', fontWeight: 'bold' } })
        },
        onError: () => toast.error('Error al crear')
    })

    // 3. UPDATE
    const updateMutation = useMutation({
        mutationFn: ({ id, note }: { id: number, note: Partial<Note> }) => updateNote(id, note),
        onSuccess: (_, variables) => {
            queryClient.setQueryData(queryKey, (oldNotes: Note[] | undefined) =>
                oldNotes?.map(n => n.id === variables.id ? { ...n, ...variables.note } : n)
            )
            toast.success('Actualizado correctamente', { style: { background: '#88e23b', color: '#043c6e', fontWeight: 'bold' } })
        },
        onError: (_, variables) => {
            // Actualización optimista si la API falla por ID falso
            queryClient.setQueryData(queryKey, (oldNotes: Note[] | undefined) =>
                oldNotes?.map(n => n.id === variables.id ? { ...n, ...variables.note } : n)
            )
            toast.success('Actualizado (Localmente)', { style: { background: '#88e23b', color: '#043c6e', fontWeight: 'bold' } })
        }
    })

    // 4. DELETE
    const deleteMutation = useMutation({
        mutationFn: deleteNote,
        onSuccess: (_, id) => {
            queryClient.setQueryData(queryKey, (oldNotes: Note[] | undefined) => oldNotes?.filter(n => n.id !== id))
            toast.success('Eliminado', { icon: '🗑️' })
        },
        onError: (_, id) => {
            queryClient.setQueryData(queryKey, (oldNotes: Note[] | undefined) => oldNotes?.filter(n => n.id !== id))
            toast.success('Eliminado (Localmente)', { icon: '🗑️' })
        }
    })

    return { notes, isLoading, createMutation, updateMutation, deleteMutation }
}