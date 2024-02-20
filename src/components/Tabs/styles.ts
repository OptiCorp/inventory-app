import styled from 'styled-components';
import { COLORS } from '../../style/GlobalStyles';

export const StyledTabContainer = styled.section`
    display: flex;
    flex-direction: row;
    width: 100%;
    border-bottom: 2px ${COLORS.black};
    height: 60px;
`;
export const StyledTabButton = styled.button<{ active: boolean }>`
    padding: 1rem;
    width: 100px;
    cursor: pointer;
    display: flex;
    align-items: center;
    position: relative;
    transition: 0.6s;
    background: ${(props) => (props.active ? ` ${COLORS.black}` : ` ${COLORS.white}`)};
    &:focus {
        outline: none;
    }
`;

export const StyledNumberofItems = styled.span<{ active: boolean }>`
    position: absolute;
    right: 0;
    padding: 1rem;
    color: ${(props) => (props.active ? ` ${COLORS.white}` : ` ${COLORS.black}`)};
`;
export const StyledTitle = styled.span<{ active: boolean }>`
    position: relative;
    display: flex;
    text-transform: uppercase;

    color: ${(props) => (props.active ? `${COLORS.white}` : ` ${COLORS.black}`)};
    transition: 0.6s;
`;
export const StyledIndicator = styled.span<{ active: boolean }>`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transition: 0.6s;
`;
