import { useWindowDimensions } from '../../hooks'
import {
    StyledInfoDiv,
    Title,
    StyledList,
    ListItem,
    SecondList,
    Lists,
    ThirdList,
} from './styles'

export const PartInfo = () => {
    const { width } = useWindowDimensions()

    return (
        <>
            <StyledList>
                <ListItem>Description</ListItem>
                <ListItem>P/N</ListItem>
                <ListItem>S/N</ListItem>
                <ListItem>Vendor</ListItem>{' '}
            </StyledList>
            <SecondList>
                {' '}
                <ListItem>Added by</ListItem>
                <ListItem>Updated date</ListItem>
                <ListItem>Type</ListItem>
                <ListItem> Revision Number </ListItem>
            </SecondList>

            <ThirdList>
                Location (potential future feature)
                <ListItem>
                    Shows current location of unit. For example on a rig or a
                    particular place in the workshop.
                </ListItem>
                <ListItem>
                    This requires routines for tracking (checking in and out of
                    workshop, integration to Kabal)
                </ListItem>
            </ThirdList>
        </>
    )
}
