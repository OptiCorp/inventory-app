import AddCircleIcon from '@mui/icons-material/AddCircle'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle'
import { styled } from 'styled-components'
import { COLORS } from '../../style/GlobalStyles'

export const ListWrapper = styled.div`
    position: relative;
    padding: 8px;
    background-color: ${COLORS.card};
    &:hover {
        background: ${COLORS.whiteSmoke};
    }
    cursor: pointer;
    border-radius: 6px;
    box-shadow: 2px 4px 4px 0 rgba(0, 0, 0, 0.2);
    width: 95%;
    max-width: 450px;
`

export const StyledTitle = styled.h2`
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
`

export const StyledDeleteIcon = styled(DeleteForeverIcon)`
    color: ${COLORS.primary};
    position: absolute;
    top: 2px;
    right: 0;
    &:hover {
        color: ${COLORS.dangerRed};
    }
`

export const StyledAddIcon = styled(AddCircleIcon)<{ active: boolean }>`
    color: black;
    position: absolute;
    top: 3px;
    right: 3px;
    color: ${(props) =>
        props.active ? 'green' : 'black'};
    &:hover {
        color: green;
    }
    cursor: pointer;
`

export const StyledRemoveIcon = styled(RemoveCircleIcon)`
    color: black;
    position: absolute;

    top: 3px;
    right: 3px;
    &:hover {
        color: ${COLORS.dangerRed};
    }
    cursor: pointer;
`
