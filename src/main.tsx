import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Solucao from './routes/Solucao.tsx'
import Sobre from './routes/Sobre.tsx'
import Home from './routes/Home.tsx'
import Login from './routes/Login.tsx'
import Cadastrar from './routes/Cadastrar.tsx'

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
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
    },
    {
        path: "/cadastrar",
        element: <Cadastrar />,
    },
])

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>,
)
