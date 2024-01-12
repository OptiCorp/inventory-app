import { styled } from 'styled-components'
import { COLORS } from '../../style/GlobalStyles.ts'

export const FlexWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    grid-auto-rows: max-content;
    grid-template-rows: 50px 1fr auto;
    gap: 16px;
    height: 90vh;
    padding-bottom: 20px;

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
    margin: 10px 0;
    gap: 10px;
    align-items: center;
    flex-direction: row;
`
export const Header = styled.div`
    display: flex;
    flex-direction: row;
    align-items: baseline;
`
export const NumberofItems = styled.span`
    width: 100%;

    padding: 5px 10px;
`
export const IconContainer = styled.div``

export const ListTitle = styled.h3`
    font-weight: 600;

    width: 100%;
    font-size: 1.2rem;
    margin-inline: 20px;
`
export const StyledDate = styled.span`
    font-weight: 600;
    width: 100%;
    font-size: 0.9rem;

    margin-inline: 20px;
`

export const Wrapper = styled.div`
    display: flex;
    width: 100%;
    margin-inline: 20px;
    align-items: center;
    align-items: baseline;
    margin: 1rem 0;
    flex-direction: column;
`
export const WrapperCompact = styled.div`
    display: flex;
    align-items: baseline;
    height: 60px;
    flex-direction: row;
`
export const IconContainerCompact = styled.div`
    margin: 10px 0;
    display: flex;
`
