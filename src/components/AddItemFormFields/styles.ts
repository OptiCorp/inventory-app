import styled from 'styled-components';
import { COLORS } from '../../style/GlobalStyles';
import { TextField } from '@mui/material';

export const StyledInputWrap = styled.div`
    display: flex;
    align-items: center;
    margin: 4px 0;
    gap: 10px;
    white-space: nowrap;
`;

export const StyledLabelContainer = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    gap: 10px;
    white-space: nowrap;
`;

export const StyledErrorP = styled.span`
    color: red;
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    font-weight: 600;
`;

export const StyledIconContainer = styled.div`
    display: inline-flex;
    justify-content: baseline;
    gap: 10px;
    word-break: keep-all;
    white-space: nowrap;
`;

export const StyledDiv = styled.div`
    max-width: 500px;
    padding-right: 5px;
`;

export const EllipsisText = styled.span`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    min-width: 80px;
`;

export const ScrollWrapContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    max-width: 480px;
    min-height: 20px;
    max-height: 50px;
    overflow-y: auto;
    border: 1px dotted ${COLORS.darkGray};
    padding: 10px;
`;

export const StyledTextField = styled(TextField)`
    fieldset {
        border-radius: 0;
    }
`;
export const StyledFieldBox = styled.div`
    display: flex;
    gap: 10px;
`;
