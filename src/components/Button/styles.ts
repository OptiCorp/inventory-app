import { ComponentProps } from 'react';
import styled from 'styled-components';

export const SubmitButton = styled('button')<{
    $backgroundColor: string;
    color: ComponentProps<'button'>['color'];
    height?: string;
    variant: string;
}>`
    &:active {
        transform: scale(1.03);
    }
    &:hover {
    }
    width: 200px;

    background-color: ${(props) => props.$backgroundColor};
    color: ${(props) => props.color};
    height: ${(props) => props.height ?? 'auto'};
    padding: 5px;
    border: 1px solid ${(props) => (props.variant === 'primary' ? 'black' : props.color)};
    cursor: pointer;
    text-transform: uppercase;
    font-family: 'Archivo', sans-serif;

    display: flex;
    justify-content: center;
    align-items: center;
`;
