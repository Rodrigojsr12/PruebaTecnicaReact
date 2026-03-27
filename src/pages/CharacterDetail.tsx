import { useParams, Link, useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { fetchCharacterById } from '../features/characters/services/character.service'
import { CharacterNotes } from '../features/notes/components/CharacterNotes'
import { CharacterDetailSkeleton } from '../components/ui/CharacterSkeleton'

export default function CharacterDetail() {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()

    const { data, isLoading, isError } = useQuery({
        queryKey: ['character', id],
        queryFn: () => fetchCharacterById(id!),
    })

    if (isLoading) {
        return (
            <div className="min-h-screen bg-tardis-blue p-6 md:p-12 font-sans">
                <div className="max-w-3xl mx-auto">
                    <div className="h-6 w-32 bg-mystery-teal/40 rounded mb-6 animate-pulse" />
                    <CharacterDetailSkeleton />
                </div>
            </div>
        )
    }

    if (isError || !data) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-tardis-blue">
                <p className="text-red-400 text-xl font-semibold">Error al cargar el personaje.</p>
                <Link to="/" className="text-mystery-teal hover:text-white transition-colors">
                    ← Volver al inicio
                </Link>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-tardis-blue p-6 md:p-12 font-sans">
            <div className="max-w-3xl mx-auto">
                <button
                    onClick={() => navigate(-1)}
                    className="inline-flex items-center text-mystery-teal hover:text-white mb-6 font-medium transition-colors"
                >
                    ← Volver al inicio
                </button>

                {/* Tarjeta del personaje */}
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

                {/* CRUD dinámico con Axios y JSONPlaceholder (Level 3) */}
                <CharacterNotes characterId={Number(id)} />
            </div>
        </div>
    )
}