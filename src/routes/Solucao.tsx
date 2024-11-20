import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const solutions = [
    {
        id: 1,
        name: "G.A.C.O",
        features: [
            "Monitoramento de ambiente em tempo real",
            "Envio de dados para análise para plataforma gratuita",
            "Interface intuitiva",
            "Fácil de instalar",
            "Integração com o sistema central C.A.S.A",
        ],
        image: "/img/gaco.jpeg",
        price: 49.99
    },
    {
        id: 2,
        name: "C.A.S.A",
        features: [
            "Sistema central inteligente automático para evitar desperdícios",
            "Integração com dispositivos G.A.C.O para coleta de dados",
            "Solução rápida de problemas",
            "Monitoramento longo e extensivo",
            "Relaxe enquanto C.A.S.A cuida do seu consumo de energia"
        ],
        image: "/img/casa.jpeg",
        price: 329.99
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
        price: 119.99
    }
]

export default function Solucao() {
    return (
        <div className="min-h-screen">
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
                                    <CardContent className="flex-grow">
                                        <ul className="list-disc list-inside space-y-2 mb-4">
                                            {solution.features.map((feature, index) => (
                                                <li key={index} className="text-gray-600">{feature}</li>
                                            ))}
                                        </ul>
                                        <p className="text-lg font-bold text-green-600">
                                            Preço: R${solution.price.toFixed(2).toString().replace(".", ",")}
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
