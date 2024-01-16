import { Box, ListItem } from '@mui/material';
import styled from 'styled-components';

export const DropdownItem = styled(ListItem)`
    && {
        margin-left: 20px;
        padding: 0 16px;
    }
`;

export const HamburgerContainer = styled(Box)`
    &&&& {
        width: 250px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 100%;
    }
`;
