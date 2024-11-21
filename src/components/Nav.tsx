import { ElementType, ReactNode, useState } from 'react'
import { NAVBAR } from "@/constants/navbar"
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "./ui/tooltip"
import { Link, useLocation } from "react-router-dom"
import { Avatar } from "@/components/ui/avatar"
import { List } from './utils/list'
import { AvatarFallback } from '@radix-ui/react-avatar'
import { useUser } from '@/contexts/user-context'
import { LogOut, X } from 'lucide-react'
import { Dialog, DialogClose, DialogContent, DialogPortal, DialogTitle, DialogTrigger } from './ui/dialog'

export default function NavBar() {
    const { user } = useUser()

    const NavItem = ({ text, link, icon: Icon }: { text: string, link: string, icon: ElementType }) => {
        const { pathname } = useLocation()
        return (
            <Tooltip>
                <TooltipTrigger asChild>
                    <Link
                        to={link}
                        className={`group flex h-9 w-9 items-center justify-center rounded transition-colors ${pathname === link ? 'bg-emerald-600 text-background' : ''} border border-transparent hover:border-emerald-600 md:h-8 md:w-8`}
                    >
                        <Icon className="h-5 w-5" />
                        <span className="sr-only">{text}</span>
                    </Link>
                </TooltipTrigger>
                <TooltipContent className={`border-emerald-600 ${pathname === link ? 'bg-emerald-600' : 'bg-background text-primary'} rounded hidden sm:block`} side="right">{text}</TooltipContent>
            </Tooltip>
        )
    }

    const SideBarContent = () => {
        const { logout } = useUser()

        return (
            <>
                <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
                    <List
                        items={NAVBAR}
                        render={(item, i) => <NavItem key={i} {...item} />}
                    />
                </nav>
                <section className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Link
                                to="/login"
                                className={`group flex h-9 w-9 items-center justify-center rounded transition-colors border border-transparent hover:border-emerald-600 md:h-8 md:w-8`}
                                onClick={() => logout()}
                            >
                                <LogOut className="h-5 w-5" />
                                <span className="sr-only">Log out</span>
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent className='border-emerald-600 bg-background text-primary rounded hidden sm:block' side="right">
                            Logout
                        </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Avatar className='group hover:bg-emerald-600 hover:border-emerald-600 mx-auto border flex justify-center items-center'>
                                <AvatarFallback className='font-semibold group-hover:text-white text-primary'>
                                    {user ? user.name.at(0) : 'C'}
                                </AvatarFallback>
                            </Avatar>
                        </TooltipTrigger>
                        <TooltipContent className='border-emerald-600 bg-background text-primary rounded hidden sm:block' side="right">
                            <span>Usuário: {user ? user?.name : 'Convidado'}</span>
                            <p>Deseja trocar de conta? Vá para o <Link to="/login" className='underline text-emerald-600'>Login</Link></p>
                        </TooltipContent>
                    </Tooltip>
                </section>
            </>
        )
    }

    const [open, setOpen] = useState(false)
    const { logout } = useUser()

    const UserModal = ({ children }: { children: ReactNode }) => (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogPortal>
                <DialogTitle className='sr-only'>Escolha entre fazer logout ou continuar página</DialogTitle>
                <DialogContent
                    data-state={open ? 'open' : 'closed'}
                    className="bg-transparent border-none fixed bottom-16 right-[28px] sm:max-w-[425px]"
                >
                    <section className='rounded border relative flex items-center justify-center bg-background'>
                        <DialogClose className='absolute top-3 right-3'>
                            <X className='w-4 h-4' />
                            <span className='sr-only'>Botão de fechar</span>
                        </DialogClose>
                        <div className='flex flex-col gap-4 justify-center items-center'>
                            <span className='text-center mb-6'>Deseja sair ou trocar de conta?</span>
                            <Link
                                to="/login"
                                onClick={() => logout()}
                                className='border border-emerald-600 p-2 rounded'
                            >
                                <LogOut />
                            </Link>
                        </div>
                    </section>
                </DialogContent>
            </DialogPortal>
        </Dialog>
    )

    return (
        <TooltipProvider>
            {/* Desktop Sidebar */}
            <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
                <SideBarContent />
            </aside>

            {/* Mobile Bottom Navigation */}
            <nav className="fixed bottom-0 left-0 right-0 z-10 flex justify-between border-t bg-background py-3 px-7 sm:hidden">
                <List
                    items={NAVBAR.slice(0, 1)}
                    render={(item, i) => <NavItem key={i} {...item} />}
                />
                <List
                    items={NAVBAR.slice(1, 3).reverse()}
                    render={(item, i) => <NavItem key={i} {...item} />}
                />
                <UserModal>
                    <Avatar>
                        <Avatar className='w-9 h-9 mx-auto border flex justify-center items-center'>
                            <AvatarFallback className='font-semibold text-primary'>
                                {user ? user.name.at(0) : 'C'}
                            </AvatarFallback>
                        </Avatar>
                    </Avatar>
                </UserModal>
            </nav>
        </TooltipProvider>
    )
}
