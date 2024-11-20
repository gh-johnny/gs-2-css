import { toast } from "sonner"

const notifyOk = (...args: Parameters<typeof toast>) => {
    toast(
        args[0],
        {
            ...args[1],
            style: { borderColor: "#10b981" },
        }
    )
}

export { notifyOk }
