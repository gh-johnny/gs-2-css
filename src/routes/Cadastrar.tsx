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
import { useNavigate } from "react-router-dom"

export default function Cadastrar() {

    const navigate = useNavigate()

    const { register, handleSubmit, formState: { isSubmitting, errors } } = useForm<TCadastroSchema>({
        resolver: zodResolver(cadastroSchema)
    })

    const { mutateAsync: create } = useMutation({
        mutationFn: createUser,
        onSuccess: () => {
            // set token in sessionStorage
            // set user in userContext authContext userInfo whatever
            // clean / reset()
            // redirect / navigate("/")
            console.log("yaaaay, logado")
        },
        onError: () => {
            notifyError('Oops, não foi possível criar usuário')
            console.error("Não foi possível criar usuário")
        }
    })

    const { data: users } = useQuery<TUser[] | undefined>({ // para teste e caso de estudo somente
        queryKey: ['fetch-users'],
        queryFn: () => getAllUsers()
    })

    const onSubmit = async ({ name, email, password }: TCadastroSchema) => {
        if (!users) return notifyError("Não foi possível verificar existência de usuário")

        const { exists: userExists } = checkInCollection(users, 'email', email) // para teste e caso de estudo somente
        if (userExists) return notifyError("Usuário desse e-mail já existe", {
            icon: <User className="p-[1px]" />,
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
        await create(body)
    }

    const errorInputNameExists = toBoolean(errors && errors.name?.message)
    const errorInputEmailExists = toBoolean(errors && errors.email?.message)
    const errorInputPasswordExists = toBoolean(errors && errors.password?.message)
    const errorInputConfirmPasswordExists = toBoolean(errors && errors.confirmPassword?.message)

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <Card className="w-full max-w-md rounded">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <CardHeader className="space-y-1">
                        <CardTitle className="text-2xl font-bold">Crie sua conta</CardTitle>
                        <CardDescription>Digite suas informações para cadastro</CardDescription>
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
                    <CardFooter>
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full rounded"
                        >
                            Cadastrar
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    )
}
