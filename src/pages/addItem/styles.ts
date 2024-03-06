import { Form } from 'react-router-dom';
import { styled } from 'styled-components';

export const ItemForm = styled(Form)`
    input,
    select {
        width: 100%;
        padding: 12px 20px;
        margin: 8px 0;

        display: inline-block;
        border: 1px solid #ccc;
        border-radius: 4px;
        box-sizing: border-box;
    }
`;

export const FormContainer = styled.div`
    display: flex;
    padding: 16px;
    flex-direction: column;
    gap: 10px;
`;

export const ButtonContainer = styled.div`
    display: flex;
    justify-content: end;
    width: 100%;
    margin: 8px 0;
    gap: 10px;
`;

export const ButtonWrapper = styled.div`
    display: flex;
    align-items: flex-end;
    justify-content: end;
    padding: 16px;
    @media screen and (max-width: 800px) {
        display: flex;
        justify-content: end;
        padding: 16px;
        height: 2rem;
    }
`;
export const StyledLabelText = styled.p`
    font-weight: 600;
    display: inline;
    margin: 20px 0;
    margin-left: 10px;
`;
