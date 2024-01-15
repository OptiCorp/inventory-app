import { ReactNode, useState } from 'react'
import { ToolTipContent } from './styles'

type Props = {
    content: string
    children: ReactNode
}

export const ToolTip = ({ content, children }: Props) => {
    const [isVisble, setIsVisble] = useState(false)

    return (
        <div style={{ position: 'relative' }}>
            <span
                onMouseLeave={() => setIsVisble(false)}
                onMouseOver={() => setIsVisble(true)}
                onClick={() => setIsVisble(true)}
                onBlur={() => setIsVisble(true)}
            >
                {' '}
                {children}
            </span>

            {isVisble ? <ToolTipContent>{content}</ToolTipContent> : null}
        </div>
    )
}
