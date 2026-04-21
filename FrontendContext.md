# Frontend Context

This document outlines the architecture, tech stack, directory structure, and established patterns for the **Villa Frontend** application. This serves as the single source of truth for frontend development context.

## 🚀 Tech Stack
- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/) (fast HMR, optimized builds)
- **Styling**: [Tailwind CSS v3](https://tailwindcss.com/) & PostCSS
- **Routing**: `react-router-dom` (Client-side routing)
- **Icons**: `lucide-react`
- **Linting**: ESLint

## 📂 Project Structure

```text
src/
├── components/     # UI components (Atomic and Section-based)
│   ├── common/     # Shared components (Header, Footer)
│   └── sections/   # Page sections (Hero, About, Catalog, Showcase)
├── layouts/        # Application layouts (MainLayout)
├── pages/          # Page components
│   ├── admin/      # Admin-only pages (Dashboard)
│   ├── LandingPage.jsx
│   └── LoginPage.jsx
├── services/       # API connection layers (api.js, publicApi)
├── assets/         # Images and icons
├── App.jsx         # Router & Auth configuration
├── index.css       # Global styles & Design System
└── main.jsx        # Entry point
```

## 🔐 Application Flow & Auth

The application is split into public information areas and a protected admin management portal.

**Routes:**
- `/`: Public Landing Page & Property Catalog.
- `/login`: Admin authentication portal.
- `/admin/dashboard`: Protected dashboard for property management (Requires valid JWT token).

**Authentication Pattern:**
- Uses `PrivateRoute` wrapper in `App.jsx` to guard admin routes.
- Token is stored in `localStorage` and managed via the `api.js` service.
- Separation of `api` (Authenticated) and `publicApi` (Public) ensures security.

## 🔌 API Integration & Data Fetching (Clean Architecture)

We follow a layered approach for data fetching to ensure separation of concerns and maintainability.

### 1. Base Layer (`src/services/api.js`)
A standardized wrapper for the `fetch` API.
- `publicApi`: For non-authenticated requests (e.g., fetching villa list).
- `api`: For authenticated requests (e.g., admin operations, includes JWT).

### 2. Service Layer (`src/services/villaService.js`)
Acts as a Repository/Service in Clean Architecture.
- Abstracts raw endpoint URLs (e.g., `/villas`).
- Provides semantic methods for components: `getVillas()`, `createVilla()`, etc.
- Prevents UI components from knowing about backend routing details.

### 3. Presentation Layer (UI Components)
Components like `Catalog.jsx` and `Dashboard.jsx` consume the service layer.
- **Loading Management**: Uses `loading` states to trigger Skeleton UIs or Spinners (e.g., `Loader2` from `lucide-react`), preventing layout shifts and "blank" screens.
- **Error Handling**: Implements `try-catch` blocks with user-friendly error messages displayed within the UI context.

**Environment Variables:**
- Local API Base URL is defined in `.env` using Vite's required prefix: `VITE_API_URL="http://localhost:8000/api"`

**Example Implementation Pattern:**
```javascript
useEffect(() => {
  const loadData = async () => {
    try {
      setLoading(true);
      const data = await villaService.getVillas();
      setData(data);
    } catch (err) {
      setError("Failed to load data");
    } finally {
      setLoading(false);
    }
  };
  loadData();
}, []);
```

## 🛠️ Development Server

- **Start Local Server**: `npm run dev` (Runs on `http://localhost:5173/` by default)
- **Production Build**: `npm run build`
- **Preview Build**: `npm run preview`

## 🔮 Next Steps & Recommendations

1. **Pages & Components**: Establish `src/pages/` and `src/components/` directories for modular UI organization.
2. **Context/State**: Set up a React Context (or Zustand/Redux) in a `src/context/` or `src/store/` directory if global state management is needed (e.g., Auth State).
3. **Router Setup**: Define the application routes inside `App.jsx` using `react-router-dom`'s `<BrowserRouter>`.

## Notes 
- The base URL for API calls can be found in the `.env` file.
- The `fetchApi` function in `src/services/api.js` is the main entry point for making API calls. It handles token injection and error handling automatically.
- Use a Clean Architecture approach for the frontend and components based architecture.
- Always update FrontendContext.md when making changes to the frontend.