import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { CharacterSkeleton } from './components/CharacterSkeleton'

// Función para llamar a la API
const fetchCharacters = async (name: string) => {
  const response = await fetch(`https://rickandmortyapi.com/api/character/?name=${name}`)
  if (!response.ok) {
    throw new Error('No se encontraron personajes')
  }
  return response.json()
}

function App() {
  const [searchTerm, setSearchTerm] = useState('')

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['characters', searchTerm],
    queryFn: () => fetchCharacters(searchTerm),
    retry: false,
  })

  // Generamos un array de 8 elementos para mostrar 8 skeletons mientras carga
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
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full max-w-md px-5 py-3 rounded-full border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </header>

        {/* Manejo de Estados: Cargando, Error o Lista */}
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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {data?.results.map((character: any) => (
              <article key={character.id} className="bg-white rounded-xl shadow-sm hover:shadow-lg overflow-hidden transition-shadow border border-gray-100">
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
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default App