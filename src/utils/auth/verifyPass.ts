import { hashWithSalt } from "./hashWithSalt"

const verifyPassword = async (
    inputPassword: string,
    storedHash: string,
    storedSalt: string
): Promise<boolean> => {
    const inputHash = await hashWithSalt(inputPassword, storedSalt)
    return inputHash === storedHash
}

export { verifyPassword }
