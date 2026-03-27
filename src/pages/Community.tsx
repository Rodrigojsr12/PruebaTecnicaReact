import { Link } from 'react-router-dom'
import { CommentForm } from '../features/comments/components/CommentForm'

export default function Community() {
    return (
        <div className="min-h-screen bg-tardis-blue p-6 md:p-12 font-sans">
            <div className="max-w-2xl mx-auto">
                <Link
                    to="/"
                    className="inline-flex items-center text-mystery-teal hover:text-white mb-8 font-medium transition-colors"
                >
                    ← Volver al inicio
                </Link>

                <header className="mb-10">
                    <h1 className="text-4xl font-extrabold text-texas-yellow mb-3 tracking-tight">
                        Comunidad
                    </h1>
                </header>

                {/* Formulario de Nivel 2: solo create, sin CRUD completo */}
                <CommentForm />


            </div>
        </div>
    )
}
