const hashWithSalt = async (password: string, salt: string): Promise<string> => {
    const enc = new TextEncoder()
    const keyMaterial = await crypto.subtle.importKey(
        "raw",
        enc.encode(password),
        "PBKDF2",
        false,
        ["deriveBits"]
    )

    const saltBuffer = enc.encode(salt)

    const derivedBits = await crypto.subtle.deriveBits(
        {
            name: "PBKDF2",
            salt: saltBuffer,
            iterations: 1000,
            hash: "SHA-256",
        },
        keyMaterial,
        256 // length in bits
    )

    return Array.from(new Uint8Array(derivedBits))
        .map(b => b.toString(16).padStart(2, "0"))
        .join("")
}

export { hashWithSalt }
