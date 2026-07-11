# MixMaster 🍸

MixMaster is a single-page React application for discovering cocktail recipes. It searches [TheCocktailDB](https://www.thecocktaildb.com/api.php) API, shows drink details (ingredients, measures, glass, instructions), and lets visitors sign up for a newsletter.

## Features

- **Search cocktails** by name, powered by TheCocktailDB API
- **Cocktail details** — ingredients with measures, category, glass, and preparation instructions
- **Newsletter signup** form with success/error toasts
- **Client-side routing** via React Router data routers (loaders + actions)
- **Data caching** with React Query — search and detail queries are cached and shared between route loaders and components, so navigating back doesn't re-fetch already-loaded data
- **404 / error pages** for unknown routes and failed data loads

## Tech stack

- [React 18](https://react.dev/) + [Vite](https://vitejs.dev/)
- [React Router 6](https://reactrouter.com/) (loaders, actions, `RouterProvider`)
- [TanStack React Query 4](https://tanstack.com/query/v4) for data fetching/caching
- [Axios](https://axios-http.com/) for HTTP requests
- [styled-components](https://styled-components.com/) for styling
- [React Toastify](https://fkhadra.github.io/react-toastify/) for notifications

## Prerequisites

- Node.js 16+ and npm

## Install and Setup

```bash
npm install
npm run dev
```

The app runs at `http://localhost:5173` by default.

## Available scripts

| Command           | Description                              |
| ------------------ | ----------------------------------------- |
| `npm run dev`       | Start the Vite dev server with HMR         |
| `npm run build`     | Type/bundle-check and build for production |
| `npm run preview`   | Preview the production build locally       |

## Project structure

```
src/
├── assets/wrappers/   # styled-components wrappers per page/component
├── components/        # CocktailCard, CocktailList, Navbar, SearchForm
├── pages/              # Landing, Cocktail, About, NewsLetter, Error pages
├── App.jsx             # QueryClientProvider + RouterProvider
├── router.jsx          # createBrowserRouter route tree, loaders/actions
├── queryClient.js       # shared React Query client instance
└── main.jsx             # app entry point
```

## APIs used

- `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=` — cocktail search
- `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=` — cocktail details
- `https://www.course-api.com/cocktails-newsletter` — newsletter signup

No API keys or environment variables are required.

## Data fetching & caching

`src/queryClient.js` exports a single `QueryClient` instance (5 minute `staleTime`) that is shared by:

- `App.jsx`, via `QueryClientProvider`, so components' `useQuery` calls read from it
- `router.jsx`, which passes it into each route's `loader` so `queryClient.ensureQueryData(...)` pre-fetches data before the route renders

Because loaders and components use the **same** client instance and the **same** query keys, data fetched during navigation is immediately available to the page component without a second network request.

## Concepts

**SPA (Single-Page Application):** the app loads once and updates content dynamically without full page reloads, fetching data and re-rendering as the user navigates.

**React Router:** provides declarative, data-driven routing — route `loader`s fetch data before a page renders, and `action`s handle form submissions (e.g. the newsletter form).
