import styled from 'styled-components'
import { COLORS } from '../../style/GlobalStyles'

export const TabContainer = styled.section`
    display: flex;
    flex-direction: row;
    width: 100%;
    border-bottom: 5px solid black;
    gap: 1rem;
    height: 60px;
`
export const TabButton = styled.button<{ active: boolean }>`
    width: 100%;
    height: 100%;
    padding: 10px;
    border: none;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    border-top-right-radius: 20px;
    border-top-left-radius: 20px;

    transition: 0.6s;
    background: ${(props) =>
        props.active ? ` ${COLORS.primary}` : ` ${COLORS.secondary}`};
    &:focus {
        outline: none;
    }
`
export const Title = styled.span<{ active: boolean }>`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    height: inherit;
    text-transform: uppercase;
    font-size: 20px;
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
    border: 2px solid black;
    border-top-right-radius: 20px;
    border-top-left-radius: 20px;

    border-bottom-width: 2px;
    border-bottom-style: solid;

    transition: 0.6s;
`
