import { toast } from "sonner"

const notifyWarning = (...args: Parameters<typeof toast>) => {
    toast(
        args[0],
        {
            ...args[1],
            style: { borderColor: "#f59e0b" },
        }
    )
}

export { notifyWarning }
