type CheckResult<T> = {
    exists: boolean
    foundItem?: T
}

const checkInCollection = <T,>(
    collection: T[],
    attributeOrValue: keyof T | null = null,
    value: any,
): CheckResult<T> => {
    let exists = false
    let foundItem: T | undefined

    if (!attributeOrValue) {
        for (let i = 0; i < collection.length; i++) {
            if (collection[i] === value) {
                exists = true
                foundItem = collection[i]
                break
            }
        }
    } else {
        for (let i = 0; i < collection.length; i++) {
            const item = collection[i]
            if (item[attributeOrValue] === value) {
                exists = true
                foundItem = item
                break
            }
        }
    }

    return { exists, foundItem }
}

export { checkInCollection }
