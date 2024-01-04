import styled from 'styled-components'
import { COLORS } from '../../../../style/GlobalStyles'

export const ButtonWrapCompact = styled.div`
    display: flex;
    flex-direction: row;
    gap: 2rem;
    padding: 10px;
    margin-inline: auto;
`
export const FlexWrapperCompact = styled.div`
    margin: 16px;
    box-shadow: 2px 4px 4px 0 rgba(0, 0, 0, 0.2);
    display: flex;
    flex-direction: column;
    height: 80vh;
    background-color: ${COLORS.silverGray};
`
export const ListContainerCompact = styled.div`
    padding: 20px;
    overflow: auto;
    padding-bottom: 400px;
    display: flex;
    flex-direction: column;
    gap: 40px;
`
