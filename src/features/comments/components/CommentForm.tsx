import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { commentSchema, type CommentFormValues } from '../schemas/comment.schema'

export const CommentForm = () => {
    const [successMessage, setSuccessMessage] = useState(false)

    const { register, handleSubmit, reset, formState: { errors } } = useForm<CommentFormValues>({
        resolver: zodResolver(commentSchema)
    })

    const onSubmit = (formData: CommentFormValues) => {
        console.log('Comentario enviado:', formData)
        setSuccessMessage(true)
        reset()
        setTimeout(() => setSuccessMessage(false), 3000)
    }

    return (
        // FONDO 3: Contenedor del formulario en amarillo pastel (Texas Yellow)
        <div className="bg-texas-yellow rounded-2xl shadow-xl p-8 border-none">
            <h2 className="text-2xl font-bold text-tardis-blue mb-6">Dejar un comentario</h2>

            {successMessage && (
                <div className="mb-6 p-4 bg-kiwi-green/20 text-tardis-blue rounded-lg border border-kiwi-green font-medium">
                    ¡Comentario enviado con éxito!
                </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div>
                    <label className="block text-sm font-bold text-tardis-blue mb-1">Tu Nombre</label>
                    <input
                        {...register('name')}
                        type="text"
                        className={`w-full px-4 py-2 rounded-lg border-2 ${errors.name ? 'border-red-500 focus:ring-red-500' : 'border-tardis-blue/20 focus:ring-tardis-blue'} focus:outline-none focus:ring-2 bg-white/90`}
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                </div>

                <div>
                    <label className="block text-sm font-bold text-tardis-blue mb-1">Correo Electrónico</label>
                    <input
                        {...register('email')}
                        type="email"
                        className={`w-full px-4 py-2 rounded-lg border-2 ${errors.email ? 'border-red-500 focus:ring-red-500' : 'border-tardis-blue/20 focus:ring-tardis-blue'} focus:outline-none focus:ring-2 bg-white/90`}
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                </div>

                <div>
                    <label className="block text-sm font-bold text-tardis-blue mb-1">Comentario</label>
                    <textarea
                        {...register('comment')}
                        rows={4}
                        className={`w-full px-4 py-2 rounded-lg border-2 ${errors.comment ? 'border-red-500 focus:ring-red-500' : 'border-tardis-blue/20 focus:ring-tardis-blue'} focus:outline-none focus:ring-2 resize-none bg-white/90`}
                    ></textarea>
                    {errors.comment && <p className="text-red-500 text-sm mt-1">{errors.comment.message}</p>}
                </div>

                <button
                    type="submit"
                    className="w-full bg-kiwi-green hover:bg-endo-green text-tardis-blue font-black py-3 px-4 rounded-lg transition-colors shadow-sm text-lg"
                >
                    Enviar Comentario
                </button>
            </form>
        </div>
    )
}