import { Link } from 'react-router-dom'
import styled, { keyframes } from 'styled-components'
type Props = {
    height?: string
}
export const SearchContainer = styled.div<Props>`
    display: flex;
    flex-direction: column;

    height: ${({ height }) => height};
`

export const LoadMoreButton = styled.button`
    background-color: #f5f5f5;
    border-radius: 8px;
    box-shadow: 2.5px 2.5px gray;
`

export const Container = styled.div`
    display: flex;
    flex-direction: column;
`

export const RecentSearchContainer = styled.div`
    display: flex;
    margin: 16px;
    justify-content: space-between;
    flex-direction: column;
    padding: 4px;
    border-radius: 8px;
    max-width: 1000px;
    gap: 1rem;
`

export const StyledLink = styled(Link)`
    text-decoration: none;
    color: black;
`

export const StyledSearchedLink = styled(Link)`
    color: black;
`

export const GlobalSpinnerContainer = styled.div`
    padding-top: 6rem;

    padding-left: 43%;
    padding-bottom: 4rem;
`

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

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
`

export const RecentTitle = styled.h3`
    font-weight: 600;
    margin: 0;
    line-height: 2rem;
`
