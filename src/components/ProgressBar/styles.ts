import { Link } from 'react-router-dom';
import { styled } from 'styled-components';
import { COLORS } from '../../style/GlobalStyles';

type ProgressProps = {
    active: boolean;
    width: number;
    finished?: boolean;
};

export const Container = styled.div`
    display: flex;
    padding-bottom: 16px;
    max-width: 500px;
`;

export const ProgressCircle = styled.div<ProgressProps>`
    border-radius: 50%;
    border: 5px solid gray;
    background-color: ${({ finished }) => (finished ? COLORS.primary : COLORS.gray)};
    border-color: ${({ active, finished }) => (active || finished ? COLORS.primary : COLORS.gray)};
    width: 10px;
    height: 10px;
    padding: 8px;
    color: ${({ finished }) => (finished ? COLORS.secondary : COLORS.primary)};
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const ProgressLine = styled.div<ProgressProps>`
    background-color: ${({ active }) => (active ? COLORS.primary : COLORS.gray)};
    height: 3px;
    align-self: center;
    margin: 0 4px;
    flex-grow: 1;
`;

export const ProgressLink = styled(Link)`
    text-decoration: none;
`;
