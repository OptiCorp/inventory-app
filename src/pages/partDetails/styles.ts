import { styled } from 'styled-components'
import { COLORS } from '../../style/GlobalStyles'

export const StyledContainerDiv = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 1000px;
    margin-inline: auto;
    padding: 16px;
`

export const StyledInfoDiv = styled.div`
    background-color: ${COLORS.white};
    border-radius: 8px;

    padding: 2rem;
    box-shadow: 2.5px 2.5px gray;

    box-shadow: 2.5px 2.5px gray;
`

export const Lists = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 30px;
    padding: 1rem;
    justify-items: stretch;
    background-color: ${COLORS.frostyGray};
    border-radius: 5px;
    justify-content: start;
    align-items: center;
`

export const CompactLists = styled.div`
    display: flex;

    flex-direction: column;
`

export const Wrapper = styled.div`
    display: flex;
    grid-column: 1/1;
    flex-direction: row;
    background-color: ${COLORS.aliceBlue};
    border-radius: 5px;
    box-shadow: 1.5px 1.5px gray;
`
export const StyledList = styled.ul`
    margin: 0;

    padding-right: 3rem;
    text-decoration: none;
`
export const SecondList = styled.ul`
    margin: 0;
    padding-right: 3rem;

    text-decoration: none;
`

export const ThirdList = styled.ul`
    margin: 0;
    padding-right: 3rem;
    text-decoration: none;
    padding-top: 2rem;
    width: 90%;
`

export const ListItem = styled.li`
    line-height: 2rem;

    margin: 0;
`

export const Title = styled.h1`
    font-weight: 600;

    letter-spacing: 3px;

    border-radius: 5px;
    display: inline;
    text-indent: 2rem;
    line-height: 3rem;
    font-size: 1.2rem;
`
