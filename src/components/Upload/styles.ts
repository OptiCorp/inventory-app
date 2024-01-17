import { styled } from 'styled-components';
import { COLORS } from '../../style/GlobalStyles';

export const Wrapper = styled.div`
    display: flex;
    padding: 12px 20px;
    margin: 8px 0;
    border: dashed;
    border: 1px dashed ${COLORS.black};
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
    background-color: ${COLORS.white};
    color: ${COLORS.black};
    border: 1px solid ${COLORS.black};
    cursor: pointer;
    align-self: flex-end;
    padding: 7px 30px 7px 30px;
    width: 88px;
`;

export const FileContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 4px;
`;

export const FileShapeWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    width: 100%;
    padding: 4px;
    box-sizing: border-box;
`;

export const IconWrapper = styled.div`
    display: flex;
    justify-content: space-evenly;
`;

export const FileTypeWrapper = styled.div`
    margin-left: 16px;
`;

export const DocumentName = styled.span`
    margin-top: 4px;
`;

export const FileWrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding-right: 16px;
`;
