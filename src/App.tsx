import { Outlet } from "react-router-dom"
import Footer from "./components/Footer"
import Nav from "./components/Nav"

function App() {

    return (
        <main className="flex min-w-[320px]">
            <section className="sm:mr-[3.5rem]">
                <Nav />
            </section>
            <section className="mb-12 sm:m-0 flex-1 flex flex-col justify-between min-h-dvh">
                <section>
                    <Outlet />
                </section>
                <Footer />
            </section>
        </main>

    )
}

export default App
