import { styled } from 'styled-components';

export const StyledDescriptionParagraph = styled.p`
    display: flex;
    margin: 0px;
    width: 100%;
    display: -webkit-box;
    overflow: hidden;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 5;
`;

export const StyledInfoBox = styled.div`
    margin-top: 16px;
    margin-bottom: 16px;
    padding-left: 16px;
    padding-right: 16px;
    height: max;
    width: 100%;
    border-right: 1px solid rgba(208, 208, 208);
    border-left: 1px solid rgba(208, 208, 208);
`;

export const StyledBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: 16px;
    gap: 16px;
    width: 100%;
`;

export const StyledContent = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
    width: 100%;
    padding-left: 5px;
    padding-right: 5px;
`;

export const StyledTitle = styled.p`
    margin: 0px;
    display: flex;
    font-weight: 600;
`;

export const StyledText = styled.p`
    margin: 0px;
    display: flex;
`;

export const StyledContainer = styled.div`
    display: flex;
`;

export const StyleIcons = styled.div`
    display: flex;
    gap: 0px;
    justify-content: space-between;
    align-items: center;
`;
