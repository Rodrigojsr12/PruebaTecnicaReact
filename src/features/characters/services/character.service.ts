export const fetchCharacters = async (name: string, page: number) => {
    const response = await fetch(`https://rickandmortyapi.com/api/character/?name=${name}&page=${page}`)
    if (!response.ok) throw new Error('No se encontraron personajes')
    return response.json()
}

export const fetchCharacterById = async (id: string) => {
    const response = await fetch(`https://rickandmortyapi.com/api/character/${id}`)
    if (!response.ok) throw new Error('Personaje no encontrado')
    return response.json()
}