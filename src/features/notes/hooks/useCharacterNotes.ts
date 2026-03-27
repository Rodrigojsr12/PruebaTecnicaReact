import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'
import { getNotesByCharacter, createNote, updateNote, deleteNote, type Note } from '../services/note.service'

// JSONPlaceholder solo tiene userId del 1 al 10 — mapeamos el ID del personaje a ese rango
const JSON_PLACEHOLDER_MAX_USER_ID = 10

export const useCharacterNotes = (characterId: number) => {
    const queryClient = useQueryClient()
    const queryKey = ['notes', characterId]

    // 1. READ — limitamos a 5 notas iniciales predeterminadas
    const { data: notes, isLoading, isError } = useQuery({
        queryKey,
        queryFn: async () => {
            const simulatedUserId = (characterId % JSON_PLACEHOLDER_MAX_USER_ID) + 1
            const data = await getNotesByCharacter(simulatedUserId)
            return data.slice(0, 5)
        },
    })

    const toastStyle = { style: { background: '#88e23b', color: '#043c6e', fontWeight: 'bold' } }

    // 2. CREATE
    const createMutation = useMutation({
        mutationFn: createNote,
        onSuccess: (newNote) => {
            queryClient.setQueryData(queryKey, (oldNotes: Note[] | undefined) => {
                const noteWithUniqueId = { ...newNote, id: Date.now() }
                return oldNotes ? [noteWithUniqueId, ...oldNotes] : [noteWithUniqueId]
            })
            toast.success('Bitácora agregada', toastStyle)
        },
        onError: () => toast.error('Error al crear la bitácora'),
    })

    // 3. UPDATE — JSONPlaceholder no persiste IDs creados localmente,
    const updateMutation = useMutation({
        mutationFn: ({ id, note }: { id: number; note: Partial<Note> }) => updateNote(id, note),
        onSuccess: (_, variables) => {
            queryClient.setQueryData(queryKey, (oldNotes: Note[] | undefined) =>
                oldNotes?.map(n => n.id === variables.id ? { ...n, ...variables.note } : n)
            )
            toast.success('Actualizado correctamente', toastStyle)
        },
        onError: (_, variables) => {
            queryClient.setQueryData(queryKey, (oldNotes: Note[] | undefined) =>
                oldNotes?.map(n => n.id === variables.id ? { ...n, ...variables.note } : n)
            )
            toast('Guardado localmente (ID no existe en servidor)', { icon: '⚠️' })
        },
    })

    // 4. DELETE — mismo patrón: eliminamos del cache aunque el servidor falle
    const deleteMutation = useMutation({
        mutationFn: deleteNote,
        onSuccess: (_, id) => {
            queryClient.setQueryData(queryKey, (oldNotes: Note[] | undefined) =>
                oldNotes?.filter(n => n.id !== id)
            )
            toast.success('Eliminado', { icon: '🗑️' })
        },
        onError: (_, id) => {
            queryClient.setQueryData(queryKey, (oldNotes: Note[] | undefined) =>
                oldNotes?.filter(n => n.id !== id)
            )
            toast('Eliminado localmente (ID no existe en servidor)', { icon: '⚠️' })
        },
    })

    return { notes, isLoading, isError, createMutation, updateMutation, deleteMutation }
}