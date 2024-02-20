import styled from 'styled-components';

export const RecentlyAddedContainer = styled.div``;
export const RecentlyAddedWrapper = styled.div`
    display: flex;
    justify-content: end;
    max-width: '1000px';
    padding: '16px';
`;

export const Container = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 16px;
`;

export const CardContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin: 32px;
    gap: 16px;

    @media (max-width: 800px) {
        gap: 0px;
        margin: 0px;
    }
`;
