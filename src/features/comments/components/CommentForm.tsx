import { useState } from 'react'
import { CheckCircle2 } from 'lucide-react'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'react-hot-toast'
import { commentSchema, type CommentFormValues } from '../schemas/comment.schema'
import { jsonApi } from '../../../api/axiosInstance'

export const CommentForm = () => {
    const [submittedData, setSubmittedData] = useState<CommentFormValues | null>(null)

    const { register, handleSubmit, reset, formState: { errors } } = useForm<CommentFormValues>({
        resolver: zodResolver(commentSchema)
    })

    const mutation = useMutation({
        mutationFn: (data: CommentFormValues) =>
            jsonApi.post('/comments', { ...data, postId: 1 }),
        onSuccess: (_response, variables) => {
            toast.success('¡Comentario enviado con éxito!', {
                style: { background: '#88e23b', color: '#043c6e', fontWeight: 'bold' },
            })
            setSubmittedData(variables)
            reset()
        },
        onError: () => {
            toast.error('Error al enviar el comentario. Intenta de nuevo.')
        },
    })

    const onSubmit = (data: CommentFormValues) => mutation.mutate(data)

    const handleSendAnother = () => {
        setSubmittedData(null)
        reset()
    }

    return (
        <div className="bg-texas-yellow rounded-2xl shadow-xl p-8 border-none">
            <h2 className="text-2xl font-bold text-tardis-blue mb-6">Dejar un comentario</h2>

            {submittedData ? (
                /* ESTADO DE ÉXITO — muestra los datos enviados */
                <div className="text-center">
                    <div className="mb-5 flex justify-center">
                        <CheckCircle2 size={52} className="text-kiwi-green" />
                    </div>
                    <p className="text-xl font-black text-tardis-blue mb-2">¡Comentario recibido!</p>
                    <p className="text-tardis-blue/70 text-sm mb-6">
                        JSONPlaceholder respondió con <strong>HTTP 201 Created</strong> vía Axios.
                    </p>

                    <div className="bg-white/90 p-5 rounded-xl text-left space-y-3 mb-6 shadow-sm">
                        <div>
                            <p className="text-xs font-bold text-tardis-blue/60 uppercase tracking-wide">Nombre</p>
                            <p className="font-bold text-tardis-blue">{submittedData.name}</p>
                        </div>
                        <div>
                            <p className="text-xs font-bold text-tardis-blue/60 uppercase tracking-wide">Correo</p>
                            <p className="font-bold text-tardis-blue">{submittedData.email}</p>
                        </div>
                        <div>
                            <p className="text-xs font-bold text-tardis-blue/60 uppercase tracking-wide">Comentario</p>
                            <p className="font-bold text-tardis-blue">{submittedData.comment}</p>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={handleSendAnother}
                        className="w-full bg-kiwi-green hover:bg-endo-green text-tardis-blue font-black py-3 px-4 rounded-lg transition-colors shadow-sm text-lg"
                    >
                        Enviar otro comentario
                    </button>
                </div>
            ) : (
                /* FORMULARIO — validado con Zod */
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <div>
                        <label htmlFor="comment-name" className="block text-sm font-bold text-tardis-blue mb-1">
                            Tu Nombre
                        </label>
                        <input
                            id="comment-name"
                            {...register('name')}
                            type="text"
                            placeholder="Rick Sanchez..."
                            className={`w-full px-4 py-2 rounded-lg border-2 ${errors.name ? 'border-red-500 focus:ring-red-500' : 'border-tardis-blue/20 focus:ring-tardis-blue'} focus:outline-none focus:ring-2 bg-white/90`}
                        />
                        {errors.name && <p className="text-red-500 text-sm mt-1 font-medium">{errors.name.message}</p>}
                    </div>

                    <div>
                        <label htmlFor="comment-email" className="block text-sm font-bold text-tardis-blue mb-1">
                            Correo Electrónico
                        </label>
                        <input
                            id="comment-email"
                            {...register('email')}
                            type="email"
                            placeholder="rick@c137.com"
                            className={`w-full px-4 py-2 rounded-lg border-2 ${errors.email ? 'border-red-500 focus:ring-red-500' : 'border-tardis-blue/20 focus:ring-tardis-blue'} focus:outline-none focus:ring-2 bg-white/90`}
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1 font-medium">{errors.email.message}</p>}
                    </div>

                    <div>
                        <label htmlFor="comment-body" className="block text-sm font-bold text-tardis-blue mb-1">
                            Comentario
                        </label>
                        <textarea
                            id="comment-body"
                            {...register('comment')}
                            rows={4}
                            placeholder="¿Qué opinas del universo Rick & Morty?..."
                            className={`w-full px-4 py-2 rounded-lg border-2 ${errors.comment ? 'border-red-500 focus:ring-red-500' : 'border-tardis-blue/20 focus:ring-tardis-blue'} focus:outline-none focus:ring-2 resize-none bg-white/90`}
                        />
                        {errors.comment && <p className="text-red-500 text-sm mt-1 font-medium">{errors.comment.message}</p>}
                    </div>

                    <button
                        type="submit"
                        disabled={mutation.isPending}
                        className="w-full bg-kiwi-green hover:bg-endo-green text-tardis-blue font-black py-3 px-4 rounded-lg transition-colors shadow-sm text-lg disabled:opacity-60"
                    >
                        {mutation.isPending ? 'Enviando...' : 'Enviar Comentario'}
                    </button>
                </form>
            )}
        </div>
    )
}