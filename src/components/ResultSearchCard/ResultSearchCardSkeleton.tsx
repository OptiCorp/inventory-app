import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import { useWindowDimensions } from '../../hooks';
import {
    StyledCompactCardSkeleton,
    StyledFlexContainer,
    StyledResultCardCompactContainer,
    StyledResultCardContainer,
    StyledSearchCardSkeleton,
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
                <StyledResultCardContainer onClick={handleClick}>
                    <StyledSearchCardSkeleton>
                        <StyledFlexContainer>
                            <AddIcon fontSize="large" style={{ margin: '12px 0' }} />
                            <h3>Add part</h3>
                        </StyledFlexContainer>
                    </StyledSearchCardSkeleton>
                </StyledResultCardContainer>
            ) : (
                <StyledResultCardCompactContainer onClick={handleClick}>
                    <StyledCompactCardSkeleton>
                        <StyledFlexContainer>
                            <AddIcon fontSize="large" style={{ margin: '10px 0' }} />
                            <h3>Add part</h3>
                        </StyledFlexContainer>
                    </StyledCompactCardSkeleton>
                </StyledResultCardCompactContainer>
            )}
        </>
    );
};

export default SearchResultCardSkeleton;
