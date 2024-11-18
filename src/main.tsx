import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Solucao from './routes/Solucao.tsx'
import Sobre from './routes/Sobre.tsx'
import Home from './routes/Home.tsx'
import Login from './routes/Login.tsx'
import Cadastrar from './routes/Cadastrar.tsx'
import NotFound from './routes/NotFound.tsx'

import { ErrorBoundary } from 'react-error-boundary'

import './index.css'
import Error from './routes/Error.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorBoundary fallback={<Error />} children={<Error />} />,
        children: [
            {
                path: "",
                element: <Home />,
            },
            {
                path: "solucao",
                element: <Solucao />,
            },
            {
                path: "sobre",
                element: <Sobre />,
            },
        ],
    },
    {
        path: "/login",
        element: <Login />,
        errorElement: <ErrorBoundary fallback={<Error />} children={<Error />} />,
    },
    {
        path: "/cadastrar",
        element: <Cadastrar />,
        errorElement: <ErrorBoundary fallback={<Error />} children={<Error />} />,
    },
    {
        path: "*",
        element: <NotFound />,
    }
], {
    future: {
        v7_fetcherPersist: true,
        v7_normalizeFormMethod: true,
        v7_partialHydration: true,
        v7_relativeSplatPath: true,
        v7_skipActionErrorRevalidation: true,
    }
})

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} future={{ v7_startTransition: true }} />
        </QueryClientProvider>
    </StrictMode>,
)
