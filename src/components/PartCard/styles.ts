import { styled } from 'styled-components';
import { COLORS } from '../../style/GlobalStyles';

export const StyledPartCardContainer = styled.div`
    margin: 16px;
    padding: 4px;
    max-width: 700px;
    margin-inline: auto;
`;

export const StyledDescriptionParagraph = styled.p`
    width: 100%;
    display: -webkit-box;
    border-radius: 3px;
    width: 90%;
    overflow: hidden;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    margin: 8px 0px;
`;

export const StyledCompactDesriptionParagraph = styled.p`
    border-radius: 3px;
    overflow: hidden;
    display: flex;
    line-height: 1.5rem;
    word-wrap: break-word;
    max-height: 50px;
    padding: 10px 20px;
    justify-content: start;
`;

export const StyledPartCardCompactContainer = styled.div`
    background-color: ${COLORS.lightGray};
    margin: 16px;
    box-shadow: 2px 4px 4px 0 rgba(0, 0, 0, 0.2);
    display: flex;
    flex-direction: column;
    max-width: 500px;
    position: relative;
`;

export const StyledCompactCardWrapper = styled.div`
    padding-right: 2rem;
    padding-left: 1rem;
`;

export const StyledSearchCard = styled.div`
    position: relative;
    line-height: 25px;
    padding: 1rem;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    background: ${COLORS.lightestGray};
    box-shadow: 2px 4px 4px 0 rgba(0, 0, 0, 0.2);
`;

export const StyledPartCardSkeleton = styled.div`
    position: relative;
    line-height: 25px;
    padding: 1rem;
    display: flex;
    justify-content: center;
    background-color: ${COLORS.white};
`;

export const StyledFlexContainer = styled.div`
    display: flex;
`;

export const StyledCompactCardSkeleton = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-basis: 100%;
    cursor: pointer;
    border-right: 1px solid rgba(208, 208, 208);
    background-color: ${COLORS.white};
    padding: 1rem;
`;

export const StyledCompactCard = styled.div`
    padding: 10px;
`;

export const StyledInfoP = styled.div`
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    width: 100%;
    flex-direction: row;
`;

export const StyledKeyWords = styled.p`
    font-weight: 600;
    width: 100%;
`;

export const StyledCompactInfoP = styled.div`
    line-height: 1.5rem;
    width: 100%;
`;

export const StyledDescriptionWrap = styled.div`
    padding-bottom: 5px;
`;
