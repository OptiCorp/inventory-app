import { useParams } from "react-router-dom";
import { StyledContainerDiv, StyledInfoDiv } from "./styles";
import { Item } from "../../services/apiTypes";

type Props = {
    part: Item;
}

const PartDetails = () => {
    const { id } = useParams();
    return (
        <StyledContainerDiv>
            <StyledInfoDiv>
                <h4>Part info</h4>
                <ul style={{ display: 'flex', flexDirection: 'column', flexWrap: 'wrap' }}>
                    <li>Description</li>
                    <li>P/N</li>
                    <li>S/N</li>
                    <li>Vendor</li>
                    <li>Added by</li>
                    <li>Updated date</li>
                    <li>Type</li>
                </ul>
            </StyledInfoDiv>
            <StyledInfoDiv>

            </StyledInfoDiv>
            <StyledInfoDiv>

            </StyledInfoDiv>
            <StyledInfoDiv>

            </StyledInfoDiv>
            <StyledInfoDiv>

            </StyledInfoDiv>
        </StyledContainerDiv>
    )
}

export default PartDetails
