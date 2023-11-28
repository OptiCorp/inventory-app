import { Form, Link, NavLink } from "react-router-dom";
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
    padding: 16px;
`;

export const FormContainer = styled.div`
    padding: 16px;
    max-width: 1000px;
    display: flex;
    flex-direction: column;
`;

export const FormRadio = styled.form`
  display: flex;
  flex-direction: column;
  padding-bottom: 16px;
  input, label {
    padding: 8px 0;
  }
  input {
    transform: scale(1.5);    
  }
`;

export const SubmitButton = styled.button`
  width: 150px;
  background-color: black;
  color: white;
  height: 30px;
`;
