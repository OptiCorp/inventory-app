import { FunctionComponent } from 'react'
import { useWindowDimensions } from '../../hooks'
import { CompactLists, Lists, StyledInfoDiv, Title } from './styles'

interface CardProps {
    children: React.ReactNode
    title: string
    onClick?: () => void
}

export const CustomCard
    : FunctionComponent<CardProps> = ({
    children,
    title,
    onClick,
}) => {
    const { width } = useWindowDimensions()
    return (
        <>
            <StyledInfoDiv onClick={onClick}>
                {width > 800 ? (
                    <Lists>
                        <Title>{title}</Title>
                        {children}
                    </Lists>
                ) : (
                    <CompactLists>
                        <Title>{title}</Title>
                        {children}
                    </CompactLists>
                )}
            </StyledInfoDiv>
        </>
    )
}