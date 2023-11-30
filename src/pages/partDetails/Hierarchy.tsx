import { ListItem, StyledList, ThirdList, Wrapper } from './styles'

export const Hierarchy = () => {
    return (
        <>
            <Wrapper>
                <StyledList>
                    <ListItem>Belongs to</ListItem>
                    <ListItem>Links to parents</ListItem>
                    <ListItem>Consists of</ListItem>
                    <ListItem>If unit, links to assemblies </ListItem>{' '}
                    <ListItem>
                        If assembly, links to subassemblies etc{' '}
                    </ListItem>{' '}
                </StyledList>
            </Wrapper>
            <ThirdList>
                {' '}
                <ListItem> Used in (potential future feature)</ListItem>
                <ListItem>
                    {' '}
                    Could link to project rooms/POs/Kabal/packing lists etc
                    where this part has been used.{' '}
                </ListItem>
            </ThirdList>
        </>
    )
}
