import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import { useWindowDimensions } from '../../hooks';
import {
    CompactCardSkeleton,
    FlexContainer,
    PartCardCompactContainer,
    PartCardContainer,
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
                <PartCardContainer onClick={handleClick}>
                    <SearchCardSkeleton>
                        <FlexContainer>
                            <AddIcon fontSize="large" style={{ margin: '12px 0' }} />
                            <h3>Add part</h3>
                        </FlexContainer>
                    </SearchCardSkeleton>
                </PartCardContainer>
            ) : (
                <PartCardCompactContainer onClick={handleClick}>
                    <CompactCardSkeleton>
                        <FlexContainer>
                            <AddIcon fontSize="large" style={{ margin: '10px 0' }} />
                            <h3>Add part</h3>
                        </FlexContainer>
                    </CompactCardSkeleton>
                </PartCardCompactContainer>
            )}
        </>
    );
};

export default SearchResultCardSkeleton;
