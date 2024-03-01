import { styled } from 'styled-components';
import { COLORS } from '../../style/GlobalStyles';

export const AdminContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 16px;
`;

export const SearchResultContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

export const AdminInput = styled.input`
    &&& {
        width: 100%;
        height: 40px;
        flex-shrink: 0;
        border-radius: 0;
        border-bottom: 1px solid #000;
        border-top: none;
        border-left: none;
        border-right: none;
        background: ${COLORS.lightGray};
    }
`;

export const ErrorP = styled.span`
    color: ${COLORS.red};
    font-weight: 600;
`;

export const InputWrap = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: start;
    flex-wrap: wrap;
`;

export const FormContainer = styled.div`
    padding: 16px;
    display: flex;
    flex-direction: column;
`;

export const StyledForm = styled.form`
    input,
    select {
        padding: 12px 20px;
        margin: 8px 0;
        display: inline-block;
        border: 1px solid #ccc;
        border-radius: 4px;
        box-sizing: border-box;
    }
`;

export const ButtonContainer = styled.div`
    display: flex;
    justify-content: end;
    padding: 8px;
`;

export const SubmitButtonContainer = styled.div`
    display: flex;
    justify-content: end;
    width: 100%;
    margin: 8px 0;
`;

export const TemplateFormContainer = styled.div`
    padding: 16px;
    display: flex;
    flex-direction: column;
    max-width: 500px;
`;

export const StyledTemplateForm = styled.form`
    padding-right: 16px;
`;
