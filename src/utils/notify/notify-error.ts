import { toast } from "sonner"

const notifyError = (...args: Parameters<typeof toast>) => {
    toast(
        args[0],
        {
            ...args[1],
            style: { borderColor: "#be123c" },
        }
    )
}

export { notifyError }
