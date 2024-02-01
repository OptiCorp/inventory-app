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
export const StyledFileContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 4px;
`;
