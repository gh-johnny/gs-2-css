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

// Example usage:
// (async () => {
//     const salt = await generateSalt()
//     const password = "mySecurePassword"
//     const hashedPassword = await hashWithSalt(password, salt)
//
//     console.log("Salt to store:", salt)
//     console.log("Hash to store:", hashedPassword)
//
//     const inputPassword = "mySecurePassword"
//     const isMatch = await verifyPassword(inputPassword, hashedPassword, salt)
//
//     console.log("Password Match:", isMatch)
// })()
