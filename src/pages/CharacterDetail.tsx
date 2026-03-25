import { useParams, Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useState } from 'react'

// 1. Definimos el esquema de validación con Zod
const commentSchema = z.object({
    name: z.string().min(2, { message: 'El nombre debe tener al menos 2 caracteres' }),
    email: z.string().email({ message: 'Ingresa un correo electrónico válido' }),
    comment: z.string().min(10, { message: 'El comentario debe tener al menos 10 caracteres' })
})

type CommentFormValues = z.infer<typeof commentSchema>

const fetchCharacter = async (id: string) => {
    const response = await fetch(`https://rickandmortyapi.com/api/character/${id}`)
    if (!response.ok) throw new Error('Personaje no encontrado')
    return response.json()
}

export default function CharacterDetail() {
    const { id } = useParams<{ id: string }>()
    const [successMessage, setSuccessMessage] = useState(false)

    const { data, isLoading, isError } = useQuery({
        queryKey: ['character', id],
        queryFn: () => fetchCharacter(id!),
    })

    // 2. Configuramos React Hook Form y lo conectamos con Zod
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<CommentFormValues>({
        resolver: zodResolver(commentSchema)
    })

    // 3. Función que se ejecuta al enviar el formulario válido
    const onSubmit = (formData: CommentFormValues) => {
        console.log('Comentario enviado:', formData)
        setSuccessMessage(true)
        reset()
        setTimeout(() => setSuccessMessage(false), 3000)
    }

    if (isLoading) return <div className="min-h-screen flex items-center justify-center text-xl font-semibold">Cargando detalles...</div>
    if (isError) return <div className="min-h-screen flex items-center justify-center text-red-500">Hubo un error al cargar el personaje.</div>

    return (
        <div className="min-h-screen bg-gray-50 p-6 md:p-12 font-sans">
            <div className="max-w-3xl mx-auto">
                <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6 font-medium transition-colors">
                    &larr; Volver al inicio
                </Link>

                {/* Tarjeta de Detalles del Personaje */}
                <div className="bg-white rounded-2xl shadow-md overflow-hidden md:flex mb-8 border border-gray-100">
                    <img
                        src={data.image}
                        alt={data.name}
                        className="w-full md:w-1/2 object-cover"
                    />
                    <div className="p-8 md:w-1/2 flex flex-col justify-center bg-white">
                        <h1 className="text-4xl font-black text-gray-900 mb-4">{data.name}</h1>
                        <div className="space-y-3 text-lg text-gray-700">
                            <p><strong className="text-gray-900">Estado:</strong> {data.status}</p>
                            <p><strong className="text-gray-900">Especie:</strong> {data.species}</p>
                            <p><strong className="text-gray-900">Género:</strong> {data.gender}</p>
                            <p><strong className="text-gray-900">Origen:</strong> {data.origin.name}</p>
                            <p><strong className="text-gray-900">Ubicación:</strong> {data.location.name}</p>
                        </div>
                    </div>
                </div>

                {/* Sección de Formulario de Comentarios */}
                <div className="bg-white rounded-2xl shadow-md p-8 border border-gray-100">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Dejar un comentario</h2>

                    {successMessage && (
                        <div className="mb-6 p-4 bg-green-50 text-green-700 rounded-lg border border-green-200 font-medium">
                            ¡Comentario enviado con éxito!
                        </div>
                    )}

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                        {/* Campo Nombre */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Tu Nombre</label>
                            <input
                                {...register('name')}
                                type="text"
                                className={`w-full px-4 py-2 rounded-lg border ${errors.name ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'} focus:outline-none focus:ring-2`}
                                placeholder="Ej. Morty Smith"
                            />
                            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                        </div>

                        {/* Campo Correo */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Correo Electrónico</label>
                            <input
                                {...register('email')}
                                type="email"
                                className={`w-full px-4 py-2 rounded-lg border ${errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'} focus:outline-none focus:ring-2`}
                                placeholder="morty@citadel.com"
                            />
                            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                        </div>

                        {/* Campo Comentario */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Comentario</label>
                            <textarea
                                {...register('comment')}
                                rows={4}
                                className={`w-full px-4 py-2 rounded-lg border ${errors.comment ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'} focus:outline-none focus:ring-2 resize-none`}
                                placeholder="¿Qué opinas de este personaje?"
                            ></textarea>
                            {errors.comment && <p className="text-red-500 text-sm mt-1">{errors.comment.message}</p>}
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-colors shadow-sm"
                        >
                            Enviar Comentario
                        </button>
                    </form>
                </div>

            </div>
        </div>
    )
}