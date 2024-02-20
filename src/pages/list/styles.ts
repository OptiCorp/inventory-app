import { styled } from 'styled-components';
type Props = {
    height?: string;
    width: number;
};

export const FlexWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding-bottom: 10px;
`;

export const SearchContainer = styled.div<Props>`
    display: flex;
    flex-direction: column;
    height: ${({ height }) => height};
`;
export const SearchAndButton = styled.div<Props>`
    display: flex;
    margin: 0 0 30px 0;
    gap: 1rem;
    flex-direction: ${({ width }) => (width >= 600 ? 'row' : 'column')};
`;
