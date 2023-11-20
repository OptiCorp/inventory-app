import { styled } from "styled-components";

type InputProps = {
    width: number;
}

export const StyledInput = styled.input<InputProps>`
    border-style: none none solid none;
    flex-basis: 100%;
    max-width: 1000px;
    font-size: ${({ width }) => width >= 600 ? '20px' : '16px'};
    outline: none;
`;

export const SearchBarContainer = styled.div`
    display: flex;
    flex-basis: 100%;
    padding: 16px;
`;
