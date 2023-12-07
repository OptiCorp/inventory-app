import { ReactNode, useState } from 'react'
import styled from 'styled-components'
type Props = {
    content: string
    children: ReactNode
}

const ToolTipContent = styled.div`
    position: absolute;
    background-color: #565656;
    left: 20px;
    line-height: 20px;
    top: -10px;
    width: 190px;
    color: white;
    padding: 4px 8px;
    border-radius: 4px;
`

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
