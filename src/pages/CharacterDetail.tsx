import { useParams, Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { fetchCharacterById } from '../features/characters/services/character.service'
import { CommentForm } from '../features/comments/components/CommentForm'

export default function CharacterDetail() {
    const { id } = useParams<{ id: string }>()

    const { data, isLoading, isError } = useQuery({
        queryKey: ['character', id],
        queryFn: () => fetchCharacterById(id!),
    })

    if (isLoading) return <div className="min-h-screen flex items-center justify-center text-xl font-semibold bg-tardis-blue text-white">Cargando detalles...</div>
    if (isError) return <div className="min-h-screen flex items-center justify-center text-red-500 bg-tardis-blue">Error al cargar.</div>

    return (
        // FONDO 1: Toda la página en azul oscuro
        <div className="min-h-screen bg-tardis-blue p-6 md:p-12 font-sans">
            <div className="max-w-3xl mx-auto">
                <Link to="/" className="inline-flex items-center text-mystery-teal hover:text-white mb-6 font-medium transition-colors">
                    &larr; Volver al inicio
                </Link>

                {/* FONDO 2: Tarjeta del personaje en el color celeste pastel (Mystery Teal) */}
                <div className="bg-mystery-teal rounded-2xl shadow-xl overflow-hidden md:flex mb-8 border-none">
                    <img src={data.image} alt={data.name} className="w-full md:w-1/2 object-cover" />
                    <div className="p-8 md:w-1/2 flex flex-col justify-center">
                        <h1 className="text-4xl font-black text-tardis-blue mb-4">{data.name}</h1>
                        <div className="space-y-3 text-lg text-tardis-blue/80">
                            <p><strong className="text-tardis-blue">Estado:</strong> {data.status}</p>
                            <p><strong className="text-tardis-blue">Especie:</strong> {data.species}</p>
                            <p><strong className="text-tardis-blue">Género:</strong> {data.gender}</p>
                            <p><strong className="text-tardis-blue">Origen:</strong> {data.origin.name}</p>
                            <p><strong className="text-tardis-blue">Ubicación:</strong> {data.location.name}</p>
                        </div>
                    </div>
                </div>

                {/* Nuestro componente modularizado */}
                <CommentForm />

            </div>
        </div>
    )
}