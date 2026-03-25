import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { CharacterSkeleton } from '../components/CharacterSkeleton'

// 1. Modificamos la función para que reciba la página además del nombre
const fetchCharacters = async (name: string, page: number) => {
    const response = await fetch(`https://rickandmortyapi.com/api/character/?name=${name}&page=${page}`)
    if (!response.ok) {
        throw new Error('No se encontraron personajes')
    }
    return response.json()
}

export default function Home() {
    const [searchTerm, setSearchTerm] = useState('')
    // 2. Agregamos un estado para controlar la página actual (inicia en 1)
    const [page, setPage] = useState(1)

    // 3. React Query ahora escucha cambios tanto en searchTerm como en page
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['characters', searchTerm, page],
        queryFn: () => fetchCharacters(searchTerm, page),
        retry: false,
    })

    // Función para manejar la búsqueda (siempre reseteamos a la página 1 al buscar)
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value)
        setPage(1)
    }

    const skeletons = Array.from({ length: 8 })

    return (
        <div className="min-h-screen bg-gray-50 text-gray-800 p-6 md:p-12 font-sans">
            <div className="max-w-6xl mx-auto">

                {/* Encabezado y Buscador */}
                <header className="mb-10 text-center">
                    <h1 className="text-4xl font-extrabold text-slate-900 mb-6 tracking-tight">
                        Rick and Morty API
                    </h1>
                    <input
                        type="text"
                        placeholder="Buscar personaje (ej. Rick, Morty, Summer)..."
                        value={searchTerm}
                        onChange={handleSearch}
                        className="w-full max-w-md px-5 py-3 rounded-full border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                </header>

                {isLoading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {skeletons.map((_, index) => (
                            <CharacterSkeleton key={index} />
                        ))}
                    </div>
                ) : isError ? (
                    <div className="text-center text-red-500 font-medium bg-red-50 p-6 rounded-lg border border-red-200">
                        {error instanceof Error ? error.message : 'Error desconocido'}
                    </div>
                ) : (
                    <>
                        {/* Lista de Personajes con Link de React Router */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-10">
                            {data?.results.map((character: any) => (
                                // Aquí aplicamos el Link para envolver la tarjeta
                                <Link to={`/character/${character.id}`} key={character.id} className="block hover:-translate-y-1 transition-transform duration-300">
                                    <article className="bg-white rounded-xl shadow-sm hover:shadow-lg overflow-hidden border border-gray-100 h-full">
                                        <img
                                            src={character.image}
                                            alt={character.name}
                                            className="w-full h-56 object-cover"
                                        />
                                        <div className="p-5">
                                            <h2 className="text-xl font-bold text-gray-900 mb-1 truncate" title={character.name}>
                                                {character.name}
                                            </h2>
                                            <p className="text-sm text-gray-600 mb-1">
                                                <span className="font-semibold">Especie:</span> {character.species}
                                            </p>
                                            <p className="text-sm text-gray-600">
                                                <span className="font-semibold">Estado:</span>
                                                <span className={`ml-1 inline-flex items-center gap-1 ${character.status === 'Alive' ? 'text-green-600' : character.status === 'Dead' ? 'text-red-600' : 'text-gray-500'}`}>
                                                    <span className={`w-2 h-2 rounded-full ${character.status === 'Alive' ? 'bg-green-600' : character.status === 'Dead' ? 'bg-red-600' : 'bg-gray-500'}`}></span>
                                                    {character.status}
                                                </span>
                                            </p>
                                        </div>
                                    </article>
                                </Link>
                            ))}
                        </div>

                        {/* 4. Controles de Paginación */}
                        <div className="flex justify-center items-center gap-4">
                            <button
                                onClick={() => setPage((old) => Math.max(old - 1, 1))}
                                disabled={!data.info.prev} // Deshabilitamos si no hay página anterior
                                className="px-6 py-2 bg-white border border-gray-300 rounded-lg shadow-sm text-gray-700 font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                Anterior
                            </button>

                            <span className="text-gray-600 font-medium">
                                Página {page} de {data.info.pages}
                            </span>

                            <button
                                onClick={() => setPage((old) => (data.info.next ? old + 1 : old))}
                                disabled={!data.info.next} // Deshabilitamos si no hay página siguiente
                                className="px-6 py-2 bg-blue-600 border border-transparent rounded-lg shadow-sm text-white font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                Siguiente
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}