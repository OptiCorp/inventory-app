import { styled } from 'styled-components'

export const StyledContainerDiv = styled.div`
    display: flex;
    flex-direction: column;
    gap: 3rem;
    max-width: 1000px;
    margin-inline: auto;
    padding: 16px;
`

export const Wrapper = styled.div`
    display: flex;
    grid-column: 1/1;
    flex-direction: row;
    gap: 3rem;
    border-right: 1px solid rgba(208, 208, 208);
    border-radius: 5px;
`
export const StyledList = styled.ul`
    margin: 0;

    padding: 1rem;
    text-decoration: none;
`
export const SecondList = styled.ul`
    margin: 0;
    padding: 1rem;
`

export const ThirdList = styled.ul`
    margin: 0;
    line-height: 2rem;
    padding-right: 3rem;
`

export const ListItem = styled.li`
    line-height: 2rem;

    margin: 0;
`
