import { styled } from 'styled-components';
import { COLORS } from '../../../style/GlobalStyles';

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
