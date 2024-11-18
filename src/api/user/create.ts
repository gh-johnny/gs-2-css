import { api } from "@/lib/axios";
import { TUser } from "@/models/user";

export const createUser = async (data: TUser) => {
    const res = await api.post('/users', data)
    return res.data
}
