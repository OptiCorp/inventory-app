import { styled } from 'styled-components'
import { COLORS } from '../../style/GlobalStyles'

export const SubmitButton = styled.button`
    width: 150px;
    background-color: ${COLORS.primary};
    color: ${COLORS.gray};
    height: 30px;
    cursor: pointer;
    &:hover {
        background-color: grey;
    }
`

export const CancelButton = styled.button`
    width: 150px;
    background-color: ${COLORS.secondary};
    color: ${COLORS.primary};
    height: 30px;
    cursor: pointer;
    &:hover {
        background-color: whitesmoke;
    }
`

export const SavedListsTitle = styled.h3`
    font-weight: 600;
    line-height: 2rem;
    margin: 15px 0 5px 15px;
`

export const FlexWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding-bottom: 10px;
`

export const ButtonContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px;
`
