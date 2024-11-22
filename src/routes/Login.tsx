import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { InputError } from "@/components/ui/input-error"
import { Label } from "@/components/ui/label"
import { Show } from "@/components/utils/show"
import { useUser } from "@/contexts/user-context"
import { useSessionStorage } from "@/hooks/useSessionStorage"
import { TUser } from "@/models/user"
import { loginSchema, TLoginSchema } from "@/schemas/login-schema"
import { verifyPassword } from "@/utils/auth/verifyPass"
import { checkInCollection } from "@/utils/data/checkInCollection"
import { toBoolean } from "@/utils/data/toBoolean"
import { notifyError } from "@/utils/notify/notify-error"
import { zodResolver } from "@hookform/resolvers/zod"
import { User } from "lucide-react"
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"

export default function Component() {

    const navigate = useNavigate()

    const { storedValue: users } = useSessionStorage("EcoLink@v1:users", null)
    const { setUser: login } = useUser()

    const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<TLoginSchema>({
        resolver: zodResolver(loginSchema)
    })

    const onSubmit = async (data: TLoginSchema) => {
        if (!users) return notifyError("Não foi possível verificar existẽncia do usuário")
        const { exists, foundItem: existingUser } = checkInCollection(users, "email", data.email)
        if (!exists) return notifyError("Usuário não existe", { description: 'Cadastre-se ou entre como Convidado!' })
        const isMatch = await verifyPassword(data.password, (existingUser as TUser).pass, (existingUser as TUser).salt)
        if (!isMatch) return notifyError("Email ou Senha incorreta")
        login({
            email: (existingUser! as TUser).email,
            name: (existingUser! as TUser).name
        })
        reset()
        navigate("/")
    }

    const errorInputEmailExists = toBoolean(errors && errors.email?.message)
    const errorInputPasswordExists = toBoolean(errors && errors.password?.message)

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <form onSubmit={handleSubmit(onSubmit)}>
                <Card className="text-primary bg-background rounded w-full max-w-md">
                    <CardHeader className="space-y-1">
                        <CardTitle className="text-2xl text-emerald-600 font-bold">Login</CardTitle>
                        <CardDescription className="text-primary">Digite seu e-mail e senha para efetuar o login da plataforma</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2 relative">
                            <Show
                                when={errorInputEmailExists}
                                content={
                                    <InputError>{errors.email?.message}</InputError>
                                }
                            />
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="meu@email.com"
                                className="rounded"
                                {...register('email')}
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
                            <Label htmlFor="password">Senha</Label>
                            <Input
                                id="password"
                                type="password"
                                className="rounded"
                                {...register('password')}
                                formNoValidate
                            />
                        </div>
                        <div className="text-sm">
                            <Link className="text-primary hover:text-green-600"
                                to="/"
                                onClick={() => login({ email: 'convidado@gmail.com', name: 'Convidado' })}
                            >
                                Esqueceu a senha? <br />
                                <span className="underline flex items-center gap-2">
                                    Acesse a aplicação como Convidado
                                    <User className="min-w-4 w-4" />
                                </span>
                            </Link>
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-col space-y-4">
                        <Button
                            type="submit"
                            className="w-full rounded border border-emerald-600 bg-background hover:bg-emerald-600 hover:text-white"
                            disabled={isSubmitting}
                        >
                            Login
                        </Button>
                        <div className="text-sm text-center text-gray-500">
                            Não tem uma conta?
                            <Link className="text-primary hover:text-green-600 ml-1 underline" to="/cadastrar">
                                Cadastrar
                            </Link>
                        </div>
                    </CardFooter>
                </Card>
            </form>
        </div>
    )
}
