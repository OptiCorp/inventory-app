import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
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
    margin-inline: 30px;
    &:hover {
        color: ${COLORS.cautionaryYellow};
    }
    cursor: pointer;
`

export const DeleteIcon = styled(DeleteOutlineOutlinedIcon)`
    color: black;
    margin-inline: 30px;
    &:hover {
        color: ${COLORS.dangerRed};
    }
    cursor: pointer;
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

export const ButtonWrap = styled.div`
    display: flex;
    flex-direction: row;
    gap: 100px;
    bottom: 20px;
    right: 250px;
    padding-top: 40px;
    position: fixed;
    margin-inline: auto;
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
