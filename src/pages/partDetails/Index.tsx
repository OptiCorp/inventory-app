import { useParams } from "react-router-dom";
import { ListItem, StyledContainerDiv, StyledInfoDiv, StyledList, Title } from "./styles";
import { Item } from "../../services/apiTypes";
import { useGetItems } from "../../services/hooks/useGetItems";
import {  PartInfo } from "./PartInfo";

type Props = {
    part: Item;
}

// const {data: items = [], isFetching, isLoading, error} = useGetItems(id)

const PartDetails = () => {
    
const { id } = useParams();
   
    return (
        <>
        <StyledContainerDiv>
            
        <PartInfo/>
        </StyledContainerDiv>
        </>
    )
}

export default PartDetails
