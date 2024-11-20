import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from 'lucide-react'

const slides = [
    {
        image: "/img/girl-wild.jpg",
        title: "Energia verde para todos",
        description: "Soluções IoT inovadoras para um futuro melhor e mais barato"
    },
    {
        image: "/img/plantbulb.jpg",
        title: "Monitore seu impacto",
        description: "Monitoramento em tempo real do consumo de energia na ponta dos dedos."
    },
    {
        image: "/img/planet-money.jpg",
        title: "Gaste menos e viva mais",
        description: "Reduza sua pegada de carbono e suas contas de energia simultaneamente."
    }
]

const solutions = [
    {
        title: "G.A.C.O",
        description: "Medidor inteligente que fornece dados de consumo de energia em tempo real",
        image: "/img/gaco.jpeg"
    },
    {
        title: "C.A.S.A",
        description: "Dispositivo inteligente habilitado para otimizar o uso de energia",
        image: "/img/casa.jpeg"
    },
    {
        title: "T.E.C.O",
        description: "Dispositivo de monitoramento de consumo de energia em larga escala",
        image: "/img/teco.jpeg"
    }
]

export default function Home() {
    const [currentSlide, setCurrentSlide] = useState(0)

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length)
        }, 5000)
        return () => clearInterval(timer)
    }, [])

    return (
        <div className="min-h-screen px-12">
            <header className="py-8">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl text-emerald-600 font-bold mb-2">EchoSphere</h1>
                    <p className="text-xl">Dispositivos IoT Avançados para uma Gestão Energética Inteligente</p>
                </div>
            </header>

            <main className="container mx-auto px-4 py-8">
                <section className="mb-12 relative border rounded overflow-hidden">
                    <div className="relative h-[400px] overflow-hidden rounded-lg">
                        {slides.map((slide, index) => (
                            <div
                                key={index}
                                className={`absolute top-0 left-0 w-full h-full transition-opacity duration-500 ${index === currentSlide ? 'opacity-100' : 'opacity-0'
                                    }`}
                            >
                                <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
                                <div className="absolute bottom-0 left-0 right-0 bg-primary text-white p-4">
                                    <h2 className="text-2xl font-bold mb-2">{slide.title}</h2>
                                    <p>{slide.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <Button
                        size="icon"
                        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-foreground rounded-full"
                        onClick={() => setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length)}
                    >
                        <ChevronLeft className="text-white h-4 w-4" />
                        <span className="sr-only">Slide anterior</span>
                    </Button>
                    <Button
                        size="icon"
                        className="text-white absolute top-1/2 right-4 transform -translate-y-1/2 bg-muted-foreground rounded-full"
                        onClick={() => setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length)}
                    >
                        <ChevronRight className="h-4 w-4" />
                        <span className="sr-only">Próximo slide</span>
                    </Button>
                </section>

                <section className="mb-12">
                    <h2 className="text-2xl font-bold mb-4">Nossas Soluções IoT</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {solutions.map((solution, index) => (
                            <Card key={index} className='rounded bg-white bg-background text-foreground'>
                                <CardHeader>
                                    <CardTitle className='text-emerald-600'>{solution.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <img
                                        src={solution.image}
                                        alt={solution.title}
                                        className="w-full h-48 object-cover mb-4 rounded border"
                                    />
                                    <CardDescription className='text-foreground'>{solution.description}</CardDescription>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </section>
            </main>
        </div>
    )
}
