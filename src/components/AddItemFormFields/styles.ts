import styled from 'styled-components';

export const StyledInputWrap = styled.div`
    display: grid;
    margin: 4px 0;
    grid-template-columns: 1fr 1fr;
`;

export const StyledErrorP = styled.span`
    color: red;
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    font-weight: 600;
`;

export const StyledIconContainer = styled.div`
    display: inline-flex;
    justify-content: baseline;
    gap: 10px;
    white-space: nowrap;
`;

export const StyledDiv = styled.div`
    max-width: 500px;
    padding-right: 5px;
`;
