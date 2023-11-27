import { StyledInfoDiv, Title, StyledList, ListItem, SecondList, Lists } from "./styles"



export const PartInfo = () =>{

return (

    <>
        <StyledInfoDiv>
            <Title>Part info</Title>
            <Lists>
                <StyledList>
                    <ListItem>Description</ListItem>
                    <ListItem>P/N</ListItem>
                    <ListItem>S/N</ListItem>
                    <ListItem>Vendor</ListItem> </StyledList>
                    <SecondList>   <ListItem>Added by</ListItem>
                    <ListItem>Updated date</ListItem>
                    <ListItem>Type</ListItem>
                    <ListItem>    Revision Number </ListItem></SecondList>
                    </Lists>
            </StyledInfoDiv>
    
    
    </>
)



}