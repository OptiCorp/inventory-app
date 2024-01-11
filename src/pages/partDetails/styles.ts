import { styled } from 'styled-components'
import { COLORS } from '../../style/GlobalStyles'
import { Link, TextField } from '@mui/material'

export const StyledContainerDiv = styled.div`
    display: flex;
    flex-direction: column;
    margin-inline: auto;
    padding: 16px;
    background: #fff;
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

export const Wrapper = styled.div`
    background-color: ${COLORS.primary};
    border-right: 1px solid rgba(208, 208, 208);
    border-radius: 5px;
`
export const StyledList = styled.ul`
    margin: auto;
    display: grid;
    font-size: 1.2rem;
    color: ${COLORS.secondary};
    list-style: none;
    grid-template-columns: 1fr 1fr 1fr;
    padding: 1rem;
    text-decoration: none;
`
export const ListItem = styled.li`
    margin: 0 auto;
    line-height: 2rem;
`
export const ScrollTextField = styled(TextField)`
    overflow-y: auto;
    max-height: 200px;
`

export const BreadcrumbsMargin = styled.div`
margin-bottom: 10px;
`
export const BreadcrumbLink = styled(Link)`
color: ${COLORS.primary} !important;
border-bottom: 1px black dotted;
cursor: pointer;
&:hover {
    font-weight: bolder;
}
`