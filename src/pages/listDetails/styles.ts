import { styled } from 'styled-components'
import { COLORS } from '../../style/GlobalStyles.ts'

export const ListTitle = styled.h2`
    font-weight: 600;
    line-height: 2rem;

    margin-inline: 20px;
`

export const FlexWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
    height: 85%;
    padding-bottom: 20px;
    width: 45%;
    position: fixed;
    right: 2%;
    grid-column: 2/2;
    justify-content: space-between;
    background-color: ${COLORS.silverGray};
`

export const SearchResultsContainer = styled.div`
    grid-column: 1/1;
    max-width: 1000px;
`

type Props = {
    height?: string
}
export const SearchContainerList = styled.div<Props>`
    display: grid;
    grid-template-columns: 1fr 1fr;
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
    justify-content: flex-end;
    flex-wrap: wrap;
    flex-basis: 1;
`
export const Header = styled.div`
    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    background-color: ${COLORS.whiteSmoke};
`
