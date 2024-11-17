import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { InputError } from "@/components/ui/input-error"
import { Label } from "@/components/ui/label"
import { Show } from "@/components/utils/show"
import { cadastroSchema, TCadastroSchema } from "@/schemas/cadastro-schema"
import { toBoolean } from "@/utils/toBoolean"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

export default function Cadastrar() {

    const { register, handleSubmit, formState: { isSubmitting, errors } } = useForm<TCadastroSchema>({
        resolver: zodResolver(cadastroSchema)
    })

    const onSubmit = async (data: TCadastroSchema) => {
        console.log(data)
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
                            />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full rounded"
                            onClick={() => console.log({ errors })}
                        >
                            Cadastrar
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    )
}
