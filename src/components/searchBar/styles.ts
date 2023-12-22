import { styled } from 'styled-components'

type InputProps = {
    width: number
}

export const StyledInput = styled.input<InputProps>`
    border-style: none;
    border-bottom: 1px solid #000;
    flex-basis: 90%;
    padding: 1rem;
    text-indent: 50px;

    max-width: 2000px;
    font-size: ${({ width }) => (width >= 600 ? '20px' : '16px')};
    outline: none;
`

export const SearchBarContainer = styled.div`
    display: flex;
    flex-basis: 100%;
    padding: 16px;
`

export const Icon = styled.span`
    padding-top: 1rem;

    width: 0;
    height: 0;
    z-index: 2;
`
