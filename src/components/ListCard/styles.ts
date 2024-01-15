import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import InfoIcon from '@mui/icons-material/Info';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { styled } from 'styled-components';
import { COLORS } from '../../style/GlobalStyles';
export const ListWrapper = styled.div`
    position: relative;
    padding: 8px;
    background-color: ${COLORS.card};
    &:hover {
        background: ${COLORS.whiteSmoke};
    }
    cursor: pointer;
    box-shadow: 2px 4px 4px 0 rgba(0, 0, 0, 0.2);
    width: 95%;
    max-width: 450px;
`;

export const StyledTitle = styled.h2`
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
`;

export const StyledDeleteIcon = styled(DeleteForeverIcon)`
    color: ${COLORS.primary};
    position: absolute;
    top: 2px;
    cursor: pointer;
    right: 0;
    &:hover {
        color: ${COLORS.dangerRed};
    }
`;

export const StyledInfoIcon = styled(InfoIcon)`
    color: ${COLORS.primary};
    position: absolute;
    padding: 10px;
    top: 2px;
    cursor: pointer;
    right: 50px;
    &:hover {
        color: ${COLORS.green};
    }
`;

export const StyledAddIcon = styled(AddCircleIcon)<{
    active: boolean;
    alreadyAdded: boolean;
}>`
    color: black;
    position: absolute;

    padding: 10px;
    top: 3px;
    right: 3px;

    color: ${(props) =>
        props.alreadyAdded ? COLORS.dangerRed : props.active ? COLORS.green : COLORS.primary};
    &:hover {
        color: ${(props) => (props.alreadyAdded ? 'red' : COLORS.green)};
    }

    cursor: pointer;
`;

export const StyledRemoveIcon = styled(RemoveCircleIcon)`
    color: ${COLORS.primary};
    position: absolute;

    top: 3px;
    right: 3px;
    &:hover {
        color: ${COLORS.dangerRed};
    }
    cursor: pointer;
`;
