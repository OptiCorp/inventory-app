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

export const LoadMoreButton = styled.button`
    background-color: #F5F5F5;
    border-radius: 8px;
    box-shadow: 2.5px 2.5px gray;
`;


export const Container = styled.div`
display: flex;
flex-direction: column;

`;
export const StyledLink = styled(Link)`text-decoration: none;
color: black;
`;