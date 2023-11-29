import { ExampleUpload } from '../../components/Upload/Upload'
import { ListItem, SecondList, StyledList, ThirdList, Wrapper } from './styles'

export const Documents = () => {
    return (
        <>
            <Wrapper>
                <StyledList>
                    <ListItem>Drawings </ListItem>
                    <ListItem>Certificates</ListItem>
                    <ListItem>Checklists</ListItem>
                    <ListItem>Receipts</ListItem>{' '}
                </StyledList>

                <SecondList>
                    <ExampleUpload />
                </SecondList>
            </Wrapper>

            <ThirdList>
                Option B: Links to a designated Sharepoint space Allows for
                viewing files without downloading
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
