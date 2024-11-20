import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from 'lucide-react'

const slides = [
    {
        image: "/placeholder.svg?height=400&width=800",
        title: "Empowering Green Energy",
        description: "Innovative IoT solutions for a sustainable future"
    },
    {
        image: "/placeholder.svg?height=400&width=800",
        title: "Monitor Your Impact",
        description: "Real-time energy consumption tracking at your fingertips"
    },
    {
        image: "/placeholder.svg?height=400&width=800",
        title: "Reduce, Save, Thrive",
        description: "Lower your carbon footprint and energy bills simultaneously"
    }
]

const solutions = [
    {
        title: "EnergyPulse",
        description: "Smart meter that provides real-time energy consumption data",
        image: "/placeholder.svg?height=200&width=300"
    },
    {
        title: "GreenSwitch",
        description: "IoT-enabled smart switches to optimize energy usage",
        image: "/placeholder.svg?height=200&width=300"
    },
    {
        title: "EcoTrack",
        description: "Mobile app for monitoring and managing your energy consumption",
        image: "/placeholder.svg?height=200&width=300"
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
        <div className="min-h-screen">
            <header className="text-white py-8">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl font-bold mb-2">Home</h1>
                    <p className="text-xl">Advanced IoT Gadgets for Comprehensive Energy Management</p>
                </div>
            </header>

            <main className="container mx-auto px-4 py-8">
                <section className="mb-12 relative">
                    <div className="relative h-[400px] overflow-hidden rounded-lg">
                        {slides.map((slide, index) => (
                            <div
                                key={index}
                                className={`absolute top-0 left-0 w-full h-full transition-opacity duration-500 ${index === currentSlide ? 'opacity-100' : 'opacity-0'
                                    }`}
                            >
                                <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
                                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4">
                                    <h2 className="text-2xl font-bold mb-2">{slide.title}</h2>
                                    <p>{slide.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <Button
                        variant="outline"
                        size="icon"
                        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white"
                        onClick={() => setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length)}
                    >
                        <ChevronLeft className="h-4 w-4" />
                        <span className="sr-only">Previous slide</span>
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white"
                        onClick={() => setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length)}
                    >
                        <ChevronRight className="h-4 w-4" />
                        <span className="sr-only">Next slide</span>
                    </Button>
                </section>

                <section className="mb-12">
                    <h2 className="text-2xl font-bold mb-4">Our IoT Solutions</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {solutions.map((solution, index) => (
                            <Card key={index}>
                                <CardHeader>
                                    <CardTitle>{solution.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <img src={solution.image} alt={solution.title} className="w-full h-48 object-cover mb-4 rounded-md" />
                                    <CardDescription>{solution.description}</CardDescription>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </section>
            </main>
        </div>
    )
}
