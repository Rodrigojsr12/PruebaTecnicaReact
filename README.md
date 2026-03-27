# 🛸 Rick & Morty — Prueba Técnica React

Aplicación web desarrollada como prueba técnica en **React + TypeScript**, que consume la [Rick and Morty API](https://rickandmortyapi.com/) para listar y explorar personajes, e integra [JSONPlaceholder](https://jsonplaceholder.typicode.com/) para demostrar el manejo de formularios con validación, operaciones CRUD completas y gestión de estado asíncrono.

---

## 🚀 Demo rápido

```bash
npm install
npm run dev
```

Abre [http://localhost:5173](http://localhost:5173) en tu navegador.

---

## ✨ Funcionalidades

### Nivel 1 — Consumo de API pública
- Listado paginado de personajes de Rick & Morty con búsqueda en tiempo real por nombre.
- Navegación a una página de detalle por personaje (imagen, estado, especie, género, origen, ubicación).
- Skeletons de carga y manejo de errores con mensajes descriptivos.
- **La paginación queda persistida en la URL** (`/?page=4`): al volver desde el detalle de un personaje se regresa exactamente a la misma página.

### Nivel 2 — Formulario validado con Zod
- Página `/community` con un formulario de comentarios conectado a JSONPlaceholder.
- Validación con **Zod + react-hook-form**: errores en tiempo real bajo cada campo.
- Envío vía **Axios** con feedback visual (toast de éxito / error y vista de confirmación con los datos enviados).

### Nivel 3 — CRUD completo con Axios y Zod
- Sección **"Bitácoras de Misión"** en la página de detalle de cada personaje.
- Operaciones **Crear, Listar, Editar y Eliminar** notas/posts conectadas a JSONPlaceholder.
- Formularios de creación y edición validados con **Zod** de forma independiente.
- Gestión optimista del caché con **TanStack Query**: la UI se actualiza de inmediato sin esperar confirmación del servidor.
- Interceptor global de Axios que muestra notificaciones de error automáticamente.

---

## 🗂️ Estructura del proyecto

```
src/
├── api/
│   └── axiosInstance.ts        # Cliente Axios con interceptor de errores
├── components/
│   └── ui/
│       └── CharacterSkeleton.tsx  # Skeletons de carga
├── features/
│   ├── characters/
│   │   ├── components/
│   │   │   └── CharacterCard.tsx
│   │   └── services/
│   │       └── character.service.ts   # Fetch a la Rick & Morty API
│   ├── comments/
│   │   ├── components/
│   │   │   └── CommentForm.tsx        # Formulario Nivel 2
│   │   └── schemas/
│   │       └── comment.schema.ts      # Schema Zod del comentario
│   └── notes/
│       ├── components/
│       │   └── CharacterNotes.tsx     # CRUD completo Nivel 3
│       ├── hooks/
│       │   └── useCharacterNotes.ts   # Lógica de React Query (C/R/U/D)
│       ├── schemas/
│       │   └── note.schema.ts         # Schema Zod de la nota
│       └── services/
│           └── note.service.ts        # Llamadas Axios a JSONPlaceholder
├── pages/
│   ├── Home.tsx           # Listado + búsqueda + paginación
│   ├── CharacterDetail.tsx # Detalle + CRUD de notas
│   └── Community.tsx      # Formulario de comentarios
├── types/
│   └── character.ts       # Tipos TypeScript de la API
└── App.tsx                # Rutas: /, /character/:id, /community
```

---

## 🧰 Stack tecnológico

| Tecnología | Versión | Uso |
|---|---|---|
| React | 19 | UI principal |
| TypeScript | 5.9 | Tipado estático completo |
| Vite | 5 | Bundler y dev server |
| React Router DOM | 7 | Navegación SPA con URL state |
| TanStack Query | 5 | Caché, fetching y estado asíncrono |
| Axios | 1 | Cliente HTTP para JSONPlaceholder |
| Zod | 4 | Validación de esquemas de formularios |
| react-hook-form | 7 | Manejo y registro de formularios |
| @hookform/resolvers | 5 | Integración Zod ↔ react-hook-form |
| react-hot-toast | 2 | Notificaciones de éxito / error |
| Tailwind CSS | 3 | Estilos utilitarios |

---

## 📡 APIs utilizadas

### Rick and Morty API
- **Base URL:** `https://rickandmortyapi.com/api`
- `GET /character?name={name}&page={page}` — Listado con búsqueda y paginación
- `GET /character/{id}` — Detalle de un personaje

### JSONPlaceholder
- **Base URL:** `https://jsonplaceholder.typicode.com`
- `GET /posts?userId={id}` — Listar notas del personaje
- `POST /posts` — Crear nota
- `PUT /posts/{id}` — Actualizar nota
- `DELETE /posts/{id}` — Eliminar nota
- `POST /comments` — Enviar comentario (Nivel 2)

> JSONPlaceholder es una API de prueba: acepta y responde a todas las peticiones (HTTP 200/201) pero no persiste los datos.

---

## 🔑 Decisiones técnicas destacadas

- **Paginación en URL**: Se usa `useSearchParams` para guardar la página en la URL (`/?page=4`). Al volver del detalle de un personaje con `navigate(-1)`, el navegador restaura exactamente la misma página en la que se estaba.

- **Gestión optimista del CRUD**: Las mutaciones de TanStack Query actualizan el caché local de inmediato (`setQueryData`). Si el servidor devuelve error (porque los IDs creados localmente no existen en JSONPlaceholder), el cambio se aplica igual en la UI y se muestra un warning informativo.

- **Interceptor de Axios**: Configurado en `axiosInstance.ts`, captura cualquier error HTTP y dispara automáticamente un `toast.error()`, evitando repetir lógica de manejo de errores en cada mutación.

- **Formularios completamente separados**: El formulario de comentarios (Nivel 2, `/community`) y el CRUD de bitácoras (Nivel 3, `/character/:id`) son features independientes, cada uno con su propio schema Zod, hook de formulario y servicio.

---

## 📦 Scripts disponibles

```bash
npm run dev      # Inicia el servidor de desarrollo en localhost:5173
npm run build    # Compila TypeScript y genera el bundle de producción
npm run preview  # Sirve el bundle de producción localmente
npm run lint     # Ejecuta ESLint sobre todo el proyecto
```

---

## 🛠️ Requisitos previos

- **Node.js** >= 18
- **npm** >= 9
