import { styled } from 'styled-components';
import { COLORS } from '../../style/GlobalStyles';

export const FlexWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    grid-auto-rows: max-content;
    grid-template-rows: 50px 1fr auto;
    gap: 16px;
    height: 90vh;
    padding-bottom: 20px;
    grid-column: 2/2;
    justify-content: space-between;
    background-color: ${COLORS.gray};
`;

export const SearchResultsContainer = styled.div`
    grid-column: 1/1;
    max-width: 900px;
    padding: 0 16px;
`;

type Props = {
    height?: string;
};
export const SearchContainerList = styled.div<Props>`
    display: grid;
    grid-template-columns: 1fr;
    gap: 3rem;
    height: ${({ height }) => height};
`;

export const ListContainer = styled.div`
    padding: 20px;
    overflow: auto;
    padding-bottom: 100px;
    display: flex;
    flex-direction: column;
    gap: 16px;
`;

export const ButtonWrap = styled.div`
    display: flex;
    flex-direction: row;
    gap: 100px;
    padding: 16px;
`;
export const FlexContainer = styled.div`
    display: flex;
    margin: 10px 0;
    gap: 10px;
    align-items: center;
    flex-direction: row;
`;
export const Header = styled.div`
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-evenly;
`;

export const ListTitle = styled.h3`
    font-weight: 600;
`;

export const Wrapper = styled.div`
    display: flex;
    font-weight: 600;
    margin: 1rem 0;
    flex-direction: column;
`;
export const WrapperCompact = styled.div`
    display: flex;
    gap: 30px;
    margin-inline: 10px;
    align-items: center;
    height: 60px;
    max-width: 500px;
    flex-direction: row;
`;
export const IconContainerCompact = styled.div`
    margin: 10px 0;
    display: flex;
`;
