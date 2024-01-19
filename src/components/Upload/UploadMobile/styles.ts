import { styled } from 'styled-components';
import { COLORS } from '../../../style/GlobalStyles';

export const Wrapper = styled.div`
    .hidden {
        visibility: hidden;
        display: flex;
        flex-direction: column;
        padding-right: 16px;
    }

    .visible {
        display: flex;
        flex-direction: column;
        padding-right: 16px;
    }
    display: flex;
    padding: 12px 20px;
    margin: 8px 0;
    border: dashed;
    border: 1px dashed ${COLORS.black};
    box-sizing: border-box;
    min-height: 80px;
    overflow-x: auto;
    position: relative;
`;
export const Container = styled.div`
    padding-left: 10px;
    margin-bottom: 25px;
    display: flex;
    justify-content: flex-end;
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

export const StyledFileTypeWrapper = styled.div`
    margin-left: 16px;
`;

export const StyledDocumentName = styled.span`
    margin-top: 4px;
`;

export const StyledFileWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-right: 16px;
`;
