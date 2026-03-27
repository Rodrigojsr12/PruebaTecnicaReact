// src/pages/Home.tsx
import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { fetchCharacters } from '../features/characters/services/character.service'
import { CharacterCard } from '../features/characters/components/CharacterCard'
import { CharacterSkeleton } from '../components/ui/CharacterSkeleton'

export default function Home() {
    const [searchTerm, setSearchTerm] = useState('')
    const [searchParams, setSearchParams] = useSearchParams()
    const page = Number(searchParams.get('page') ?? '1')

    const setPage = (updater: number | ((prev: number) => number)) => {
        const next = typeof updater === 'function' ? updater(page) : updater
        setSearchParams(prev => {
            const p = new URLSearchParams(prev)
            p.set('page', String(next))
            return p
        })
    }

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['characters', searchTerm, page],
        queryFn: () => fetchCharacters(searchTerm, page),
        retry: false,
    })

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value)
        setSearchParams({ page: '1' })
    }

    const skeletons = Array.from({ length: 8 })

    return (
        <div className="min-h-screen bg-brand-peach/30 text-brand-brown p-6 md:p-12 font-sans">
            <div className="max-w-6xl mx-auto">
                <header className="mb-10">
                    <div className="flex items-center justify-between mb-6">
                        <h1 className="text-4xl font-extrabold text-brand-brown tracking-tight">Rick and Morty API</h1>
                        <Link
                            to="/community"
                            className="flex items-center gap-2 px-5 py-2.5 bg-brand-brown text-white rounded-full font-bold hover:bg-black transition-colors shadow-md text-sm"
                        >
                            💬 Comunidad
                        </Link>
                    </div>
                    <div className="text-center">
                        <input
                            type="text"
                            placeholder="Buscar personaje..."
                            value={searchTerm}
                            onChange={handleSearch}
                            className="w-full max-w-md px-5 py-3 rounded-full border-2 border-brand-peach/50 shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-pink focus:border-transparent transition-all"
                        />
                    </div>
                </header>

                {isLoading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {skeletons.map((_, i) => <CharacterSkeleton key={i} />)}
                    </div>
                ) : isError ? (
                    <div className="text-center text-red-500 font-medium bg-red-50 p-6 rounded-lg border border-red-200">
                        {error instanceof Error ? error.message : 'Error desconocido'}
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-10">
                            {data?.results.map((character) => (
                                <CharacterCard key={character.id} character={character} />
                            ))}
                        </div>

                        <div className="flex justify-center items-center gap-4">
                            <button
                                onClick={() => setPage((old) => Math.max(old - 1, 1))}
                                disabled={!data?.info.prev}
                                className="px-6 py-2 bg-white border-2 border-brand-peach/30 rounded-lg text-brand-brown font-medium hover:bg-brand-peach/20 disabled:opacity-50 transition-colors"
                            >
                                Anterior
                            </button>
                            <span className="text-brand-brown font-bold">Página {page} de {data?.info.pages}</span>
                            <button
                                onClick={() => setPage((old) => (data?.info.next ? old + 1 : old))}
                                disabled={!data?.info.next}
                                className="px-6 py-2 bg-brand-brown text-white rounded-lg font-medium hover:bg-black disabled:opacity-50 transition-colors shadow-md"
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