# 🛸 Prueba Técnica - Frontend Developer (Rick and Morty API)

Esta es una aplicación web de una sola página (SPA) desarrollada como parte de una prueba técnica para el rol de Frontend Developer. El proyecto consume la **API pública de Rick and Morty** para mostrar un listado interactivo de personajes, sus detalles y un formulario de comentarios simulado.

## 🛠️ Tecnologías y Herramientas Utilizadas

* **Framework:** React 18 (Inicializado con Vite y TypeScript).
* **Routing:** React Router DOM (Navegación entre lista y vista de detalle).
* **Data Fetching & Caché:** TanStack React Query (Manejo de estado asíncrono y caché global).
* **Estilos:** Tailwind CSS v3 (Diseño responsivo Mobile-First y paleta de colores personalizada).
* **Formularios:** React Hook Form (Rendimiento optimizado sin re-renders innecesarios).
* **Validación:** Zod (Esquemas de validación estrictos tipados).

## 🚀 Progreso y Niveles Completados

### Nivel 1 - Básico ✅
- [x] Consumo de la API de Rick and Morty.
- [x] Implementación de `useQuery` de React Query para traer la data.
- [x] Interfaz responsiva (Grid de Tailwind).
- [x] Skeletons dinámicos (`animate-pulse`) para los tiempos de carga.
- [x] Filtro de búsqueda en tiempo real por nombre de personaje.
- [x] Uso de Gitmojis en el historial de commits.
- [x] Gestión por ramas (`nivel-1`).

### Nivel 2 - Intermedio ✅
- [x] Implementación de vistas dinámicas con React Router.
- [x] Vista de detalle por personaje (`/character/:id`).
- [x] Paginación dinámica conectada con los endpoints de la API (`prev` y `next`).
- [x] Formulario interactivo en la vista de detalles.
- [x] Validación de campos (Nombre, Email, Comentario) interceptando errores con Zod y React Hook Form.
- [x] Gestión por ramas (`nivel-2`).

### 🏗️ Arquitectura Escalable (Feature-Sliced Design)
Aunque es un requerimiento avanzado, el proyecto ya cuenta con una arquitectura modular basada en "Features" (características) para garantizar la escalabilidad:

```text
src/
├── components/       # Componentes UI globales (ej. Skeletons)
├── features/         # Módulos encapsulados por dominio
│   ├── characters/   # Lógica, servicios y UI de personajes
│   └── comments/     # Formularios y esquemas de validación Zod
├── pages/            # Vistas principales conectadas al Router
└── ...

## 🎨 Paleta de Colores UI

Se implementó un tema visual personalizado inspirado en la paleta de colores de Rick and Morty, configurada directamente en el archivo `tailwind.config.js`:
* `tardis-blue`: Fondo principal oscuro.
* `mystery-teal`: Fondo de tarjetas de detalles.
* `texas-yellow`: Contenedores secundarios (formularios).
* `kiwi-green`: Botones y llamadas a la acción (CTA).
* `calla-green`: Textos de contraste y etiquetas.

---

## 💻 Instalación y Uso Local

Para correr este proyecto en tu entorno local, sigue estos pasos:

1. Clona este repositorio:
   ```bash
   git clone [https://github.com/tu-usuario/prueba-tecnica-react.git](https://github.com/tu-usuario/prueba-tecnica-react.git)

2. Accede a la carpeta del proyecto:
```bash
   cd prueba-tecnica-react

3. Instala las dependencias necesarias:
  ```bash
   npm install

4. Levanta el servidor de desarrollo:
  ```bash
   npm run dev

