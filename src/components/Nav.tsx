import { ElementType } from 'react'
import { NAVBAR } from "@/constants/navbar"
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "./ui/tooltip"
import { Link } from "react-router-dom"
import { Avatar } from "@/components/ui/avatar"
import { List } from './utils/list'
import { AvatarFallback } from '@radix-ui/react-avatar'
import { useUser } from '@/contexts/user-context'

export default function NavBar() {
    const { user } = useUser()

    const NavItem = ({ text, link, icon: Icon }: { text: string, link: string, icon: ElementType }) => (
        <Tooltip>
            <TooltipTrigger asChild>
                <Link
                    to={link}
                    className="flex h-9 w-9 items-center justify-center rounded text-muted-foreground transition-colors hover:text-background hover:bg-foreground md:h-8 md:w-8"
                >
                    <Icon className="h-5 w-5" />
                    <span className="sr-only">{text}</span>
                </Link>
            </TooltipTrigger>
            <TooltipContent className='rounded hidden sm:block' side="right">{text}</TooltipContent>
        </Tooltip>
    );

    const SideBarContent = () => (
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
                        <Avatar className='mx-auto border flex justify-center items-center'>
                            <AvatarFallback className=''>{user ? user.name.at(0) : 'C'}</AvatarFallback>
                        </Avatar>
                    </TooltipTrigger>
                    <TooltipContent className='rounded hidden sm:block' side="right">{user?.name}</TooltipContent>
                </Tooltip>
            </section>
        </>
    );

    return (
        <TooltipProvider>
            {/* Desktop Sidebar */}
            <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
                <SideBarContent />
            </aside>

            {/* Mobile Bottom Navigation */}
            <nav className="fixed bottom-0 left-0 right-0 z-10 flex justify-between border-t bg-background py-2 px-7 sm:hidden">
                <List
                    items={NAVBAR.slice(0, 1)}
                    render={(item, i) => <NavItem key={i} {...item} />}
                />
                <List
                    items={NAVBAR.slice(1, 3).reverse()}
                    render={(item, i) => <NavItem key={i} {...item} />}
                />
            </nav>
        </TooltipProvider>
    )
}
