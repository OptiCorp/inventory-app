import { Form, NavLink } from "react-router-dom";
import { styled } from "styled-components";


export const PartForm = styled(Form)`
    input, select {
        width: 100%;
        padding: 12px 20px;
        margin: 8px 0;
        display: inline-block;
        border: 1px solid #ccc;
        border-radius: 4px;
        box-sizing: border-box;
    }
`;

export const RecentlyAddedContainer = styled.div`

`;

export const FormContainer = styled.div`
    max-width: 1000px;
    display: flex;
    flex-direction: column;
`;

// export const SubmitButton = styled.button`
//     width: 150px;
//     background-color: black;
//     color: white;
//     height: 30px;

// `
