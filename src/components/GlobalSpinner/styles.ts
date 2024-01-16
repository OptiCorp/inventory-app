import styled, { keyframes } from 'styled-components';
import { COLORS } from '../../style/GlobalStyles';

export const GlobalSpinnerContainer = styled.div`
    padding-top: 6rem;
    padding-bottom: 4rem;
    display: flex;
    justify-content: center;
`;

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const Spinner = styled.div`
    animation: ${rotate360} 1s linear infinite;
    transform: translateZ(0);

    border-top: 2px solid ${COLORS.mainGrey};
    border-right: 2px solid ${COLORS.mainGrey};
    border-bottom: 2px solid ${COLORS.mainGrey};
    border-left: 2px solid ${COLORS.primary};
    background: transparent;
    width: 24px;
    height: 24px;
    border-radius: 50%;
`;
