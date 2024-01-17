import { styled } from 'styled-components';
import { COLORS } from '../../style/GlobalStyles';

type InputProps = {
    width: number;
};

export const StyledInput = styled.input<InputProps>`
    border-style: none;
    border-bottom: 1px solid ${COLORS.black};
    flex-basis: 90%;
    padding: 1rem;
    text-indent: 50px;

    max-width: 1000px;
    font-size: ${({ width }) => (width >= 600 ? '1.3rem' : '1rem')};
    outline: none;
`;

export const SearchBarContainer = styled.div`
    display: flex;
    flex-basis: 100%;
`;

export const Icon = styled.span`
    padding-top: 1rem;

    width: 0;
    height: 0;
    z-index: 2;
`;
