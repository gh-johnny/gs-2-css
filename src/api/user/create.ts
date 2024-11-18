import { api } from "@/lib/axios";
import { TUser } from "@/models/user";

export const createUser = async (data: TUser) => {
    return await api.post('/users', data)
}
