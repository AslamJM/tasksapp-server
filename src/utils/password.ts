export async function hashPassword(pw: string) {
    return await Bun.password.hash(pw)
}

export async function verifyPassword(pw: string, hash: string) {
    return await Bun.password.verify(pw, hash)
}