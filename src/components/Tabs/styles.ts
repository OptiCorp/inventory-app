import styled from 'styled-components'
import { COLORS } from '../../style/GlobalStyles'

export const TabContainer = styled.section`
    display: flex;
    flex-direction: row;
    width: 100%;
    border-bottom: 2px solid black;

    height: 60px;
`
export const TabButton = styled.button<{ active: boolean }>`
    padding: 1rem;
    width: 100px;
    cursor: pointer;
    display: flex;
    justify-content: left;
    flex-direction: row;
    align-items: center;
    position: relative;
    transition: 0.6s;
    background: ${(props) =>
        props.active ? ` ${COLORS.primary}` : ` ${COLORS.secondary}`};
    &:focus {
        outline: none;
    }
`

export const NumberofItems = styled.span<{ active: boolean }>`
    color: white;
    position: absolute;
    right: 0;
    font-size: 1rem;
    padding: 1rem;
    color: ${(props) =>
        props.active ? ` ${COLORS.secondary}` : ` ${COLORS.primary}`};
`
export const Title = styled.span<{ active: boolean }>`
    position: relative;
    display: flex;

    align-items: center;
    justify-content: center;
    height: inherit;
    text-transform: uppercase;
    font-size: 0.8rem;
    color: ${(props) =>
        props.active ? `${COLORS.secondary}` : ` ${COLORS.primary}`};
    transition: 0.6s;
`
export const Indicator = styled.span<{ active: boolean }>`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    transition: 0.6s;
`
