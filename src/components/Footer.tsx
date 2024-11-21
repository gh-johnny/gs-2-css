import { FiFacebook as Facebook, FiLinkedin as Linkedin } from "react-icons/fi"
import { FaInstagram as Instagram } from "react-icons/fa"
import { GoMail as Mail } from "react-icons/go"
import { Link } from "react-router-dom"

export default function Footer() {
    const currentYear = new Date().getFullYear()

    return (
        <div className="mb-2 sm:mb-0">
            <footer className=" py-8 px-16 border-t">
                <div className="container mx-auto max-w-6xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <h2 className="text-lg text-emerald-600 font-semibold mb-4">EcoLink</h2>
                            <p className="text-sm">
                                Inovando para um futuro verde e elétrico.
                            </p>
                        </div>

                        <section className="flex justify-between">
                            <div>
                                <h3 className="text-md text-emerald-600 font-semibold mb-4">Links</h3>
                                <ul className="space-y-2">
                                    <li><Link to="/sobre" className="text-sm hover:text-gray-900">Sobre nós</Link></li>
                                    <li><Link to="#" className="text-sm hover:text-gray-900">Serviços</Link></li>
                                    <li><Link to="#" className="text-sm hover:text-gray-900">Contato</Link></li>
                                    <li><Link to="#" className="text-sm hover:text-gray-900">Política de Privacidade</Link></li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="text-md text-emerald-600 font-semibold mb-4">Conecte-se Conosoco</h3>
                                <div className="flex space-x-4">
                                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-green-600">
                                        <Facebook size={20} />
                                        <span className="sr-only">Facebook</span>
                                    </a>
                                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-green-600">
                                        <Instagram size={20} />
                                        <span className="sr-only">Instagram</span>
                                    </a>
                                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-green-600">
                                        <Linkedin size={20} />
                                        <span className="sr-only">LinkedIn</span>
                                    </a>
                                    <a href="mailto:info@EcoLink.com" className="hover:text-green-600">
                                        <Mail size={20} />
                                        <span className="sr-only">Email</span>
                                    </a>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </footer>
            <div className="mt-8 p-8 border-t text-center">
                <p className="text-sm">
                    © {currentYear}{" "}<span className="text-emerald-600">EcoLink.</span> All rights reserved.
                </p>
            </div>
        </div>
    )
}
