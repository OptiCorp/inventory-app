import { styled } from 'styled-components';

export const StyledForm = styled.form`
    input,
    select {
        padding: 20px;

        margin: 0 auto;
        display: inline-block;
        box-sizing: border-box;
    }
`;

export const StyledLabelContainer = styled.div`
    display: flex;
    align-items: center;
    width: 100%;

    gap: 10px;
    white-space: nowrap;
`;
export const StyledIconContainer = styled.div`
    display: inline-flex;
    justify-content: baseline;
    gap: 10px;
    word-break: keep-all;
    white-space: nowrap;
`;

export const StyledFieldBox = styled.div`
    display: flex;
    gap: 10px;
`;
