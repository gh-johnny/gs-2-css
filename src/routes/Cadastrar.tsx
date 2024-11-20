import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { InputError } from "@/components/ui/input-error"
import { Label } from "@/components/ui/label"
import { Show } from "@/components/utils/show"
import { cadastroSchema, TCadastroSchema } from "@/schemas/cadastro-schema"
import { toBoolean } from "@/utils/data/toBoolean"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { User } from 'lucide-react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { createUser } from "@/api/user/create"
import { TUser } from "@/models/user"
import { generateSalt } from "@/utils/auth/generateSalt"
import { hashWithSalt } from "@/utils/auth/hashWithSalt"
import { getAllUsers } from "@/api/user/get-all"
import { checkInCollection } from "@/utils/data/checkInCollection"
import { notifyError } from "@/utils/notify/notify-error"
import { Link, useNavigate } from "react-router-dom"
import { useUser } from "@/contexts/user-context"
import { useSessionStorage } from "@/hooks/useSessionStorage"
import axios from "axios"
import Error from "./Error"

export default function Cadastrar() {

    const navigate = useNavigate()

    const { setUser: login } = useUser()

    const { storedValue: usersSessionStorage, setValue: setUsersSessionStorage } = useSessionStorage("EchoSphere@v1:users", null)

    const { register, handleSubmit, formState: { isSubmitting, errors }, reset } = useForm<TCadastroSchema>({
        resolver: zodResolver(cadastroSchema)
    })

    const { mutateAsync: create } = useMutation({
        mutationFn: createUser,
        onSuccess: ({ data: { name, email } }: { data: TUser }) => {
            login({
                email,
                name
            })
            reset()
            navigate("/")
        },
        onError: ({ message }) => {
            if (message == "Network Error") {
                if (!usersSessionStorage) throw Error()
                const currentUser = (usersSessionStorage! as TUser[]).pop()
                if (!currentUser) throw Error()
                login({
                    email: currentUser.email,
                    name: currentUser.name
                })
                reset()
                navigate("/")
                return
            }
            notifyError('Oops, não foi possível criar usuário')
            console.error("Não foi possível criar usuário", message)
        }
    })

    const { data: users } = useQuery<TUser[] | undefined>({ // para teste e caso de estudo somente
        queryKey: ['fetch-users'],
        queryFn: () => getAllUsers()
    })

    const onSubmit = async ({ name, email, password }: TCadastroSchema) => {
        let usersData = users
        if (!usersData) console.error('Could not get all users from sessionStorage')
        try {
            if (!usersSessionStorage) {
                const res = await axios.get('/db.json')
                setUsersSessionStorage(res.data.users)
                usersData = res.data.users
            } else {
                usersData = usersSessionStorage
            }
        } catch (errInner) {
            notifyError("Não foi possível pegar informações de usuário existentes")
        }

        const { exists: userExists } = checkInCollection(usersData || [], 'email', email) // para teste e caso de estudo somente
        if (userExists) return notifyError("Usuário desse e-mail já existe", {
            icon: <User className="p-[1px]" />,
            description: 'Deseja fazer login?',
            action:
                <Button
                    type="button"
                    className="ml-auto rounded px-3 py-2"
                    onClick={() => navigate("/login")}
                >
                    Login
                </Button>
        })

        const currentSalt = await generateSalt()
        const body: TUser = {
            id: `${crypto.randomUUID().toString()}-${btoa(email)}`,
            name,
            email,
            pass: await hashWithSalt(password, currentSalt),
            salt: currentSalt,
        }
        const totalUsers = usersData ? [...usersData, body] : [body]
        setUsersSessionStorage(totalUsers as any)
        await create(body)
    }

    const errorInputNameExists = toBoolean(errors && errors.name?.message)
    const errorInputEmailExists = toBoolean(errors && errors.email?.message)
    const errorInputPasswordExists = toBoolean(errors && errors.password?.message)
    const errorInputConfirmPasswordExists = toBoolean(errors && errors.confirmPassword?.message)

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <Card className="bg-background text-primary w-full max-w-md rounded">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <CardHeader className="space-y-1">
                        <CardTitle className="text-2xl text-emerald-600 font-bold">Crie sua conta</CardTitle>
                        <CardDescription className="text-primary">Digite suas informações para cadastro</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2 relative">
                            <Show
                                when={errorInputNameExists}
                                content={
                                    <InputError>{errors.name?.message}</InputError>
                                }
                            />
                            <Label htmlFor="name">Nome*</Label>
                            <Input
                                {...register('name')}
                                className="rounded"
                                id="name"
                                placeholder="John Doe"
                                autoComplete="name"
                            />
                        </div>
                        <div className="space-y-2 relative">
                            <Show
                                when={errorInputEmailExists}
                                content={
                                    <InputError>{errors.email?.message}</InputError>
                                }
                            />
                            <Label htmlFor="email">Email*</Label>
                            <Input
                                {...register('email')}
                                className="rounded"
                                id="email"
                                type="email"
                                placeholder="meu@email.com"
                                autoComplete="email"
                                formNoValidate
                            />
                        </div>
                        <div className="space-y-2 relative">
                            <Show
                                when={errorInputPasswordExists}
                                content={
                                    <InputError>{errors.password?.message}</InputError>
                                }
                            />
                            <Label htmlFor="password">Senha*</Label>
                            <Input
                                {...register('password')}
                                className="rounded"
                                id="password"
                                type="password"
                                autoComplete="new-password"
                            />
                        </div>
                        <div className="space-y-2 relative">
                            <Show
                                when={errorInputConfirmPasswordExists}
                                content={
                                    <InputError>{errors.confirmPassword?.message}</InputError>
                                }
                            />
                            <Label htmlFor="confirm-password">Confirmar senha*</Label>
                            <Input
                                {...register('confirmPassword')}
                                className="rounded"
                                id="confirm-password"
                                type="password"
                                autoComplete="new-password"
                            />
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-col gap-4">
                        <div className="text-sm text-center text-gray-500">
                            <span>Tem uma conta?</span>
                            <Link className="text-primary hover:text-green-600 ml-1 underline" to="/cadastrar">
                                Faça o Login aqui
                            </Link>
                        </div>
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full rounded border border-emerald-600 bg-background hover:bg-emerald-600 hover:text-white"
                        >
                            Cadastrar
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    )
}
