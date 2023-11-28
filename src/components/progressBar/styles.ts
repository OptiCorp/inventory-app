import { styled } from "styled-components";
import { Link } from "react-router-dom";

type ProgressProps = {
    active: boolean
    width: number
}

export const Container = styled.div`
  display: flex;
  padding-bottom: 16px;
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
  width: ${({ width }) => width > 400 ? '100px' : '45px'};
  background-color: ${({ active }) => active ? 'black' : '#CACACA'};
  height: 3px;
  align-self: center;
  margin: 0 4px;
`;

export const ProgressLink = styled(Link)`
  text-decoration: none;
`;
