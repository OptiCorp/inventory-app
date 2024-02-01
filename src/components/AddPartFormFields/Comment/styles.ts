import { styled } from 'styled-components';
import { COLORS } from '../../../style/GlobalStyles';

export const StyledInputWrap = styled.div`
    display: inline-block;
    padding-top: 1rem;
    padding-bottom: 0.4rem;
`;
export const StyledTextArea = styled.textarea`
    margin: 0;
    padding: 1rem;
    width: 100%;
    max-width: 500px;
    display: block;
    background-color: ${COLORS.lightGray};
    border: none;
    border-radius: 0;
    border-bottom: 1px solid #000;
    box-sizing: border-box;
`;
