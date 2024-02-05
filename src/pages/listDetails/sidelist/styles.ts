import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { styled } from 'styled-components';
import { COLORS } from '../../../style/GlobalStyles.ts';

export const InfoIcon = styled(InfoOutlinedIcon)`
    color: black;

    cursor: pointer;
`;
export const EditIcon = styled(CreateOutlinedIcon)`
    color: black;

    &:hover {
        color: ${COLORS.white};
    }
    cursor: pointer;
`;

export const DeleteIcon = styled(DeleteForeverIcon)`
    color: ${COLORS.black};
    margin-inline: 30px;
    cursor: pointer;
    &:hover {
        color: ${COLORS.red};
    }
`;

export const Wrapper = styled.div`
    display: flex;
    align-items: center;
    box-shadow:
        rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
        rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
    flex-direction: row;
    padding: 8px;
    justify-content: space-between;
    background-color: ${COLORS.white};
`;

export const RemoveIcon = styled(RemoveCircleIcon)`
    padding: 8px; // so that the icon has a larger click area
    color: ${COLORS.black};
    &:hover {
        color: ${COLORS.red};
    }
    cursor: pointer;
`;

export const KeyWord = styled.div`
    display: flex;
    padding: 10px;
    gap: 10px;
    flex-wrap: wrap;
    width: 100%;
`;
