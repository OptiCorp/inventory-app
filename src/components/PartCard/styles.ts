import { styled } from 'styled-components';
import { COLORS } from '../../style/GlobalStyles';

export const PartCardContainer = styled.div`
    margin: 16px;
    padding: 4px;
    max-width: 700px;
    margin-inline: auto;
`;

export const DescriptionParagraph = styled.p`
    width: 100%;
    display: -webkit-box;
    border-radius: 3px;
    width: 90%;
    overflow: hidden;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    margin: 8px 0px;
`;

export const CompactDesriptionParagraph = styled.p`
    border-radius: 3px;
    overflow: hidden;
    display: flex;
    line-height: 1.5rem;
    word-wrap: break-word;
    max-height: 50px;
    padding: 10px 20px;
    justify-content: start;
`;

export const PartCardCompactContainer = styled.div`
    background-color: ${COLORS.lightestGray};
    margin: 16px;
    box-shadow: 2px 4px 4px 0 rgba(0, 0, 0, 0.2);
    display: flex;
    flex-direction: column;
    max-width: 500px;
    position: relative;
`;

export const CompactCardWrapper = styled.div`
    padding-right: 2rem;
    padding-left: 1rem;
`;

export const SearchCard = styled.div`
    position: relative;
    line-height: 25px;
    padding: 1rem;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    background: ${COLORS.lightestGray};
    box-shadow: 2px 4px 4px 0 rgba(0, 0, 0, 0.2);
`;

export const SearchCardSkeleton = styled.div`
    position: relative;
    line-height: 25px;

    padding: 1rem;
    display: flex;
    justify-content: center;
    background-color: ${COLORS.white};
`;

export const FlexContainer = styled.div`
    display: flex;
`;

export const CompactCardSkeleton = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-basis: 100%;
    cursor: pointer;
    border-right: 1px solid rgba(208, 208, 208);
    background-color: ${COLORS.white};
    padding: 1rem;
`;

export const CompactCard = styled.div`
    padding: 10px;
`;

export const SecondInfoBox = styled.div`
    padding: 8px;
    line-height: 25px;
    grid-column: 2/2;
    border-right: 1px solid rgba(208, 208, 208);
    border-left: 1px solid rgba(208, 208, 208);
`;

export const ThirdInfoBox = styled.div`
    margin: 1rem 0;
    line-height: 25px;
    padding-left: 30px;
    padding-right: 30px;
`;

export const FirstInfoBox = styled.div`
    margin: 1rem 0;
    line-height: 25px;
    padding-left: 30px;
    padding-right: 30px;
`;

export const InfoP = styled.div`
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    width: 100%;
    flex-direction: row;
`;

export const KeyWords = styled.p`
    font-weight: 600;
    width: 100%;
`;

export const CompactInfoP = styled.div`
    line-height: 1.5rem;
    width: 100%;
`;
export const ButtonText = styled.p`
    display: inline;
    font-size: 0.8rem;
`;
export const DescriptionWrap = styled.div`
    padding-bottom: 5px;
`;
