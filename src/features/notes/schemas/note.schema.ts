import * as z from 'zod'

export const noteSchema = z.object({
    title: z.string().min(3, { message: 'El título debe tener al menos 3 caracteres' }),
    body: z.string().min(10, { message: 'El detalle debe tener al menos 10 caracteres' })
})

export type NoteFormValues = z.infer<typeof noteSchema>