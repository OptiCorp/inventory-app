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
    flex-direction: column;
    padding: 16px;
`;

export const ButtonContainer = styled.div`
    display: flex;

    justify-content: end;
    width: 100%;
    margin: 8px 0;
`;

export const ButtonWrapper = styled.div`
    display: flex;
    align-items: flex-end;
    justify-content: end;
    padding: 16px;
`;
