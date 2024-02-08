import { styled } from 'styled-components';
import { COLORS } from '../../style/GlobalStyles';
type Props = {
    height?: string;
};
export const SubmitButton = styled.button`
    width: 150px;
    background-color: ${COLORS.black};
    color: ${COLORS.gray};
    height: 30px;
    cursor: pointer;
    &:hover {
        background-color: ${COLORS.lightGray};
    }
`;

export const CancelButton = styled.button`
    width: 150px;
    background-color: ${COLORS.white};
    color: ${COLORS.black};
    height: 30px;
    cursor: pointer;
    &:hover {
        background-color: whitesmoke;
    }
`;

export const SavedListsTitle = styled.h3`
    font-weight: 600;
    line-height: 2rem;
    margin: 15px 0 5px 15px;
`;

export const FlexWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding-bottom: 10px;
`;

export const ButtonContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px;
`;
export const SearchContainer = styled.div<Props>`
    display: flex;
    flex-direction: column;
    height: ${({ height }) => height};
`;
export const SearchAndButton = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 32px;
    align-items: center;
`;
