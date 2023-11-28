import {
    CompactLists,
    Lists,
    StyledContainerDiv,
    StyledInfoDiv,
} from './styles'

import { PartInfo } from './PartInfo'
import { useWindowDimensions } from '../../hooks'

const PartDetails = () => {
    const { width } = useWindowDimensions()
    return (
        <>
            <StyledContainerDiv>
                <StyledInfoDiv>
                    {width > 800 ? (
                        <Lists>
                            <PartInfo />{' '}
                        </Lists>
                    ) : (
                        <CompactLists>
                            {' '}
                            <PartInfo />{' '}
                        </CompactLists>
                    )}
                </StyledInfoDiv>
            </StyledContainerDiv>
        </>
    )
}

export default PartDetails
