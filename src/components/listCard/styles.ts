import AddCircleIcon from '@mui/icons-material/AddCircle'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle'
import { styled } from 'styled-components'
import { COLORS } from '../../style/GlobalStyles'

export const ListWrapper = styled.div`
    position: relative;
    padding: 8px;
    background-color: ${COLORS.secondary};
    &:hover {
        background: ${COLORS.secondary};
    }
    cursor: pointer;
    border-radius: 6px;
    box-shadow: 2.5px 2.5px ${COLORS.gray};
    width: 95%;
    max-width: 450px;
`

export const StyledTitle = styled.h2`
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
`

export const StyledDeleteIconAbsolute = styled(DeleteForeverIcon)`
    color: ${COLORS.primary};
    position: absolute;
    top: 0;
    right: 0;
    &:hover {
        color: ${COLORS.dangerRed};
    }
`

export const StyledDeleteIconRelative = styled(DeleteForeverIcon)`
    color: ${COLORS.primary};
    position: relative;
    top: 0;
    right: 0;
    &:hover {
        color: ${COLORS.dangerRed};
    }
    margin-left: auto;
`

export const StyledAddIcon = styled(AddCircleIcon)`
    color: black;
    position: absolute;
    top: 0;
    right: 0;
    &:hover {
        color: green;
    }
    cursor: pointer;
`

export const StyledRemoveIcon = styled(RemoveCircleIcon)`
    color: black;
    position: absolute;
    top: 0;
    right: 0;
    &:hover {
        color: ${COLORS.dangerRed};
    }
    cursor: pointer;
`
export const StyledDeleteIcon = styled(DeleteForeverIcon)`
    color: black;
    position: absolute;
    top: -12px;
    right: -3px;
    &:hover {
        color: ${COLORS.dangerRed};
    }
`
