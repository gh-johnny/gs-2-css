import { api } from "@/lib/axios"
import { TUser } from "@/models/user"

export const getAllUsers = async () => { // para teste e caso de estudo somente
    try {
        const res = await api.get('/users')
        console.log('i')
        return res.data as TUser[]
    } catch (err) {
        console.error('Could not fetch all users', err)
    }
}
