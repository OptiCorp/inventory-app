import { ComponentProps } from 'react';
import styled from 'styled-components';
import { COLORS } from '../../style/GlobalStyles';

export const SubmitButton = styled('button')<{
    $backgroundColor: string;
    color: ComponentProps<'button'>['color'];
    height?: string;
}>`
    &:active {
        transform: scale(1.03);
    }
    &:hover {
    }
    width: 150px;

    background-color: ${(props) => props.$backgroundColor};
    color: ${(props) => props.color};
    height: ${(props) => props.height ?? 'auto'};
    padding: 5px;
    border: 1px solid ${COLORS.primary};
    cursor: pointer;
    margin-right: 0;
    text-transform: uppercase;
`;

export const Wrapper = styled.div`
    display: flex;
    align-items: flex-end;

    justify-content: end;
`;

export const ButtonsWrapper = styled.div`
    justify-content: end;
`;
