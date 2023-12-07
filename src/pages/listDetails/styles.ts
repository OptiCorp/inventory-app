import { styled } from 'styled-components'
import { COLORS } from '../../style/GlobalStyles.ts'

export const SubmitButton = styled.button`
    width: 150px;
    background-color: ${COLORS.primary};
    color: ${COLORS.secondary};
    height: 30px;
    cursor: pointer;
    &:hover {
        background-color: ${COLORS.gray};
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

export const ListTitle = styled.h2`
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
