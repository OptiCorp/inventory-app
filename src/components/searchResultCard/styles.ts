import { styled } from 'styled-components'
import { COLORS } from '../../style/GlobalStyles'

export const ResultCardContainer = styled.div`
    margin: 16px;

    padding: 4px;
    border-radius: 8px;
    cursor: pointer;
    max-width: 1000px;
    margin-inline: auto;
    box-shadow: 2.5px 2.5px grey;
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
    line-height: 1.5rem;
    word-wrap: break-word;
    max-height: 50px;
    padding: 10px 20px;
    justify-content: start;
`

export const ResultCardCompactContainer = styled.div`
    background-color: ${COLORS.secondary};
    border-radius: 8px;
    margin: 16px;
    box-shadow: 2.5px 2.5px gray;
    display: flex;
    flex-direction: column;
    max-width: 500px;
`

export const CompactCardWrapper = styled.div`
    padding-right: 2rem;
    padding-left: 1rem;
`

export const SearchCard = styled.div`
    position: relative;
    line-height: 25px;
    border-radius: 5px;
    padding: 1rem;
    display: grid;
    grid-template-columns: minmax(200px, 300px) minmax(200px, 300px) minmax(
            200px,
            300px
        );
    border-right: 1px solid rgba(208, 208, 208);
    background-color: ${COLORS.secondary};
`

export const CompactCard = styled.div`
    border-radius: 5px;
    display: flex;
    flex-basis: 100%;
    cursor: pointer;
    border-right: 1px solid rgba(208, 208, 208);
    background-color: ${COLORS.secondary};
    padding: 1rem;
`

export const CardInfoWrap = styled.div`
    display: grid;
    cursor: pointer;
    grid-template-rows: 1fr;
    grid-template-columns: 1fr 400px 1fr;
`

export const FirstInfoBox = styled.div`
    margin: 1rem 0;
    display: flex;
    justify-content: space-evenly;
    flex-direction: column;
    line-height: 25px;
    padding-right: 8px;

    border-right: 1px solid rgba(208, 208, 208);
`

export const SecondInfoBox = styled.div`
    padding: 8px;
    line-height: 25px;
    grid-column: 2/2;
    border-right: 1px solid rgba(208, 208, 208);
`

export const ThirdInfoBox = styled.div`
    margin: 1rem 0;
    display: flex;
    justify-content: space-evenly;
    flex-direction: column;
    line-height: 25px;
    padding-right: 8px;

    border-right: 1px solid rgba(208, 208, 208);
`

export const InfoP = styled.p`
    line-height: 1rem;
    display: flex;
    justify-content: space-evenly;
    flex-direction: row;
`

export const KeyWords = styled.span`
    font-weight: 600;
`
export const CompactInfoP = styled.div`
    padding-right: 2rem;
    line-height: 1.5rem;
`
