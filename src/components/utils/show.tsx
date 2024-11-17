import React from 'react'

interface ShowProps {
    content: React.ReactNode
    when: boolean
    fallback?: React.ReactNode
}

const Show: React.FC<ShowProps> = ({ content, when, fallback = null }): React.ReactNode => (
    <React.Fragment>{when ? content : fallback}</React.Fragment>
)

export { Show }
