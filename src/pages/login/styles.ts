import styled from 'styled-components';
import { COLORS } from '../../style/GlobalStyles';

export const LoginContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr auto 1fr;
    align-items: center;
    backdrop-filter: blur(5px);
    height: 100vh;
    width: 100%;

    text-align: center;
`;
export const ButtonWrapper = styled.div`
    width: 50%;
    min-width: 300px;
    margin: 0 auto;
`;

export const BackgroundContainer = styled.div`
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;

    @media (min-width: 1025px) {
        background-size: cover;
        background-position: center;
    }
`;

export const TitleHeader = styled.h1`
    font-style: italic;
    color: ${COLORS.black};
    text-shadow: 2px 0px 3px rgba(0, 0, 0, 0.5);
    font-weight: 500;
    margin: 0 auto;
`;

export const Header = styled.div`
    text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.5);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
`;

export const InfoText = styled.p`
    font-style: italic;
    min-width: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 30px;
    text-shadow: 2px 1px 1px rgba(0, 0, 0, 0.5);
    font-weight: 600;
    color: ${COLORS.white};
    margin: 0 auto;
`;

export const LoginButton = styled.button`
    color: ${COLORS.white};
    background-color: ${COLORS.black};
    width: 150px;
    height: 30px;
    border: 1px solid ${COLORS.black};
    text-transform: uppercase;
`;
