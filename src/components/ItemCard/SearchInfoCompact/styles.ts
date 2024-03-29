import { styled } from 'styled-components';

export const StyledItemCardCompactContainer = styled.div`
    display: flex;
    box-shadow: 3px 2px 3px 0 rgba(0, 0, 0, 0.2);

    flex-direction: column;
    position: relative;
`;

export const StyledCompactInfoP = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 4px;
`;

export const StyledCompactContent = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 5px;
`;

export const StyledCompactDescriptionWrap = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2px;
    width: 100%;
`;

export const StyledCompactDescriptionParagraph = styled.p`
    display: flex;
    margin: 0px;
    width: 100%;
    display: -webkit-box;
    overflow: hidden;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 5;
`;

export const StyledKeyWords = styled.p`
    font-weight: 600;
    margin: 0px;
    width: 100%;
`;

export const StyledCompactTitle = styled.p`
    margin: 0px;
    display: flex;
    font-weight: 800;
`;
export const StyledCompactText = styled.p`
    margin: 0px;
    display: flex;
`;

export const StyledCompactBox = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    box-shadow: none;
    margin: 10px 0;
`;
