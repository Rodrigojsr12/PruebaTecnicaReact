import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Pencil, Trash2, Check, X, BookText } from 'lucide-react'
import { useCharacterNotes } from '../hooks/useCharacterNotes'
import { noteSchema, type NoteFormValues } from '../schemas/note.schema'
import type { Note } from '../services/note.service'

interface CharacterNotesProps {
    characterId: number;
}

export const CharacterNotes = ({ characterId }: CharacterNotesProps) => {
    const { notes, isLoading, isError, createMutation, updateMutation, deleteMutation } = useCharacterNotes(characterId)

    // Formulario de CREACIÓN — validado con Zod
    const createForm = useForm<NoteFormValues>({
        resolver: zodResolver(noteSchema),
    })

    // Formulario de EDICIÓN — validado con Zod
    const editForm = useForm<NoteFormValues>({
        resolver: zodResolver(noteSchema),
    })

    const [editingId, setEditingId] = useState<number | null>(null)

    // Envío del formulario de CREACIÓN
    const onSubmitCreate = (data: NoteFormValues) => {
        createMutation.mutate({ userId: characterId, title: data.title, body: data.body })
        createForm.reset()
    }

    // Iniciar EDICIÓN — pre-popula el formulario con los valores actuales
    const handleEditClick = (note: Note) => {
        setEditingId(note.id)
        editForm.setValue('title', note.title)
        editForm.setValue('body', note.body)
    }

    // Envío del formulario de EDICIÓN
    const onSubmitEdit = (data: NoteFormValues) => {
        if (editingId === null) return
        updateMutation.mutate({ id: editingId, note: { title: data.title, body: data.body } })
        setEditingId(null)
        editForm.reset()
    }

    if (isLoading) {
        return (
            <div className="mt-12 space-y-4">
                {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="bg-mystery-teal/30 rounded-xl p-5 h-24 animate-pulse" />
                ))}
            </div>
        )
    }

    if (isError) {
        return (
            <div className="mt-12 p-6 bg-red-900/30 border border-red-500/50 rounded-xl text-red-300 text-center font-medium">
                Error al cargar las bitácoras. Intenta recargar la página.
            </div>
        )
    }

    return (
        <div className="mt-12">
            <h2 className="text-3xl font-black text-texas-yellow mb-6 border-b-2 border-texas-yellow/30 pb-2 flex items-center gap-2">
                <BookText size={28} /> Bitácoras de Misión
            </h2>

            {/* FORMULARIO DE CREACIÓN — mismo estilo que el formulario de comentarios */}
            <form onSubmit={createForm.handleSubmit(onSubmitCreate)} className="bg-texas-yellow rounded-2xl shadow-xl p-8 mb-8">
                <h3 className="text-2xl font-bold text-tardis-blue mb-6">Añadir nueva bitácora</h3>

                <div className="mb-4">
                    <label htmlFor="note-title" className="block text-sm font-bold text-tardis-blue mb-1">
                        Título
                    </label>
                    <input
                        id="note-title"
                        {...createForm.register('title')}
                        type="text"
                        placeholder="Título de la nota..."
                        className={`w-full px-4 py-2 rounded-lg border-2 ${createForm.formState.errors.title ? 'border-red-500 focus:ring-red-500' : 'border-tardis-blue/20 focus:ring-tardis-blue'} focus:outline-none focus:ring-2 bg-white/90`}
                    />
                    {createForm.formState.errors.title && (
                        <p className="text-red-500 text-sm mt-1 font-medium">{createForm.formState.errors.title.message}</p>
                    )}
                </div>

                <div className="mb-4">
                    <label htmlFor="note-body" className="block text-sm font-bold text-tardis-blue mb-1">
                        Detalles de la misión
                    </label>
                    <textarea
                        id="note-body"
                        {...createForm.register('body')}
                        placeholder="Detalles de la misión..."
                        rows={4}
                        className={`w-full px-4 py-2 rounded-lg border-2 ${createForm.formState.errors.body ? 'border-red-500 focus:ring-red-500' : 'border-tardis-blue/20 focus:ring-tardis-blue'} focus:outline-none focus:ring-2 resize-none bg-white/90`}
                    />
                    {createForm.formState.errors.body && (
                        <p className="text-red-500 text-sm mt-1 font-medium">{createForm.formState.errors.body.message}</p>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={createMutation.isPending}
                    className="w-full bg-kiwi-green hover:bg-endo-green text-tardis-blue font-black py-3 px-4 rounded-lg transition-colors shadow-sm text-lg disabled:opacity-60"
                >
                    {createMutation.isPending ? 'Guardando...' : 'Guardar Bitácora'}
                </button>
            </form>

            {/* LISTA DE NOTAS */}
            <div className="space-y-4">
                {notes?.map((note) => (
                    <div key={note.id} className="bg-mystery-teal p-5 rounded-xl flex flex-col sm:flex-row justify-between items-start gap-4 shadow-md hover:shadow-lg transition-shadow">

                        {/* MODO EDICIÓN — formulario separado, validado con Zod */}
                        {editingId === note.id ? (
                            <form onSubmit={editForm.handleSubmit(onSubmitEdit)} className="w-full">
                                <div className="mb-2">
                                    <label htmlFor={`edit-title-${note.id}`} className="sr-only">Título</label>
                                    <input
                                        id={`edit-title-${note.id}`}
                                        {...editForm.register('title')}
                                        type="text"
                                        className="w-full px-3 py-2 rounded border-2 border-tardis-blue/20 bg-white text-tardis-blue font-bold focus:ring-2 focus:ring-tardis-blue outline-none"
                                    />
                                    {editForm.formState.errors.title && (
                                        <p className="text-red-300 text-sm mt-1">{editForm.formState.errors.title.message}</p>
                                    )}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor={`edit-body-${note.id}`} className="sr-only">Cuerpo</label>
                                    <textarea
                                        id={`edit-body-${note.id}`}
                                        {...editForm.register('body')}
                                        rows={3}
                                        className="w-full px-3 py-2 rounded border-2 border-tardis-blue/20 bg-white text-tardis-blue focus:ring-2 focus:ring-tardis-blue outline-none resize-none"
                                    />
                                    {editForm.formState.errors.body && (
                                        <p className="text-red-300 text-sm mt-1">{editForm.formState.errors.body.message}</p>
                                    )}
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        type="submit"
                                        disabled={updateMutation.isPending}
                                        className="inline-flex items-center gap-1 bg-tardis-blue text-white font-bold px-4 py-2 rounded hover:bg-black transition-colors disabled:opacity-50"
                                    >
                                        <Check size={14} /> {updateMutation.isPending ? 'Guardando...' : 'Guardar'}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => { setEditingId(null); editForm.reset() }}
                                        className="inline-flex items-center gap-1 bg-white/50 text-tardis-blue font-bold px-4 py-2 rounded hover:bg-white transition-colors"
                                    >
                                        <X size={14} /> Cancelar
                                    </button>
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
                                    <button
                                        onClick={() => handleEditClick(note)}
                                        className="inline-flex items-center gap-1 text-tardis-blue hover:text-black bg-white/50 hover:bg-white px-3 py-1 rounded-md font-bold transition-colors text-sm"
                                    >
                                        <Pencil size={13} /> Editar
                                    </button>
                                    <button
                                        onClick={() => deleteMutation.mutate(note.id)}
                                        disabled={deleteMutation.isPending}
                                        className="inline-flex items-center gap-1 text-red-600 hover:text-white bg-white/50 hover:bg-red-600 px-3 py-1 rounded-md font-bold transition-colors text-sm disabled:opacity-50"
                                    >
                                        <Trash2 size={13} /> Eliminar
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}