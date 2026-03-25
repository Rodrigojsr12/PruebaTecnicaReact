import { useParams, Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'

const fetchCharacter = async (id: string) => {
    const response = await fetch(`https://rickandmortyapi.com/api/character/${id}`)
    if (!response.ok) throw new Error('Personaje no encontrado')
    return response.json()
}

export default function CharacterDetail() {
    const { id } = useParams<{ id: string }>()

    const { data, isLoading, isError } = useQuery({
        queryKey: ['character', id],
        queryFn: () => fetchCharacter(id!),
    })

    if (isLoading) return <div className="p-12 text-center text-xl font-semibold">Cargando detalles...</div>
    if (isError) return <div className="p-12 text-center text-red-500">Hubo un error al cargar el personaje.</div>

    return (
        <div className="min-h-screen bg-gray-50 p-6 md:p-12 font-sans">
            <div className="max-w-3xl mx-auto">
                <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6 font-medium">
                    &larr; Volver al inicio
                </Link>

                <div className="bg-white rounded-2xl shadow-lg overflow-hidden md:flex">
                    <img
                        src={data.image}
                        alt={data.name}
                        className="w-full md:w-1/2 object-cover"
                    />
                    <div className="p-8 md:w-1/2 flex flex-col justify-center">
                        <h1 className="text-4xl font-black text-gray-900 mb-4">{data.name}</h1>

                        <div className="space-y-3 text-lg text-gray-700">
                            <p><strong className="text-gray-900">Estado:</strong> {data.status}</p>
                            <p><strong className="text-gray-900">Especie:</strong> {data.species}</p>
                            <p><strong className="text-gray-900">Género:</strong> {data.gender}</p>
                            <p><strong className="text-gray-900">Origen:</strong> {data.origin.name}</p>
                            <p><strong className="text-gray-900">Ubicación actual:</strong> {data.location.name}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}