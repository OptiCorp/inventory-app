import styled from 'styled-components';

export const Wrapper = styled.div`
    background-color: black;
    height: fit-content;
    border-right: 1px solid rgba(208, 208, 208);
    border-radius: 5px;
`;
export const PartList = styled.ul`
    margin: 0;
    max-width: 500px;
    gap: 20px;
    list-style: none;
    display: flex;

    flex-direction: row;
    text-decoration: underline;
`;
export const ListItem = styled.li`
    line-height: 2rem;
    cursor: pointer;

    margin: 0;
`;
export const Test = styled.div`
    display: flex;
    flex-direction: row;
    gap: 1rem;
    cursor: pointer;
    flex-wrap: wrap;
    align-items: center;
`;
export const Container = styled.div`
    display: flex;

    flex-wrap: wrap;
    flex-direction: column;
`;
export const AssemblyList = styled.ul`
    margin: 0;
    display: flex;
    list-style: none;
    flex-wrap: wrap;
    max-width: 500px;
    gap: 20px;
    flex-direction: row;
    text-decoration: underline;
`;
