import { styled } from 'styled-components'
import { COLORS } from '../../style/GlobalStyles.ts'

export const ListTitle = styled.h2`
    font-weight: 600;
    line-height: 2rem;

    margin-inline: 20px;
`
export const StyledDate = styled.h3`
    font-weight: 600;
    width: 100%;

    line-height: 2rem;
`

export const FlexWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    grid-auto-rows: max-content;
    grid-template-rows: auto 1fr auto;
    gap: 16px;
    height: 90vh;
    padding-bottom: 20px;

    right: 2%;
    grid-column: 2/2;
    justify-content: space-between;
    background-color: ${COLORS.silverGray};
`

export const SearchResultsContainer = styled.div`
    grid-column: 1/1;
    max-width: 900px;
`

type Props = {
    height?: string
}
export const SearchContainerList = styled.div<Props>`
    display: grid;
    grid-template-columns: 1fr;
    gap: 3rem;
    height: ${({ height }) => height};
`

export const ListContainer = styled.div`
    padding: 20px;
    overflow: auto;
    padding-bottom: 100px;
    display: flex;
    flex-direction: column;
    gap: 40px;
`
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
export const ButtonWrap = styled.div`
    display: flex;
    flex-direction: row;
    gap: 100px;

    margin-inline: auto;
`
export const FlexContainer = styled.div`
    display: flex;
    width: 100%;
    justify-content: flex-end;
    align-items: center;
    gap: 1rem;
    flex-direction: row;
`
export const Header = styled.div`
    display: flex;
    padding-bottom: 3px;
    justify-content: space-around;
    align-items: center;
    flex-direction: row;
`
export const NumberofItems = styled.span`
    width: 100%;

    padding: 5px 10px;
`
export const IconContainer = styled.div``
