import React from "react"
import { useSessionStorage } from "@/hooks/useSessionStorage"
import { generateToken } from "@/utils/auth/generateToken"
import { TUser } from "@/models/user"

type TUserData = Omit<TUser, "id" | "pass" | "salt">

type UserContextType = {
    user: TUserData | null
    setUser: (user: TUserData | null) => void
    logout: () => void
    token: string | null
}

const UserContext = React.createContext<UserContextType | null>(null)

type UserProviderProps = {
    children: React.ReactNode
}

const UserProvider: React.FC<UserProviderProps> = ({ children }) => {

    const { storedValue: user,
        setValue: setUser,
        removeValue: removeUser
    } = useSessionStorage<TUserData | null>(
        "EchoSphere@v1:user",
        null
    )

    const {
        storedValue: token,
        setValue: setToken,
        removeValue: removeToken
    } = useSessionStorage<string | null>(
        "EchoSphere@v1:token",
        null
    )

    const login = (userData: TUserData | null) => {
        if (!userData) return setUser(userData)
        const token = generateToken(userData.email)
        setUser(userData)
        setToken(token)
    }

    const logout = () => {
        removeUser()
        removeToken()
    }

    return (
        <UserContext.Provider value={{ user, setUser: login, logout, token }}>
            {children}
        </UserContext.Provider>
    )
}

const useUser = (): UserContextType => {
    const context = React.useContext(UserContext)
    if (!context) {
        throw new Error("useUser must be used within a UserProvider")
    }
    return context
}

export { useUser, UserProvider }
