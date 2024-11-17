import React from "react"

interface ListProps<T> {
    items: T[]
    render: (item: T, index: number) => React.ReactNode
}

const List = <T,>({ items, render }: ListProps<T>): React.ReactNode => (
    <React.Fragment>
        {items.map((item, index) => render(item, index))}
    </React.Fragment>
)

export { List }
