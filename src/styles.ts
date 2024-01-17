import { styled } from 'styled-components';
import { COLORS } from './style/GlobalStyles';

export const BodyWrapper = styled.div`
    background-color: ${COLORS.InputGray};
    display: flex;
    justify-content: center;
    min-height: 100vh;
`;

export const AppContainer = styled.div`
    max-width: 1200px;
    width: 100%;
    background-color: ${COLORS.secondary};
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    box-sizing: border-box;
`;
