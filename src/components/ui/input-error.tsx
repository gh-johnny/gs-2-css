import * as React from "react"

import { cn } from "@/lib/utils"

const InputError = React.forwardRef<HTMLSpanElement, React.ComponentProps<'span'>>(
    ({ className, children, ...props }, ref) => {
        return (
            <span ref={ref}
                className={cn("absolute top-0 -right-1 text-destructive",
                    className
                )}
                {...props}
            >
                {children}
            </span>
        )
    })

InputError.displayName = "InputError"

export { InputError }
