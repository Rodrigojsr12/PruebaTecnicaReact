import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'
import { getNotesByCharacter, createNote, deleteNote, type Note } from '../services/note.service'
interface CharacterNotesProps {
    characterId: number;
}

export const CharacterNotes = ({ characterId }: CharacterNotesProps) => {
    const queryClient = useQueryClient()
    const [newNoteTitle, setNewNoteTitle] = useState('')
    const [newNoteBody, setNewNoteBody] = useState('')

    // 1. LEER (Read)
    const { data: notes, isLoading } = useQuery({
        queryKey: ['notes', characterId],
        queryFn: () => getNotesByCharacter(characterId),
    })

    // 2. CREAR (Create)
    const createMutation = useMutation({
        mutationFn: createNote,
        onSuccess: (newNote) => {
            // Actualizamos el caché manualmente porque JSONPlaceholder no guarda el dato real
            queryClient.setQueryData(['notes', characterId], (oldNotes: Note[] | undefined) => {
                return oldNotes ? [newNote, ...oldNotes] : [newNote]
            })
            toast.success('¡Bitácora agregada con éxito!', {
                style: { background: '#88e23b', color: '#043c6e', fontWeight: 'bold' }
            })
            setNewNoteTitle('')
            setNewNoteBody('')
        },
        onError: () => toast.error('Error al guardar la bitácora')
    })

    // 3. ELIMINAR (Delete)
    const deleteMutation = useMutation({
        mutationFn: deleteNote,
        onSuccess: (deletedId) => {
            // Filtramos la nota eliminada del caché
            queryClient.setQueryData(['notes', characterId], (oldNotes: Note[] | undefined) => {
                return oldNotes?.filter(note => note.id !== deletedId)
            })
            toast.success('Bitácora eliminada', { icon: '🗑️' })
        },
        onError: () => toast.error('Error al eliminar')
    })

    const handleCreate = (e: React.FormEvent) => {
        e.preventDefault()
        if (!newNoteTitle.trim() || !newNoteBody.trim()) {
            toast.error('Completa ambos campos')
            return
        }
        createMutation.mutate({ userId: characterId, title: newNoteTitle, body: newNoteBody })
    }

    if (isLoading) return <div className="text-white mt-8">Cargando bitácoras...</div>

    return (
        <div className="mt-12">
            <h2 className="text-3xl font-black text-texas-yellow mb-6 border-b-2 border-texas-yellow/30 pb-2">
                Bitácoras de Misión (CRUD)
            </h2>

            {/* Formulario de Creación */}
            <form onSubmit={handleCreate} className="bg-mystery-teal/20 p-6 rounded-xl mb-8 border border-mystery-teal/50">
                <h3 className="text-xl font-bold text-white mb-4">Añadir nueva nota</h3>
                <input
                    type="text"
                    placeholder="Título de la nota..."
                    value={newNoteTitle}
                    onChange={(e) => setNewNoteTitle(e.target.value)}
                    className="w-full px-4 py-2 mb-3 rounded-lg bg-white text-tardis-blue font-medium focus:outline-none focus:ring-2 focus:ring-kiwi-green"
                />
                <textarea
                    placeholder="Detalles de la misión..."
                    value={newNoteBody}
                    onChange={(e) => setNewNoteBody(e.target.value)}
                    rows={3}
                    className="w-full px-4 py-2 mb-3 rounded-lg bg-white text-tardis-blue focus:outline-none focus:ring-2 focus:ring-kiwi-green resize-none"
                />
                <button
                    type="submit"
                    disabled={createMutation.isPending}
                    className="bg-kiwi-green text-tardis-blue font-bold px-6 py-2 rounded-lg hover:bg-endo-green transition-colors disabled:opacity-50"
                >
                    {createMutation.isPending ? 'Guardando...' : 'Guardar Bitácora'}
                </button>
            </form>

            {/* Lista de Notas */}
            <div className="space-y-4">
                {notes?.map((note) => (
                    <div key={note.id} className="bg-mystery-teal p-5 rounded-xl flex justify-between items-start gap-4 shadow-md">
                        <div>
                            <h4 className="font-bold text-xl text-tardis-blue capitalize mb-1">{note.title}</h4>
                            <p className="text-tardis-blue/80">{note.body}</p>
                        </div>
                        <button
                            onClick={() => deleteMutation.mutate(note.id)}
                            disabled={deleteMutation.isPending}
                            className="text-red-600 hover:text-red-800 bg-white/50 hover:bg-white px-3 py-1 rounded-md font-bold transition-colors text-sm shrink-0"
                        >
                            Eliminar
                        </button>
                    </div>
                ))}
                {notes?.length === 0 && <p className="text-mystery-teal">No hay bitácoras para este personaje.</p>}
            </div>
        </div>
    )
}