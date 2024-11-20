import { TSessionStorageKeys } from "@/models/session-storage"
import React from "react"

const useSessionStorage = <T,>(key: TSessionStorageKeys, initialValue: T) => {

    const [storedValue, setStoredValue] = React.useState<T>(() => {
        try {
            const item = sessionStorage.getItem(key)
            return item ? JSON.parse(item) : initialValue
        } catch (error) {
            console.error(`Erro ao recuperar a chave:"${key}" de sessionStorage:`, error)
            return initialValue
        }
    })

    const setValue = React.useCallback(
        (value: T | ((prevValue: T) => T)) => {
            try {
                const valueToStore = value instanceof Function ? value(storedValue) : value
                setStoredValue(valueToStore)
                sessionStorage.setItem(key, JSON.stringify(valueToStore))
            } catch (error) {
                console.error(`Erro ao definir a chave:"${key}" de sessionStorage:`, error)
            }
        },
        [key, storedValue]
    )

    const removeValue = React.useCallback(() => {
        try {
            sessionStorage.removeItem(key)
            setStoredValue(initialValue)
        } catch (error) {
            console.error(`Erro ao remover a chave:"${key}" de sessionStorage:`, error)
        }
    }, [key, initialValue])

    return { storedValue, setValue, removeValue }
}

export { useSessionStorage }
