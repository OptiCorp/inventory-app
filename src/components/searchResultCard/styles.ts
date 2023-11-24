import { styled } from "styled-components";
import { COLORS } from "../../style/GlobalStyles";

export const ResultCardContainer = styled.div`
    display: flex;
    margin: 16px;
    
    padding: 4px;
    border-radius: 8px;
    max-width: 1000px;
    box-shadow: 2.5px 2.5px gray;
`;

export const DescriptionParagraph = styled.p`
    width: 100%;
    display: -webkit-box;
    background-color: aliceblue;
    border-radius: 3px;
    width: 90%;
   
    overflow: hidden;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    margin: 8px 0px;
`;


export const CompactDesriptionParagraph = styled.p`

    background-color: aliceblue;
    border-radius: 3px;
    width: 90%;
 
    overflow: hidden;
   display: flex;
   padding: 10px 20px;
   justify-content: start;
`;



export const ResultCardCompactContainer = styled.div`
    display: flex;
background-color:${COLORS.white};
    border-radius: 8px;
    margin: 16px;
    padding: 4px;
    box-shadow: 2.5px 2.5px gray;
    flex-direction: column;
    max-width: 500px;
`;


export const CompactCardWrapper = styled.div`
padding-right: 150px;
padding-left: 20px;
`;

export const Card = styled.div`

line-height: 25px;
border-radius: 5px;
padding: 1rem;
width: 100%;
border-right: 1px solid rgba(208, 208, 208);
background-color:${COLORS.white};
`;

export const CompactCard = styled.div`


border-radius: 5px;
display: flex;
justify-content: start;
flex-basis: 100%;
width: 100%;
border-right: 1px solid rgba(208, 208, 208);
background-color:${COLORS.white};
`;


