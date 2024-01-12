import { styled } from 'styled-components'
import { COLORS } from '../../style/GlobalStyles'

export const ResultCardContainer = styled.div`
    margin: 16px;

    padding: 4px;

    max-width: 700px;
    margin-inline: auto;
`

export const CompactDesriptionParagraph = styled.p`
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
    background-color: ${COLORS.card};
    margin: 16px;
    box-shadow: 2px 4px 4px 0 rgba(0, 0, 0, 0.2);
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
    padding: 1rem;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    background: ${COLORS.card};
    box-shadow: 2px 4px 4px 0 rgba(0, 0, 0, 0.2);
`

export const SearchCardSkeleton = styled.div`
    position: relative;
    line-height: 25px;

    padding: 1rem;
    display: flex;
    justify-content: center;
    background-color: ${COLORS.secondary};
`

export const FlexContainer = styled.div`
    display: flex;
`

export const CompactCardSkeleton = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-basis: 100%;
    cursor: pointer;
    border-right: 1px solid rgba(208, 208, 208);
    background-color: ${COLORS.secondary};
    padding: 1rem;
`

export const CompactCard = styled.div`
    padding: 10px;
`

export const CompactInfoP = styled.div`
    line-height: 1.5rem;
    width: 100%;
`
export const ButtonText = styled.p`
    display: inline;
    font-size: 0.8rem;
`
export const DescriptionWrap = styled.div`
    padding-bottom: 5px;
`
export const KeyWords = styled.p`
    font-weight: 600;
    width: 100%;
`
