import { styled } from "styled-components";

export const ResultCardContainer = styled.div`
    display: flex;
    margin: 16px;
    background-color: #F5F5F5;
    padding: 4px;
    border-radius: 8px;
    max-width: 1000px;
    box-shadow: 2.5px 2.5px gray;
`;

export const DescriptionParagraph = styled.p`
    width: 100%;
    display: -webkit-box;
    overflow: hidden;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    margin: 8px 0px;
`;

export const ResultCardCompactContainer = styled.div`
    display: flex;
    background-color: #F5F5F5;
    border-radius: 8px;
    margin: 16px;
    padding: 4px;
    box-shadow: 2.5px 2.5px gray;
    flex-direction: column;
    max-width: 500px;
`;

