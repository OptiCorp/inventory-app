import { styled } from "styled-components";
import { Link } from "react-router-dom";

type ProgressProps = {
  active: boolean
  width: number
}

export const Container = styled.div`
  display: flex;
  padding-bottom: 16px;
  justify-content: center;
`;

export const ProgressCircle = styled.div<ProgressProps>`
  border-radius: 24px; 
  background-color: ${({ active }) => active ? 'black' : '#CACACA'};
  width: 20px;
  padding: 8px;
  color: ${({ active }) => active ? 'white' : 'black'};
  display: flex;
  justify-content: center;
`;

export const ProgressLine = styled.div<ProgressProps>`
  width: ${({ width }) => width > 400 ? '100px' : '50px'};
  background-color: ${({ active }) => active ? 'black' : '#CACACA'};
  height: 3px;
  align-self: center;
  margin: 0 4px;
`;

export const ProgressLink = styled(Link)`
  text-decoration: none;
`;

export const Progress = styled.div`
border-radius: 20px;
background-color: black;
width: 20px;
color: white;
justify-content: center;
display: flex;
padding: 8px;
`;


export const Wrapper = styled.div`
width: 60px;
background-color: black; height: 3px;
align-self:center; 
margin-left: 4px;`;
