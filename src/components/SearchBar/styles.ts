import { styled } from 'styled-components';
import { COLORS } from '../../style/GlobalStyles';

type InputProps = {
    width: number;
};

export const StyledInput = styled.input<InputProps>`
    border-style: none;
    border-bottom: 1px solid ${COLORS.black};
    flex-basis: 100%;
    padding: 1rem;
    text-indent: 50px;
    font-size: ${({ width }) => (width >= 600 ? '1.3rem' : '1rem')};
    outline: none;
`;

export const StyledSearchBarContainer = styled.div`
    display: flex;
    flex-basis: 100%;
`;

export const StyledIcon = styled.span`
    padding-top: 1rem;
    width: 0;
    height: 0;
    z-index: 2;
`;
