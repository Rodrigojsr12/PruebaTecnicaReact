// src/features/notes/components/CharacterNotes.tsx
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCharacterNotes } from '../hooks/useCharacterNotes'
import { noteSchema, type NoteFormValues } from '../schemas/note.schema'
import type { Note } from '../services/note.service'

interface CharacterNotesProps {
    characterId: number;
}

export const CharacterNotes = ({ characterId }: CharacterNotesProps) => {
    // 1. Usamos nuestro Custom Hook (¡Modularización Avanzada!)
    const { notes, isLoading, createMutation, updateMutation, deleteMutation } = useCharacterNotes(characterId)

    // 2. Usamos React Hook Form + Zod para validación
    const { register, handleSubmit, reset, formState: { errors } } = useForm<NoteFormValues>({
        resolver: zodResolver(noteSchema)
    })

    const [editingId, setEditingId] = useState<number | null>(null)
    const [editTitle, setEditTitle] = useState('')
    const [editBody, setEditBody] = useState('')

    // Envío del formulario de CREACIÓN
    const onSubmitCreate = (data: NoteFormValues) => {
        createMutation.mutate({ userId: characterId, title: data.title, body: data.body })
        reset() // Limpiamos el formulario automáticamente
    }

    // Iniciar EDICIÓN
    const handleEditClick = (note: Note) => {
        setEditingId(note.id)
        setEditTitle(note.title)
        setEditBody(note.body)
    }

    // Envío del formulario de EDICIÓN
    const handleUpdateSubmit = (e: React.FormEvent, id: number) => {
        e.preventDefault()
        if (!editTitle.trim() || !editBody.trim()) return
        updateMutation.mutate({ id, note: { title: editTitle, body: editBody } })
        setEditingId(null)
    }

    if (isLoading) return <div className="text-white mt-8 animate-pulse">Cargando 5 bitácoras predeterminadas...</div>

    return (
        <div className="mt-12">
            <h2 className="text-3xl font-black text-texas-yellow mb-6 border-b-2 border-texas-yellow/30 pb-2">
                Bitácoras de Misión (Zod Validated)
            </h2>

            {/* FORMULARIO DE CREACIÓN (Con Zod) */}
            <form onSubmit={handleSubmit(onSubmitCreate)} className="bg-mystery-teal/20 p-6 rounded-xl mb-8 border border-mystery-teal/50">
                <h3 className="text-xl font-bold text-white mb-4">Añadir nueva nota</h3>

                <input
                    {...register('title')}
                    type="text"
                    placeholder="Título de la nota..."
                    className={`w-full px-4 py-2 mb-1 rounded-lg bg-white text-tardis-blue font-medium focus:outline-none focus:ring-2 ${errors.title ? 'border-2 border-red-500 focus:ring-red-500' : 'focus:ring-kiwi-green'}`}
                />
                {errors.title && <p className="text-red-400 text-sm mb-3 font-medium">{errors.title.message}</p>}

                <textarea
                    {...register('body')}
                    placeholder="Detalles de la misión..."
                    rows={3}
                    className={`w-full px-4 py-2 mt-2 mb-1 rounded-lg bg-white text-tardis-blue focus:outline-none focus:ring-2 resize-none ${errors.body ? 'border-2 border-red-500 focus:ring-red-500' : 'focus:ring-kiwi-green'}`}
                />
                {errors.body && <p className="text-red-400 text-sm mb-3 font-medium">{errors.body.message}</p>}

                <button
                    type="submit"
                    disabled={createMutation.isPending}
                    className="mt-3 bg-kiwi-green text-tardis-blue font-bold px-6 py-2 rounded-lg hover:bg-endo-green transition-colors disabled:opacity-50"
                >
                    {createMutation.isPending ? 'Guardando...' : 'Guardar Bitácora'}
                </button>
            </form>

            {/* LISTA DE NOTAS */}
            <div className="space-y-4">
                {notes?.map((note) => (
                    <div key={note.id} className="bg-mystery-teal p-5 rounded-xl flex flex-col sm:flex-row justify-between items-start gap-4 shadow-md hover:shadow-lg transition-shadow">

                        {/* MODO EDICIÓN */}
                        {editingId === note.id ? (
                            <form onSubmit={(e) => handleUpdateSubmit(e, note.id)} className="w-full">
                                <input type="text" value={editTitle} onChange={(e) => setEditTitle(e.target.value)} className="w-full px-3 py-2 mb-2 rounded border-2 border-tardis-blue/20 bg-white text-tardis-blue font-bold focus:ring-2 focus:ring-tardis-blue outline-none" required minLength={3} />
                                <textarea value={editBody} onChange={(e) => setEditBody(e.target.value)} rows={3} className="w-full px-3 py-2 mb-3 rounded border-2 border-tardis-blue/20 bg-white text-tardis-blue focus:ring-2 focus:ring-tardis-blue outline-none resize-none" required minLength={10} />
                                <div className="flex gap-2">
                                    <button type="submit" disabled={updateMutation.isPending} className="bg-tardis-blue text-white font-bold px-4 py-2 rounded hover:bg-black transition-colors">Guardar</button>
                                    <button type="button" onClick={() => setEditingId(null)} className="bg-white/50 text-tardis-blue font-bold px-4 py-2 rounded hover:bg-white transition-colors">Cancelar</button>
                                </div>
                            </form>
                        ) : (
                            /* MODO LECTURA */
                            <>
                                <div className="flex-grow">
                                    <h4 className="font-bold text-xl text-tardis-blue capitalize mb-1">{note.title}</h4>
                                    <p className="text-tardis-blue/80">{note.body}</p>
                                </div>
                                <div className="flex gap-2 shrink-0">
                                    <button onClick={() => handleEditClick(note)} className="text-tardis-blue hover:text-black bg-white/50 hover:bg-white px-3 py-1 rounded-md font-bold transition-colors text-sm">Editar</button>
                                    <button onClick={() => deleteMutation.mutate(note.id)} disabled={deleteMutation.isPending} className="text-red-600 hover:text-white bg-white/50 hover:bg-red-600 px-3 py-1 rounded-md font-bold transition-colors text-sm">Eliminar</button>
                                </div>
                            </>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}