import { styled } from 'styled-components'
import { COLORS } from '../../style/GlobalStyles'


export const ResultCardContainer = styled.div`
    margin: 16px;

    padding: 4px;
    border-radius: 8px;
    cursor: pointer;
    max-width: 1000px;
    margin-inline: auto;
    box-shadow: 2.5px 2.5px gray;
`

export const DescriptionParagraph = styled.p`
    width: 100%;
    display: -webkit-box;
    background-color: ${COLORS.aliceBlue};
    border-radius: 3px;
    width: 90%;

    overflow: hidden;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    margin: 8px 0px;
`

export const CompactDesriptionParagraph = styled.p`
    background-color: ${COLORS.aliceBlue};
    border-radius: 3px;

    overflow: hidden;
    display: flex;
    padding: 10px 20px;
    justify-content: start;
`

export const ResultCardCompactContainer = styled.div`
    display: flex;
    background-color: ${COLORS.white};
    border-radius: 8px;
    margin: 16px;

    box-shadow: 2.5px 2.5px gray;
    flex-direction: column;
    max-width: 500px;
`

export const CompactCardWrapper = styled.div`
    padding-right: 2rem;
    padding-left: 1rem;
`

export const SearchCard = styled.div`
    line-height: 25px;
    border-radius: 5px;
    padding: 1rem;

    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    border-right: 1px solid rgba(208, 208, 208);
    background-color: ${COLORS.white};
`

export const CompactCard = styled.div`
    border-radius: 5px;
    display: flex;
    gap: 2rem;
    flex-basis: 100%;
    cursor: pointer;
    border-right: 1px solid rgba(208, 208, 208);
    background-color: ${COLORS.white};
`

export const CardInfoWrap = styled.div`
    display: grid;
    cursor: pointer;
    grid-template-rows: 1fr;
    grid-template-columns: 1fr 400px 1fr;
`

export const FirstInfoBox = styled.div`
    margin: 1rem 0;
    display: inline-block;
    line-height: 25px;
    padding-right: 8px;
    border-right: 1px solid rgba(208, 208, 208);
`

export const SecondInfoBox = styled.div`
    padding: 8px;
    line-height: 25px;
    border-right: 1px solid rgba(208, 208, 208);
`

export const ThirdInfoBox = styled.div`
    grid-column: 3/3;
    display: inline;
    margin: 1rem 0;
    padding: 8px;
    line-height: 25px;
`

export const InfoP = styled.p``

export const KeyWords = styled.p`
    margin: 0;
    font-weight: 600;
    display: inline-block;
    min-width: 100px;

    padding-right: 1rem;
`
export const CompactInfoP = styled.p`
    max-width: 100px;
    line-height: 1.5rem;
`
