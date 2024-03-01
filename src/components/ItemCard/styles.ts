import { styled } from 'styled-components';
import { COLORS } from '../../style/GlobalStyles';

export const StyledSearchCard = styled.div`
    position: relative;
    background: ${COLORS.lightestGray};
    box-shadow: 2px 4px 4px 0 rgba(0, 0, 0, 0.2);

    &:hover {
        background: ${COLORS.lightGray};
    }
`;
