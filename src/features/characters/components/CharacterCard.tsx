import { Link } from 'react-router-dom'
import type { Character } from '../../../types/character'

interface CharacterCardProps {
    character: Character;
}


export const CharacterCard = ({ character }: CharacterCardProps) => {
    return (
        <Link to={`/character/${character.id}`} className="block hover:-translate-y-1 transition-transform duration-300 h-full">
            {/* Tarjetas con borde sutil peach y hover en rosa */}
            <article className="bg-white rounded-xl shadow-sm hover:shadow-lg overflow-hidden transition-all duration-300 border-2 border-brand-peach/30 hover:border-brand-pink h-full flex flex-col">
                <img
                    src={character.image}
                    alt={character.name}
                    className="w-full h-56 object-cover border-b-2 border-brand-peach/20"
                />
                <div className="p-5 flex-grow">
                    <h2 className="text-xl font-bold text-brand-brown mb-1 truncate" title={character.name}>
                        {character.name}
                    </h2>
                    <p className="text-sm text-gray-600 mb-1">
                        <span className="font-semibold text-brand-brown">Especie:</span> {character.species}
                    </p>
                    <p className="text-sm text-gray-600">
                        <span className="font-semibold text-brand-brown">Estado:</span>
                        {/* Estado "Alive" usando color brand-lime */}
                        <span className={`ml-1 inline-flex items-center gap-1 font-medium ${character.status === 'Alive' ? 'text-brand-lime' : character.status === 'Dead' ? 'text-red-500' : 'text-gray-500'}`}>
                            <span className={`w-2 h-2 rounded-full ${character.status === 'Alive' ? 'bg-brand-lime' : character.status === 'Dead' ? 'bg-red-500' : 'bg-gray-500'}`}></span>
                            {character.status}
                        </span>
                    </p>
                </div>
            </article>
        </Link>
    )
}