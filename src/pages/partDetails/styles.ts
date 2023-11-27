import { styled } from 'styled-components'

export const StyledContainerDiv = styled.div`
    display: flex;
    flex-direction: column;
    padding: 16px;
`

export const StyledInfoDiv = styled.div`
    background-color: #bbbbbb;
    padding: 16px;
`

export const Lists = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr auto;
`

export const CompactLists = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto;
    row-gap: 6rem;
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
    // phone:   grid-column: span 2;
    width: 100%;
`

export const ListItem = styled.li`
    line-height: 2rem;
    margin: 0;
`

export const Title = styled.h4`
    font-weight: 600;

    font-size: 1.5rem;
`
