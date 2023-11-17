import { Link } from "react-router-dom";
import styled from "styled-components";
type Props = {
    height?: string;
}
export const SearchContainer = styled.div<Props>`
    display: flex;
    flex-direction: column;
    height: ${({ height }) => height};
`;

