import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const missionPoints = [
  {
    title: "Empower Through Technology",
    description: "Provide innovative IoT solutions that make energy consumption data accessible to everyone.",
    icon: "💡"
  },
  {
    title: "Promote Sustainability",
    description: "Encourage the adoption of green energy practices through data-driven insights.",
    icon: "🌿"
  },
  {
    title: "Foster Community",
    description: "Build a global network of energy-conscious consumers working towards a sustainable future.",
    icon: "🌍"
  }
]

const teamMembers = [
  {
    name: "Emma Green",
    role: "CEO & Founder",
    image: "/placeholder.svg?height=100&width=100",
    bio: "Passionate about sustainable technology and its potential to change the world."
  },
  {
    name: "Michael Watts",
    role: "CTO",
    image: "/placeholder.svg?height=100&width=100",
    bio: "Expert in IoT solutions with a focus on energy-efficient systems."
  },
  {
    name: "Sophia Chen",
    role: "Head of Product",
    image: "/placeholder.svg?height=100&width=100",
    bio: "Dedicated to creating user-friendly products that make a positive impact."
  }
]

export default function Sobre() {
  return (
    <div className="min-h-screen">
      <header className="text-white py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-2">About EchoSphere</h1>
          <p className="text-xl">Pioneering Green Energy Awareness Through IoT</p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <section className="mb-12">
          <Card className="overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2">
                <img 
                  src="/placeholder.svg?height=400&width=600" 
                  alt="EchoSphere office" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="md:w-1/2 p-6">
                <CardHeader>
                  <CardTitle className="text-2xl mb-4">Our Story</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">
                    Founded in 2020, EchoSphere emerged from a simple yet powerful idea: make energy consumption visible and understandable to everyone. Our team of dedicated experts combines cutting-edge IoT technology with a passion for environmental conservation.
                  </p>
                  <p>
                    Today, we're at the forefront of the green energy revolution, providing smart devices and intuitive apps that empower individuals and businesses to take control of their energy usage and contribute to a more sustainable world.
                  </p>
                </CardContent>
              </div>
            </div>
          </Card>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-center">Our Mission</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {missionPoints.map((point, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <span className="text-4xl mr-2">{point.icon}</span>
                    {point.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{point.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <Card>
            <div className="md:flex">
              <div className="md:w-1/2 p-6">
                <CardHeader>
                  <CardTitle className="text-2xl mb-4">Our Approach</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Leverage cutting-edge IoT technology</li>
                    <li>Provide real-time, actionable energy insights</li>
                    <li>Design user-friendly, intuitive interfaces</li>
                    <li>Continuously innovate for greater efficiency</li>
                    <li>Collaborate with energy providers and policymakers</li>
                  </ul>
                </CardContent>
              </div>
              <div className="md:w-1/2">
                <img 
                  src="/placeholder.svg?height=400&width=600" 
                  alt="EchoSphere approach illustration" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </Card>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-6 text-center">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {teamMembers.map((member, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex flex-col items-center text-center">
                    <Avatar className="w-24 h-24 mb-4">
                      <AvatarImage src={member.image} alt={member.name} />
                      <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <CardTitle>{member.name}</CardTitle>
                    <p className="text-sm text-gray-500">{member.role}</p>
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
