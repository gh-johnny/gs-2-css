const generateToken = (userId: string): string => {
    const header = {
        alg: "HS256",
        typ: "JWT",
    }

    const payload = {
        sub: userId,
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + 3600, // 1 hora de duração
    }

    const base64Encode = (obj: object): string =>
        btoa(JSON.stringify(obj)).replace(/=+$/, "").replace(/\+/g, "-").replace(/\//g, "_")

    const encodedHeader = base64Encode(header)
    const encodedPayload = base64Encode(payload)

    const signature = btoa(encodedHeader + "." + encodedPayload) // uso para teste e caso de estudo somente

    return `${encodedHeader}.${encodedPayload}.${signature}`
}

export { generateToken }
