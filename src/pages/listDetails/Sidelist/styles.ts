import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle'
import { styled } from 'styled-components'
import { COLORS } from '../../../style/GlobalStyles.ts'

export const InfoIcon = styled(InfoOutlinedIcon)`
    color: black;
    margin-inline: 30px;
    /* &:hover {
        color: 
    } */
    cursor: pointer;
`
export const EditIcon = styled(CreateOutlinedIcon)`
    color: black;
    margin-inline: auto;
    &:hover {
        color: ${COLORS.cautionaryYellow};
    }
    cursor: pointer;
`

export const DeleteIcon = styled(DeleteForeverIcon)`
    color: ${COLORS.primary};
    margin-inline: 30px;
    cursor: pointer;
    &:hover {
        color: ${COLORS.dangerRed};
    }
`

export const Wrapper = styled.div`
    display: flex;

    align-items: center;
    box-shadow:
        rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
        rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
    flex-direction: row;
    padding: 5px;
    justify-content: space-evenly;
    background-color: ${COLORS.whiteSmoke};
`

export const RemoveIcon = styled(RemoveCircleIcon)`
    color: ${COLORS.primary};
    margin-inline: 30px;
    &:hover {
        color: ${COLORS.dangerRed};
    }
    cursor: pointer;
`

export const KeyWord = styled.div`
    display: flex;
    padding: 10px;
    gap: 10px;
    flex-wrap: wrap;
    width: 100%;
`
