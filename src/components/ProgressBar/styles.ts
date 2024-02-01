import { Link } from 'react-router-dom';
import { styled } from 'styled-components';
import { COLORS } from '../../style/GlobalStyles';

const primaryColor: string = COLORS.black;
const grayColor: string = COLORS.gray;

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

export const StyledProgressCircle = styled.div<ProgressProps>`
    border-radius: 50%;
    border: 5px solid gray;
    background-color: ${({ finished }) => (finished ?? false ? primaryColor : grayColor)};
    border-color: ${({ active, finished }) => (active || finished ? primaryColor : grayColor)};
    width: 10px;
    height: 10px;
    padding: 8px;
    color: ${({ finished }) => (finished ? COLORS.white : primaryColor)};
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const StyledProgressLine = styled.div<ProgressProps>`
    background-color: ${({ active }) => (active ? primaryColor : grayColor)};
    height: 3px;
    align-self: center;
    margin: 0 4px;
    flex-grow: 1;
`;

export const StyledProgressLink = styled(Link)`
    text-decoration: none;
`;
