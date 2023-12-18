import RemoveCircleIcon from '@mui/icons-material/RemoveCircle'
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
    margin-inline: 20px;
`

export const FlexWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;

    top: 80px;
    right: 200px;
    height: 800px;
    overflow-x: scroll;
    background-color: ${COLORS.silverGray};
`

export const SearchResultsContainer = styled.div`
    grid-column: 1/1;
    max-width: 1000px;
`
export const Header = styled.div`
    display: flex;
    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
    flex-direction: row;

    background-color: ${COLORS.whiteSmoke};
`
export const KeyWord = styled.div`
    display: flex;
    padding: 10px;
    gap: 10px;
    flex-wrap: wrap;
    width: 100%;
`

export const Wrapper = styled.div`
    display: flex;

    align-items: center;
    box-shadow:
        rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
        rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
    flex-direction: row;
    padding: 20px;
    justify-content: space-evenly;
    background-color: white;
`

export const RemoveIcon = styled(RemoveCircleIcon)`
    color: black;
    margin-inline: 30px;
    &:hover {
        color: ${COLORS.dangerRed};
    }
    cursor: pointer;
`
export const ListContainer = styled.div`
    padding: 20px;
    flex-wrap: wrap;
    display: flex;
    flex-direction: column;
    gap: 40px;
`
type Props = {
    height?: string
}
export const SearchContainerList = styled.div<Props>`
    display: grid;
    grid-template-columns: 1fr 1fr;

    height: ${({ height }) => height};
`
export const ButtonWrap = styled.div`
    display: flex;
    flex-direction: row;
    gap: 100px;
    bottom: 20px;
    right: 300px;
    padding-top: 40px;
    position: fixed;
    margin-inline: auto;
`
