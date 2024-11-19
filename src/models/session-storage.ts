const appName = "EchoSphere@" as const

const version = "v1:" as const

const prefix = `${appName}${version}` as const

type TSessionStorageKeys =
    `${typeof prefix}token` |
    `${typeof prefix}user` |
    `${typeof prefix}users`

export { type TSessionStorageKeys }
