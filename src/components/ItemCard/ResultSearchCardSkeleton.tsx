import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import { useWindowDimensions } from '../../hooks';
import {
    StyledCompactCardSkeleton,
    StyledFlexContainer,
    StyledItemCardCompactContainer,
    StyledItemCardContainer,
    StyledItemCardSkeleton,
} from './styles';

const SearchResultCardSkeleton = () => {
    const { width } = useWindowDimensions();

    const navigate = useNavigate();

    const handleClick = () => {
        navigate('batch');
    };
    return (
        <>
            {width > 800 ? (
                <StyledItemCardContainer onClick={handleClick}>
                    <StyledItemCardSkeleton>
                        <StyledFlexContainer>
                            <AddIcon fontSize="large" style={{ margin: '12px 0' }} />
                            <h3>Add item</h3>
                        </StyledFlexContainer>
                    </StyledItemCardSkeleton>
                </StyledItemCardContainer>
            ) : (
                <StyledItemCardCompactContainer onClick={handleClick}>
                    <StyledCompactCardSkeleton>
                        <StyledFlexContainer>
                            <AddIcon fontSize="large" style={{ margin: '10px 0' }} />
                            <h3>Add item</h3>
                        </StyledFlexContainer>
                    </StyledCompactCardSkeleton>
                </StyledItemCardCompactContainer>
            )}
        </>
    );
};

export default SearchResultCardSkeleton;
