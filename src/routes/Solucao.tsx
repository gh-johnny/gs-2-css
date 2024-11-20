import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Star } from "lucide-react"

const solutions = [
    {
        id: 1,
        name: "G.A.C.O",
        features: [
            "Medidor inteligente que fornece dados de consumo de energia em tempo real",
            "Envio de dados para análise para plataforma gratuita",
            "Interface intuitiva",
            "Fácil de instalar",
            "Integração com o sistema central C.A.S.A",
        ],
        image: "/img/gaco.jpeg",
        price: "500,00",
        rating: 4.5
    },
    {
        id: 2,
        name: "C.A.S.A",
        features: [
            "Dispositivo inteligentes habilitado para otimizar o uso de energia",
            "Integração com dispositivos G.A.C.O para coleta de dados",
            "Solução rápida de problemas",
            "Monitoramento longo e extensivo",
            "Relaxe enquanto C.A.S.A cuida do seu consumo de energia"
        ],
        image: "/img/casa.jpeg",
        price: "1500,00",
        rating: 4.8
    },
    {
        id: 3,
        name: "T.E.C.O",
        features: [
            "Sistema fixo de coleta de dados em grande escala",
            "Conexão direta com dispositivos G.A.C.O",
            "Fácil monitoramento do consumo bairros, ruas etc.",
            "Moderno e fácil de instalar",
            "Recomendado para prefeituras ou donos de grandes condomínios ou prédios"
        ],
        image: "/img/teco.jpeg",
        price: "10.000,00",
        rating: 4.9
    }
]

function StarRating({ rating }: { rating: number }) {
    return (
        <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((star) => (
                <Star
                    key={star}
                    className={`w-5 h-5 ${star <= Math.round(rating) ? 'text-orange-400 fill-orange-400' : 'text-gray-300'
                        }`}
                />
            ))}
            <span className="ml-2 text-sm text-gray-600 mt-1">{rating.toFixed(1)}</span>
        </div>
    )
}

export default function Solucao() {
    return (
        <div className="min-h-screen px-12">
            <header className="text-white py-8">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl font-bold mb-2">Nossas Solução</h1>
                    <p className="text-xl">Dispositivos IoT Avançados para uma Gestão Energética Inteligente</p>
                </div>
            </header>

            <main className="container mx-auto px-4 py-8">
                <div className="space-y-8">
                    {solutions.map((solution) => (
                        <Card key={solution.id} className="overflow-hidden rounded">
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
                                    <CardContent className="flex-grow flex flex-col justify-between">
                                        <ul className="list-disc list-inside space-y-2 mb-4">
                                            {solution.features.map((feature, index) => (
                                                <li key={index} className="text-muted-foreground">{feature}</li>
                                            ))}
                                        </ul>
                                        <div className="flex-wrap flex justify-between gap-y-4 flex-row-reverse">
                                            <div className="w-full">
                                                <StarRating rating={solution.rating} />
                                            </div>
                                            <p className="text-nowrap text-lg font-bold w-full">
                                                Preço: R${solution.price}
                                            </p>
                                        </div>
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
