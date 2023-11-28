import { styled } from 'styled-components'
import { COLORS } from '../../style/GlobalStyles'

export const StyledContainerDiv = styled.div`
    display: flex;
    flex-direction: column;
    padding: 16px;
`

export const StyledInfoDiv = styled.div`
    background-color: ${COLORS.white};
    border-radius: 8px;
    margin: 16px;
    padding: 2rem;
    box-shadow: 2.5px 2.5px gray;
    max-width: 1000px;
    box-shadow: 2.5px 2.5px gray;
`

export const Lists = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr auto;
`

export const CompactLists = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 6rem;
`

export const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    background-color: ${COLORS.aliceBlue};
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

    width: 90%;
`

export const ListItem = styled.li`
    line-height: 2rem;
    margin: 0;
`

export const Title = styled.h4`
    font-weight: 600;
    display: inline;
    padding: 2rem;
    line-height: 3rem;
    font-size: 1.5rem;
`
