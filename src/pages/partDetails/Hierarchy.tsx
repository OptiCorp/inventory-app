import {
    StyledInfoDiv,
    Title,
    StyledList,
    ListItem,
    SecondList,
    Lists,
} from './styles'

export const Hierarchy = () => {
    return (
        <>
            <StyledInfoDiv>
                <Title>Hierarchy</Title>
                <Lists>
                    <StyledList>
                         <ListItem>Belongs to</ListItem>
                        <ListItem>Links to parents</ListItem>
                        <ListItem>Consists of</ListItem>
                        <ListItem>If unit, links to assemblies </ListItem>{' '}
                        <ListItem>
                            If assembly, links to subassemblies etc{' '}
                        </ListItem>{' '}
                    </StyledList>
                    <SecondList>
                        {' '}
                        <ListItem>Added by</ListItem>
                        <ListItem>Updated date</ListItem>
                        <ListItem>Type</ListItem>
                        <ListItem> Revision Number </ListItem>
                    </SecondList>
                </Lists>
            </StyledInfoDiv>
        </>
    )
}
