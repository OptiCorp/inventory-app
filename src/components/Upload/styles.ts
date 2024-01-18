import { styled } from 'styled-components';
import { COLORS } from '../../style/GlobalStyles';

export const Wrapper = styled.div`
    display: flex;
    padding: 12px 20px;
    margin: 8px 0;
    border: 1px dashed ${COLORS.primary};
    box-sizing: border-box;
    min-height: 80px;
`;
export const Container = styled.div`
    padding-left: 10px;
    margin-bottom: 25px;
    display: flex;
    justify-content: flex-end;
`;
export const StyledLabel = styled.label`
    background-color: ${COLORS.secondary};
    color: ${COLORS.primary};
    border: 1px solid ${COLORS.primary};
    cursor: pointer;
    align-self: flex-end;
    padding: 7px 30px 7px 30px;
    width: 88px;
`;

export const StyledFileContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 4px;
`;

export const StyledFileShapeWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    width: 100%;
    padding: 4px;
    box-sizing: border-box;
`;

export const StyledIconWrapper = styled.div`
    display: flex;
    justify-content: space-evenly;
`;

export const StyledTypeWrapper = styled.div`
    margin-left: 16px;
`;

export const StyledDocumentName = styled.span`
    margin-top: 4px;
`;

export const StyledFileWrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding-right: 16px;
`;
