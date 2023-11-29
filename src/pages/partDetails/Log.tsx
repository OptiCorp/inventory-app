import { ListItem, SecondList, StyledList, ThirdList, Wrapper } from './styles'

export const Log = () => {
    return (
        <>
            <Wrapper>
                <StyledList>
                    <ListItem>Certifications</ListItem>
                </StyledList>
                <SecondList>
                    {' '}
                    <ListItem>Checks</ListItem>
                </SecondList>
            </Wrapper>
            <ThirdList>
                Changes
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
