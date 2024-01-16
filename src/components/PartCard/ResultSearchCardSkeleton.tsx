import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import { useWindowDimensions } from '../../hooks';
import {
    CompactCardSkeleton,
    FlexContainer,
    ResultCardCompactContainer,
    ResultCardContainer,
    SearchCardSkeleton,
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
                <ResultCardContainer onClick={handleClick}>
                    <SearchCardSkeleton>
                        <FlexContainer>
                            <AddIcon fontSize="large" style={{ margin: '12px 0' }} />
                            <h3>Add part</h3>
                        </FlexContainer>
                    </SearchCardSkeleton>
                </ResultCardContainer>
            ) : (
                <ResultCardCompactContainer onClick={handleClick}>
                    <CompactCardSkeleton>
                        <FlexContainer>
                            <AddIcon fontSize="large" style={{ margin: '10px 0' }} />
                            <h3>Add part</h3>
                        </FlexContainer>
                    </CompactCardSkeleton>
                </ResultCardCompactContainer>
            )}
        </>
    );
};

export default SearchResultCardSkeleton;
