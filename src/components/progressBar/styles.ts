import { Link } from 'react-router-dom'
import { styled } from 'styled-components'
import { COLORS } from '../../style/GlobalStyles'

type ProgressProps = {
    active: boolean
    width: number
}

export const Container = styled.div`
    display: flex;
    padding-bottom: 16px;
    max-width: 500px;
`

export const ProgressCircle = styled.div<ProgressProps>`
    border-radius: 50%;
    background-color: ${({ active }) =>
        active ? COLORS.primary : COLORS.gray};
    width: 20px;
    height: 20px;
    padding: 8px;
    color: ${({ active }) => (active ? COLORS.secondary : COLORS.primary)};
    display: flex;
    justify-content: center;
    align-items: center;
`

export const ProgressLine = styled.div<ProgressProps>`
    background-color: ${({ active }) =>
        active ? COLORS.primary : COLORS.gray};
    height: 3px;
    align-self: center;
    margin: 0 4px;
    flex-grow: 1;
`

export const ProgressLink = styled(Link)`
    text-decoration: none;
`
