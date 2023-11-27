import { Link } from "react-router-dom";
import styled, { keyframes } from 'styled-components';
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

const Rotate = keyframes`
 0%{

    transform: rotate(0deg); 
 }
 
    100% { transform: rotate(360deg); }
`;


export const LoaderWrapper = styled.div` border: 16px solid #f3f3f3; /* Light grey */


width: 100px;
margin: 0;



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
  
  border-top: 2px solid grey;
  border-right: 2px solid grey;
  border-bottom: 2px solid grey;
  border-left: 2px solid black;
  background: transparent;
  width: 24px;
  height: 24px;
  border-radius: 50%;
`;

