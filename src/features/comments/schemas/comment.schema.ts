import * as z from 'zod'

export const commentSchema = z.object({
    name: z.string().min(2, { message: 'El nombre debe tener al menos 2 caracteres' }),
    email: z.string().email({ message: 'Ingresa un correo electrónico válido' }),
    comment: z.string().min(10, { message: 'El comentario debe tener al menos 10 caracteres' })
})

export type CommentFormValues = z.infer<typeof commentSchema>