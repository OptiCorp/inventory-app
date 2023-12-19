import { styled } from 'styled-components'
import { COLORS } from '../../style/GlobalStyles'

export const ResultCardContainer = styled.div`
    margin: 16px;

    padding: 4px;
    border-radius: 8px;
    cursor: pointer;
    max-width: 700px;
    margin-inline: auto;
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
    background-color: #fbfbfb;
    border-radius: 8px;
    margin: 16px;
    box-shadow: 2.5px 2.5px gray;
    display: flex;
    flex-direction: column;
    max-width: 500px;
    position: relative;
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
    grid-template-columns: 1fr 1fr 1fr;
    background: #fbfbfb;
    box-shadow: 2px 4px 4px 0px rgba(0, 0, 0, 0.2);
`

export const CompactCard = styled.div`
    border-radius: 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-basis: 100%;
    cursor: pointer;
    border-right: 1px solid rgba(208, 208, 208);
    background-color: #fbfbfb;
    padding: 1rem;
`

export const SecondInfoBox = styled.div`
    padding: 8px;
    line-height: 25px;
    grid-column: 2/2;
    border-right: 1px solid rgba(208, 208, 208);
`

export const ThirdInfoBox = styled.div`
    margin: 1rem 0;
    line-height: 25px;
    padding-left: 30px;
    padding-right: 30px;
`

export const FirstInfoBox = styled.div`
    margin: 1rem 0;
    line-height: 25px;
    padding-left: 30px;
    padding-right: 30px;
    border-right: 1px solid rgba(208, 208, 208);
`

export const InfoP = styled.div`
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    flex-direction: row;
`

export const KeyWords = styled.span`
    font-weight: 600;
`

export const CompactInfoP = styled.div`
    padding-right: 2rem;
    line-height: 1.5rem;
`
