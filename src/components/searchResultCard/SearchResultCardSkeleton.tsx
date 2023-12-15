import { useNavigate } from 'react-router-dom'
import { useWindowDimensions } from '../../hooks'
import { CompactCard, ResultCardCompactContainer, ResultCardContainer, SearchCard } from './styles'
import AddIcon from '@mui/icons-material/Add'

const SearchResultCardSkeleton = () => {
    const { width } = useWindowDimensions()

    const navigate = useNavigate()

    const handleClick = () => {
        navigate('batch')
    }
    return (
        <>
            {width > 800 ? (
                <ResultCardContainer onClick={handleClick}>
                    <SearchCard style={{ display: 'flex', justifyContent: 'center' }}>
                        <div style={{ display: 'flex' }}>
                            <AddIcon fontSize="large" style={{ margin: '12px 0' }} />
                            <h3>Add part</h3>
                        </div>
                    </SearchCard>
                </ResultCardContainer>
            ) : (
                <ResultCardCompactContainer onClick={handleClick}>
                    <CompactCard style={{ display: 'flex', justifyContent: 'center' }}>
                        <div style={{ display: 'flex' }}>
                            <AddIcon fontSize="large" style={{ margin: '10px 0' }} />
                            <h3>Add part</h3>
                        </div>
                    </CompactCard>
                </ResultCardCompactContainer>
            )}
        </>
    )
}

export default SearchResultCardSkeleton
