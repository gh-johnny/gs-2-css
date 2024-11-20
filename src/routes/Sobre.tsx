import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const missionPoints = [
    {
        title: "Capacitar através da Tecnologia",
        description: "Oferecer soluções inovadoras em IoT que tornam os dados de consumo de energia acessíveis a todos.",
        icon: "💡"
    },
    {
        title: "Promover a Sustentabilidade",
        description: "Incentivar a adoção de práticas de energia verde por meio de insights baseados em dados.",
        icon: "🌿"
    },
    {
        title: "Fomentar a Comunidade",
        description: "Construir uma rede global de consumidores conscientes sobre energia, trabalhando em direção a um futuro sustentável.",
        icon: "🌍"
    }
]

const teamMembers = [
    {
        name: "Kayky Stiliano",
        role: "Fundador & CEO",
        image: "/placeholder.svg?height=100&width=100",
        bio: "Dedicado à trazer a melhor experiência para os usuários com produtos de alta qualidade."
    },
    {
        name: "João Marcelo",
        role: "Fundador & CTO",
        image: "/placeholder.svg?height=100&width=100",
        bio: "Apaixonados por tecnologia sustentável e seu potencial para transformar o mundo."
    }
]

export default function Sobre() {
    return (
        <div className="min-h-screen px-12">
            <header className="py-8">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl font-bold mb-2">Sobre <span className="text-emerald-600">EchoSphere</span></h1>
                    <p className="text-xl">Pioneirando a Conscientização sobre Energia Verde por meio de IoT</p>
                </div>
            </header>

            <main className="container mx-auto px-4 py-8">
                <section className="mb-16">
                    <Card className="overflow-hidden bg-background text-primary rounded">
                        <div className="md:flex">
                            <div className="md:w-1/2">
                                <img
                                    src="/img/company.jpeg"
                                    alt="EchoSphere office"
                                    className="w-full h-full lg:max-h-[30rem] object-cover"
                                />
                            </div>
                            <div className="md:w-1/2 p-6">
                                <CardHeader>
                                    <CardTitle className="text-2xl mb-4">Nossa história</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="mb-4">
                                        Fundada em 2020, a EchoSphere surgiu de uma ideia simples, mas poderosa: tornar o consumo de energia visível e compreensível para todos. Nossa equipe de especialistas dedicados combina tecnologia de ponta em IoT com uma paixão pela conservação ambiental.
                                    </p>
                                    <p>
                                        Hoje, estamos na vanguarda da revolução da energia verde, fornecendo dispositivos inteligentes e aplicativos intuitivos que empoderam indivíduos e empresas a assumirem o controle de seu consumo de energia e contribuírem para um mundo mais sustentável.
                                    </p>
                                </CardContent>
                            </div>
                        </div>
                    </Card>
                </section>

                <section className="mb-16">
                    <h2 className="text-3xl font-bold mb-6 text-center">Nossa Missão</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {missionPoints.map((point, index) => (
                            <Card key={index} className="rounded text-center bg-background text-primary">
                                <CardHeader>
                                    <CardTitle className="flex flex-col justify-center gap-4 items-center">
                                        <span className="text-3xl mr-2 mb-2">{point.icon}</span>
                                        <span>{point.title}</span>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p>{point.description}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </section>

                <section className="mb-16">
                    <Card className="rounded bg-background text-primary">
                        <div className="md:flex">
                            <div className="md:w-1/2 p-6">
                                <CardHeader>
                                    <CardTitle className="text-2xl text-emerald-600 mb-4">Nossa Abordagem</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <ul className="list-disc list-inside space-y-2">
                                        <li>Aproveitar a tecnologia de ponta da IoT</li>
                                        <li>Fornecer insights de energia acionáveis em tempo real</li>
                                        <li>Projetar interfaces intuitivas e fáceis de usar</li>
                                        <li>Inovar continuamente para maior eficiência</li>
                                        <li>Colaborar com fornecedores de energia e formuladores de políticas</li>
                                    </ul>
                                </CardContent>
                            </div>
                            <div className="md:w-1/2">
                                <img
                                    src="/img/device-black.jpeg"
                                    alt="EchoSphere device illustration"
                                    className="w-full h-full lg:max-h-[25rem] object-cover"
                                />
                            </div>
                        </div>
                    </Card>
                </section>

                <section className="mb-16">
                    <h2 className="text-3xl font-bold mb-6 text-center">Nosso Time</h2>
                    <div className="flex justify-center flex-wrap gap-6">
                        {teamMembers.map((member, index) => (
                            <Card key={index} className="bg-background text-primary rounded min-w-[470px] w-[470px] max-w-[470px]">
                                <CardHeader>
                                    <div className="flex flex-col items-center text-center">
                                        <Avatar className="w-24 h-24 mb-4">
                                            <AvatarImage src={member.image} alt={member.name} />
                                            <AvatarFallback className="bg-background border">{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                        </Avatar>
                                        <CardTitle>{member.name}</CardTitle>
                                        <p className="text-sm text-emerald-600 mt-1">{member.role}</p>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-center">{member.bio}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </section>
            </main>
        </div>
    )
}
