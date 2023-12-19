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
    height: 900px;
    overflow-x: scroll;
    width: 50%;
    position: fixed;
    right: 0;

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

    height: ${({ height }) => height};
`
export const Header = styled.div`
    display: flex;
    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
    flex-direction: row;
    align-items: center;
    justify-items: flex-end;
    background-color: ${COLORS.whiteSmoke};
`

export const ListContainer = styled.div`
    padding: 20px;
    flex-wrap: wrap;
    display: flex;
    flex-direction: column;
    gap: 40px;
`
