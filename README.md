
# Bitoink - Expense Tracker

Bitoink es una aplicación web Full-Stack diseñada para la gestión y control de finanzas personales. Permite a los usuarios llevar un registro riguroso de sus ingresos y gastos, definir objetivos de ahorro y visualizar de forma intuitiva la distribución de su dinero por categorías.

**Frontend Deploy:** [https://bitoink.netlify.app](https://bitoink.netlify.app)  
**Backend API:** [https://bitoink.onrender.com](https://bitoink.onrender.com)

---

## Características Principales

- **Autenticación Segura:** Registro e inicio de sesión de usuarios con protección de rutas mediante JSON Web Tokens (JWT).
- **Gestión de Gastos e Ingresos:** Creación, edición y eliminación de registros financieros clasificados por categorías.
- **Módulos de Ahorro:** Creación de objetivos de ahorro ("Huchas") para monitorizar el progreso financiero.
- **Categorización Inteligente:** Helper de categorías dinámico que asocia colores e iconos visuales personalizados (MUI) según el tipo de transacción.
- **Navegación Móvil Avanzada:** Interfaz optimizada para dispositivos móviles mediante un `DashboardLayout` con una barra de navegación inferior flotante, efectos de desenfoque (`backdropFilter`) y estados activos fluidos.
- **Persistencia de Sesión:** Sistema inteligente de autenticación que limpia caracteres residuales en tokens y mantiene la persistencia del perfil y avatar del usuario localmente evitando deslogueos innecesarios.

---

## Stack Tecnológico

### Backend
- **Node.js** & **Express** - Arquitectura del servidor y enrutamiento de API Restful.
- **MongoDB** & **Mongoose** - Base de datos NoSQL y modelado de datos.
- **CORS** - Configuración de seguridad integrada para peticiones desde orígenes cruzados.
- **Dotenv** - Gestión segura de variables de entorno.

### Frontend
- **React (Vite / CRA)** - Biblioteca principal para la interfaz de usuario.
- **Material UI (MUI)** - Framework de diseño y componentes estilizados.
- **React Router Dom** - Manejo de rutas del SPA y layouts anidados (`<Outlet />`).
- **Axios** - Cliente HTTP con interceptores avanzados para inyección automática de tokens de autorización y manejo centralizado de errores de autenticación (errores 401).

---

## Seguridad e Interceptores API
La aplicación cuenta con una capa de sincronización automática entre cliente y servidor:

Request Interceptor: Limpia las comillas dobles residuales del localStorage en el navegador y adjunta de forma automática el token en las cabeceras bajo el formato Bearer token.

Response Interceptor: Escucha activamente las respuestas del servidor. Si detecta un error 401 (No autorizado) o un token expirado, elimina de forma automática las credenciales locales y redirige de inmediato al usuario al /login.

Instalación y Configuración
Prerrequisitos
Node.js instalado (v16 o superior recomendado)

---

## Arquitectura del Proyecto (Puntos Clave)

Basado en la estructura del código, el proyecto sigue un patrón modular limpio:

```text
├── backend/
│   ├── config/             # Conexión a Base de Datos (db.js)
│   ├── middleware/         # Filtros de seguridad (authMiddleware.js)
│   ├── routes/             # Endpoints expuestos (/auth, /expenses, /savings)
│   └── app.js              # Punto de entrada del servidor Express
│
├── frontend/
│   ├── src/
│   │   ├── components/     # Layouts de la aplicación (DashboardLayout.jsx)
│   │   ├── context/        # Manejo del estado global (AuthProvider.jsx)
│   │   ├── helpers/        # Utilidades visuales (categoryHelpers.jsx)
│   │   ├── services/       # Cliente HTTP e interceptores (api.js)
│   │   └── utils/          # Limpieza de filtros y errores (ApiUtils.js)
