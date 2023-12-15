import { styled } from 'styled-components'
import { COLORS } from '../../style/GlobalStyles'

export const AdminSearchCardContainer = styled.div`
    box-shadow: 2.5px 2.5px grey;
    display: flex;
    background-color: ${COLORS.secondary};
    max-width: 700px;
    margin: 16px;
    padding: 8px;
    justify-content: space-between;
`

export const AdminActions = styled.div`
    display: flex;
    align-items: center;
`
