const generateSalt = async (length: number = 16): Promise<string> => {
    const arr = new Uint32Array(length)
    crypto.getRandomValues(arr)
    return Array.from(arr).map(b => b.toString(16).padStart(2, "0")).join("")
}

export { generateSalt }
