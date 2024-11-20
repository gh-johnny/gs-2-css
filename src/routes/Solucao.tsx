import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const solutions = [
    {
        id: 1,
        name: "EnergyPulse",
        features: [
            "Real-time energy consumption monitoring",
            "Machine learning for usage pattern analysis",
            "Intuitive mobile app and web interface",
            "Predictive billing and anomaly detection",
            "Smart home system integration"
        ],
        image: "/placeholder.svg?height=600&width=400",
        price: 129.99
    },
    {
        id: 2,
        name: "GreenSwitch",
        features: [
            "IoT-enabled smart switch system",
            "Automatic standby power reduction",
            "Mesh network for whole-home management",
            "HVAC and solar panel integration",
            "Sleek, modern design"
        ],
        image: "/placeholder.svg?height=600&width=400",
        price: 49.99
    },
    {
        id: 3,
        name: "EcoTrack",
        features: [
            "Portable, professional-grade energy analyzer",
            "Spectral analysis for detailed energy insights",
            "Early issue detection (power factor, harmonics)",
            "Long-lasting battery for extended monitoring",
            "Comprehensive reporting software"
        ],
        image: "/placeholder.svg?height=600&width=400",
        price: 89.99
    }
]

export default function Solucao() {
    return (
        <div className="min-h-screen">
            <header className="text-white py-8">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl font-bold mb-2">Our Solutions</h1>
                    <p className="text-xl">Advanced IoT Gadgets for Comprehensive Energy Management</p>
                </div>
            </header>

            <main className="container mx-auto px-4 py-8">
                <div className="space-y-8">
                    {solutions.map((solution) => (
                        <Card key={solution.id} className="overflow-hidden">
                            <div className="md:flex">
                                <div className="md:w-1/3">
                                    <img
                                        src={solution.image}
                                        alt={solution.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="md:w-2/3 p-6 flex flex-col">
                                    <CardHeader>
                                        <CardTitle className="text-2xl mb-2">{solution.name}</CardTitle>
                                    </CardHeader>
                                    <CardContent className="flex-grow">
                                        <ul className="list-disc list-inside space-y-2 mb-4">
                                            {solution.features.map((feature, index) => (
                                                <li key={index} className="text-gray-600">{feature}</li>
                                            ))}
                                        </ul>
                                        <p className="text-lg font-bold text-green-600">
                                            Price: ${solution.price.toFixed(2)}
                                        </p>
                                    </CardContent>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </main>
        </div>
    )
}
