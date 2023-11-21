import { styled } from "styled-components";

type InputProps = {
    width: number;
}


// export const DropdownButton = styled.button`
//     margin-left: 16px;
//     margin-bottom: 10px;
//     color: red;
//     background-color: black;
//     border-style: none;
// `;

export const CenterDiv = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 10px;
    max-width: 1000px;
`;

export const DropdownButton = styled.button`
    margin-left: 16px;
    margin-bottom: 10px;
    background-color: black;
    color: white;
    padding: 5px 15px;
    border-radius: 5px;
    outline: 0;
    text-transform: uppercase;
    cursor: pointer;
    box-shadow: 0px 2px 2px lightgray;
    transition: ease background-color 250ms;
    :hover {
        background-color: "#373433"
    }
    &:disabled {
        cursor: default;
        opacity: 0.7;
    }
`;
